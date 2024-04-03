<?php

class YayHeroesREST
{

    protected static $instance = null;

    private function __construct()
    {
        add_action('rest_api_init', [$this, 'heroes_rest_routes_init']);
    }

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function heroes_rest_routes_init()
    {
        register_rest_route('yay', '/heroes', [
            'method' => 'GET',
            'callback' => [$this, 'get_heroes']
        ]);
    }

    public function get_heroes($request)
    {
        $posts_per_page = (int)$request['posts_per_page'];
        $paged = (int)$request['paged'];

        $args =  array(
            'post_type'     => 'yay_hero',
            'post_status'   => 'publish',
            'posts_per_page' => $posts_per_page,
            'paged'         => $paged
        );
        $heroes = new WP_Query($args);
        $heroes_total = $heroes->found_posts;
        $heroes_payload = (array) null;
        if ($heroes->have_posts()) :
            while ($heroes->have_posts()) :
                $heroes->the_post();
                $hero_id = get_the_ID();
                $data = array(
                    'id'            => $hero_id,
                    'name'          => get_the_title(),
                    'class'         => get_post_meta($hero_id, 'class', true),
                );
                array_push($heroes_payload, $data);
            endwhile;
            wp_reset_postdata();
        endif;

        return new WP_REST_Response(array('heroes' => $heroes_payload, 'total' => $heroes_total));
    }
}

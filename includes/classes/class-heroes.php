<?php
class Heroes
{
    /**
     * @param WP_Post $post 
     */
    public function get_hero($post)
    {
        $hero_class = get_post_meta($post->ID, "class", true);
        $hero_model = [

            'id'   =>  $post->ID,
            "name" => $post->post_title,
            "class" => $hero_class,

        ];
        return $hero_model;
    }

    public function get_all_heroes($force_get_all = true, $params = null)
    {
        $heroes = (array) null;
        $args = array(
            'post_type'   => 'yay_hero',
            'post_status' => 'publish',
            'posts_per_page' => !$force_get_all ? $params['posts_per_page'] : -1,
        );

        if (!empty($params['posts_per_page'])) {;
        }

        if (!empty($params['paged'])) {
            $args['paged'] = $params['paged'];
        }

        $hero_posts = get_posts($args);
        foreach ($hero_posts as $hero_post) {
            array_push($heroes, $this->get_hero($hero_post));
        }
        return $heroes;
    }
}

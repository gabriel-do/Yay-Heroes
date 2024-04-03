<?php
class Heroes
{
    /**
     * @param WP_Post $post 
     */
    public function get_hero($post)
    {
        $hero_props = (array) null;
        $hero_class = get_post_meta($post->ID, "class", true);
        array_push($hero_props, $post->post_title, $hero_class);
        return $hero_props;
    }

    public function get_all_heroes()
    {
        $heroes = (array) null;
        $args = array(
            'post_type' => 'yay_hero',
            'numberposts' => -1
        );
        $posts = get_posts($args);
        foreach ($posts as $post) {
            array_push($heroes, $this->get_hero($post));
        }
        return $heroes;
    }
}

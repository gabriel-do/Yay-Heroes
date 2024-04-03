<?php
class YayHeroPostTypeRegister
{

    protected static $instance = null;

    private function __construct()
    {
        add_action('init', [$this, 'yay_hero_post_type_registering']);
    }

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function yay_hero_post_type_registering()
    {
        register_post_type(
            'yay_hero',
            array(
                'labels'      => array(
                    'name'          => __('Yay Heroes'),
                    'singular_name' => __('Yay Hero'),
                ),
                'public'      => true,
                'has_archive' => true
            )
        );
    }
}

<?php
require_once(YAY_HEROES_PLUGIN_PATH . "/includes/Utils/SingletonTrait.php");
class YayHeroPostTypeRegister
{
  use SingletonTrait;

  private function __construct()
  {
    add_action('init', [$this, 'yay_hero_post_type_registering']);
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

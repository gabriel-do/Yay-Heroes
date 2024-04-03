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
    $heroes = new Heroes();
    $heroes_total = count($heroes->get_all_heroes());
    return new WP_REST_Response(array('heroes' => $heroes->get_all_heroes(true, $request), 'total' => $heroes_total));
  }
}

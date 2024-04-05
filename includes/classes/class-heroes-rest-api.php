<?php
require_once(YAY_HEROES_PLUGIN_PATH . "/includes/Utils/SingletonTrait.php");
class YayHeroesREST
{
  use SingletonTrait;
  private function __construct()
  {
    add_action('rest_api_init', [$this, 'heroes_rest_routes_init']);
  }

  public function heroes_rest_routes_init()
  {
    register_rest_route('yay', '/heroes', [
      'method' => 'GET',
      'callback' => [$this, 'get_heroes'],
      'permission_callback'   => [$this, 'can_read'],
    ]);

    register_rest_route('yay', '/hero', [
      'methods' => 'GET',
      'callback' => [$this, 'get_one_hero'],
      'permission_callback'   => [$this, 'can_read'],
    ]);

    register_rest_route('yay', '/hero', [
      'methods' => 'POST',
      'callback' => [$this, 'create_new_hero'],
      'permission_callback'   => [$this, 'can_write'],
    ]);

    register_rest_route('yay', '/hero', [
      'methods' => 'PATCH',
      'callback' => [$this, 'update_hero'],
      'permission_callback'   => [$this, 'can_write'],
    ]);

    register_rest_route('yay', '/hero', [
      'methods' => 'DELETE',
      'callback' => [$this, 'delete_hero'],
      'permission_callback'   => [$this, 'can_write'],
    ]);
  }

  public function get_heroes(WP_REST_Request $req)
  {
    $heroes = new Heroes();
    $heroes_total = count($heroes->get_all_heroes());
    return new WP_REST_Response(['heroes' => $heroes->get_all_heroes(true, $req), 'total' => $heroes_total]);
  }

  public function get_one_hero(WP_REST_Request $req)
  {
    $hero = new Heroes();
    $res = $hero->get_one_hero($req);
    return new WP_REST_Response($res);
  }

  public function create_new_hero(WP_REST_Request $req)
  {
    $hero = new Heroes();
    $res = $hero->create_new_hero($req);
    if (is_wp_error($res)) {
      return new WP_REST_Response($res);
    }
    return new WP_REST_Response($res);
  }

  public function update_hero(WP_REST_Request $req)
  {
    $hero = new Heroes();
    $res = $hero->update_hero($req);
    return new WP_REST_Response($res);
  }

  public function delete_hero(WP_REST_Request $req)
  {
    $hero = new Heroes();
    $res = $hero->delete_hero($req);
    return new WP_REST_Response($res);
  }

  public function can_read()
  {
    return current_user_can('read');
  }

  public function can_write()
  {
    return current_user_can('manage_options');
  }
}

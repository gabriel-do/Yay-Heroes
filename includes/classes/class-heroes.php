<?php
if (!is_admin()) {
  require_once(ABSPATH . 'wp-admin/includes/post.php');
}
class Heroes
{
  /**
   * @param WP_Post $post 
   */
  public function hero_response_model($post)
  {
    $hero_class = get_post_meta($post->ID, "class", true);
    $hero_model = [
      'id'   =>  $post->ID,
      "name" => $post->post_title,
      "class" => $hero_class,
    ];
    return $hero_model;
  }

  public function get_all_heroes($params = null)
  {
    $heroes = (array) null;
    $args = array(
      'post_type'   => 'yay_hero',
      'post_status' => 'publish',
      'posts_per_page' => empty($params) ? -1 : $params['posts_per_page']
    );

    if (!empty($params['paged'])) {
      $args['paged'] = $params['paged'];
    }

    $hero_posts = get_posts($args);
    foreach ($hero_posts as $hero_post) {
      array_push($heroes, $this->hero_response_model($hero_post));
    }
    return $heroes;
  }

  public function get_one_hero($params)
  {
    $hero_post = get_post($params['id']);
    return $this->hero_response_model($hero_post);
  }

  public function create_new_hero(WP_REST_Request $body)
  {
    $hero_req_body = json_decode($body->get_body());
    $existed_hero = post_exists(sanitize_text_field($hero_req_body->name));
    if ($existed_hero === 0) {
      $args = array(
        'post_type'     => 'yay_hero',
        'post_status'   => 'publish',
        'post_title'    => sanitize_text_field($hero_req_body->name)
      );
      $post_id = wp_insert_post($args);
      if ($post_id > 0 || is_wp_error($post_id)) {
        add_post_meta($post_id, 'class', sanitize_text_field($hero_req_body->class));
      }
      return $post_id;
    }
    return new WP_Error('create_new_hero_error', __('Hero existed'));
  }

  public function update_hero(WP_REST_Request $req)
  {
    $hero_req_body = json_decode($req->get_body());
    $hero_id = $req->get_param('id');
    $hero_post = get_post($hero_id);
    if (!empty($hero_post)) {
      $args = [
        'ID'            => $hero_id,
        'post_type'     => 'yay_hero',
        'post_status'   => 'publish'
      ];

      if ($hero_req_body->name) {
        $args['post_title'] = sanitize_text_field($hero_req_body->name);
      }

      if ($hero_req_body->class) {
        update_post_meta($hero_id, 'class', sanitize_text_field($hero_req_body->class));
      }

      $updated_hero_id =  wp_update_post($args);

      $updated_hero = array(
        'id'            => $updated_hero_id,
        'name'          => get_the_title($updated_hero_id),
        'class'         => get_post_meta($updated_hero_id, 'class', true)
      );
      return $updated_hero;
    }
    return new WP_Error('update_hero_error', __('Hero does not exist'));
  }

  public function delete_hero(WP_REST_Request $req)
  {
    $hero_id = $req->get_param('id');
    $deleted_hero = wp_delete_post($hero_id, true);
    if (empty($deleted_hero) || $deleted_hero === false) {
      return new WP_Error('delete_hero_error', __('Cannot delete user'));
    }

    return $deleted_hero->ID;
  }
}

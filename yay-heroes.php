<?php

/**
 * The plugin bootstrap file
 *
 * @since             1.0.0
 * @package           Yay_Heroes
 *
 * @wordpress-plugin
 * Plugin Name:       Yay Heroes
 * Description:       Yay Heroes Plugin
 * Version:           1.0.0
 * Author:            Gabriel Do
 */

defined('ABSPATH') || exit;

define('YAY_HEROES_VERSION', '1.0.0');
define('YAY_HEROES_PLUGIN_FILE', __FILE__);
define('YAY_HEROES_PLUGIN_PATH', plugin_dir_path(YAY_HEROES_PLUGIN_FILE));

require_once(YAY_HEROES_PLUGIN_PATH . '/includes/classes/class-yay-heroes-loader.php');
require_once(YAY_HEROES_PLUGIN_PATH . '/includes/classes/class-register-post-type.php');
require_once(YAY_HEROES_PLUGIN_PATH . '/includes/classes/class-heroes-rest-api.php');

function yay_heroes_init()
{
  YayHeroesLoader::get_instance();
  YayHeroPostTypeRegister::get_instance();
  YayHeroesREST::get_instance();
}

add_action('plugins_loaded', 'yay_heroes_init');

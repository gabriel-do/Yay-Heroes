<?php

/**
 * The plugin bootstrap file
 *
 * @link              https://yaycommerce.com
 * @since             1.0.0
 * @package           Yay_Heroes
 *
 * @wordpress-plugin
 * Plugin Name:       Yay Heroes
 * Plugin URI:        https://yaycommerce.com
 * Description:       Yay Heroes Plugin
 * Version:           1.0.0
 * Author:            Gabriel Do
 * Author URI:        https://yaycommerce.com/
 */

defined('ABSPATH') || exit;

define('YAY_HEROES_VERSION', '1.0.0');

require_once(dirname(__FILE__) . '/includes/classes/yay-heroes-loader.php');
require_once(dirname(__FILE__) . '/includes/classes/register-post-type.php');
require_once(dirname(__FILE__) . '/includes/classes/class-heroes-rest-api.php');

function yay_heroes_init()
{
    YayHeroesLoader::instance();
    YayHeroPostTypeRegister::instance();
    YayHeroesREST::instance();
}

add_action('plugins_loaded', 'yay_heroes_init');

<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://yaycommerce.com
 * @since      1.0.0
 *
 * @package    Yay_Heroes
 * @subpackage Yay_Heroes/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Yay_Heroes
 * @subpackage Yay_Heroes/includes
 * @author     Gabriel Do <gabriel@yaycommerce.com>
 */
class Yay_Heroes_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'yay-heroes',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}

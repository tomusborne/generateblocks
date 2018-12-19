<?php
/**
 * Plugin Name: GeneratePress Blocks
 * Plugin URI: https://generatepress.com
 * Description: A super simple Section block.
 * Author: tomusborne
 * Author URI: https://tomusborne.com
 * Version: 0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

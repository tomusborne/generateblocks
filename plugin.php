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

define( 'GENERATE_BLOCK_MODULE_DIR', plugin_dir_path( __FILE__ ) );
define( 'GENERATE_BLOCK_MODULE_DIR_URL', plugin_dir_url( __FILE__ ) );

// Load necessary files.
require_once plugin_dir_path( __FILE__ ) . 'includes/functions.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/general.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/defaults.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/css-output.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-do-css.php';

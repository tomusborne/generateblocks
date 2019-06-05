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

add_filter( 'block_categories', 'generate_blocks_do_category' );
/**
 * Add GeneratePress category to Gutenberg.
 *
 * @since 0.1
 */
function generate_blocks_do_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'generatepress',
				'title' => __( 'GeneratePress', 'gp-premium' ),
			),
		),
		$categories
    );
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/blocks/section/init.php';

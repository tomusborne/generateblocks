<?php
/**
 * Plugin Name: GenerateBlocks
 * Plugin URI: https://generateblocks.com
 * Description: A small collection of lightweight WordPress blocks that can accomplish nearly anything.
 * Author: Tom Usborne
 * Author URI: https://tomusborne.com
 * Version: 2.1.0
 * Requires at least: 6.5
 * Requires PHP: 7.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: generateblocks
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'GENERATEBLOCKS_VERSION', '2.1.0' );
define( 'GENERATEBLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GENERATEBLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

// Load necessary files.
require_once GENERATEBLOCKS_DIR . 'includes/functions.php';
require_once GENERATEBLOCKS_DIR . 'includes/deprecated.php';
require_once GENERATEBLOCKS_DIR . 'includes/general.php';
require_once GENERATEBLOCKS_DIR . 'includes/defaults.php';

// Utils.
require_once GENERATEBLOCKS_DIR . 'includes/utils/class-singleton.php';
require_once GENERATEBLOCKS_DIR . 'includes/utils/class-dto.php';

// General.
require_once GENERATEBLOCKS_DIR . 'includes/class-do-css.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-enqueue-css.php';
require_once GENERATEBLOCKS_DIR . 'includes/dashboard.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-settings.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-plugin-update.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-query-loop.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-dynamic-content.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-render-blocks.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-rest.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-legacy-attributes.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-map-deprecated-attributes.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-query-utils.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-meta-handler.php';

// Pattern library.
require_once GENERATEBLOCKS_DIR . 'includes/pattern-library/class-libraries.php';
require_once GENERATEBLOCKS_DIR . 'includes/pattern-library/class-library-dto.php';
require_once GENERATEBLOCKS_DIR . 'includes/pattern-library/class-pattern-library-rest.php';

// Dynamic tags.
require_once GENERATEBLOCKS_DIR . 'includes/dynamic-tags/class-register-dynamic-tag.php';
require_once GENERATEBLOCKS_DIR . 'includes/dynamic-tags/class-dynamic-tag-callbacks.php';
require_once GENERATEBLOCKS_DIR . 'includes/dynamic-tags/class-dynamic-tags.php';

// Blocks.
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-block.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-text.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-element.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-shape.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-media.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-query.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-looper.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-query-no-results.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-query-page-numbers.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-loop-item.php';

// Legacy Blocks.
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-button.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-container.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-button-container.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-grid.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-headline.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-image.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-query-loop.php';

add_action( 'after_setup_theme', 'generateblocks_load_plugin_textdomain' );
/**
 * Load GenerateBlocks textdomain.
 *
 * @since 1.0
 */
function generateblocks_load_plugin_textdomain() {
	load_plugin_textdomain( 'generateblocks' );
}

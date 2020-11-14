<?php
/**
 * Our settings page.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Build our settings page.
 */
class GenerateBlocks_Settings {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'generateblocks_settings_area', array( $this, 'add_settings_container' ) );
	}

	/**
	 * Add our Dashboard menu item.
	 */
	public function add_menu() {
		$settings = add_submenu_page(
			'generateblocks',
			__( 'Settings', 'generateblocks' ),
			__( 'Settings', 'generateblocks' ),
			'manage_options',
			'generateblocks-settings',
			array( $this, 'settings_page' ),
			1
		);

		add_action( "admin_print_styles-$settings", 'generateblocks_enqueue_dashboard_scripts' );
		add_action( "admin_print_scripts-$settings", array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue our scripts.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script(
			'generateblocks-settings',
			GENERATEBLOCKS_DIR_URL . 'dist/dashboard.js',
			array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-api-fetch' ),
			GENERATEBLOCKS_VERSION,
			true
		);

		wp_localize_script(
			'generateblocks-settings',
			'generateBlocksSettings',
			array(
				'settings' => wp_parse_args(
					get_option( 'generateblocks', array() ),
					generateblocks_get_option_defaults()
				),
			)
		);

		wp_enqueue_style(
			'generateblocks-settings-build',
			GENERATEBLOCKS_DIR_URL . 'dist/dashboard.css',
			array( 'wp-components' ),
			GENERATEBLOCKS_VERSION
		);
	}

	/**
	 * Add settings container.
	 *
	 * @since 1.2.0
	 */
	public function add_settings_container() {
		echo '<div id="gblocks-block-default-settings"></div>';
	}

	/**
	 * Output our Dashboard HTML.
	 *
	 * @since 0.1
	 */
	public function settings_page() {
		?>
			<div class="wrap gblocks-dashboard-wrap">
				<div class="gblocks-dashboard-header">
					<div class="gblocks-dashboard-header-content">
						<h1><?php esc_html_e( 'Settings', 'generateblocks' ); ?></h1>
					</div>
					<?php generateblocks_dashboard_navigation(); ?>
				</div>

				<div class="generateblocks-settings-area">
					<?php do_action( 'generateblocks_settings_area' ); ?>
				</div>
			</div>
		<?php
	}
}

new GenerateBlocks_Settings();

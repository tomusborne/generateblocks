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
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 */
	private static $instance;

	/**
	 * Initiator.
	 *
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

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

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'generateblocks-settings', 'generateblocks' );
		}

		wp_localize_script(
			'generateblocks-settings',
			'generateBlocksSettings',
			array(
				'settings' => wp_parse_args(
					get_option( 'generateblocks', array() ),
					generateblocks_get_option_defaults()
				),
				'gpContainerWidth' => function_exists( 'generate_get_option' ) ? generate_get_option( 'container_width' ) : false,
				'gpContainerWidthLink' => function_exists( 'generate_get_option' ) ?
					add_query_arg(
						rawurlencode( 'autofocus[control]' ),
						rawurlencode( 'generate_settings[container_width]' ),
						wp_customize_url()
					) :
					false,
			)
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
				<div class="generateblocks-settings-area">
					<?php do_action( 'generateblocks_settings_area' ); ?>
				</div>
			</div>
		<?php
	}
}

GenerateBlocks_Settings::get_instance();

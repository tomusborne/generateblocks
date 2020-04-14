<?php
/**
 * Our settings page.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class GenerateBlocks_Settings {
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_init', array( $this, 'save' ) );
		add_action( 'admin_head', array( $this, 'highlight_menu_item' ) );

		if ( ! empty( $_POST ) ) {
			add_action( 'wp_ajax_generateblocks_regenerate_css_files', array( $this, 'regenerate_css_files' ) );
		}
	}

	public function add_menu() {
		$settings = add_options_page(
			__( 'Settings', 'generateblocks' ),
			__( 'GenerateBlocks Settings', 'generateblocks' ),
			'manage_options',
			'generateblocks-settings',
			array( $this, 'settings_page' )
		);

		add_action( "admin_print_scripts-$settings", array( $this, 'enqueue_scripts' ) );
	}

	public function highlight_menu_item() {
		global $parent_file, $submenu_file;
		$screen = get_current_screen();

		if ( 'settings_page_generateblocks-settings' === $screen->id ) {
			$submenu_file = 'generateblocks';
		}

		remove_submenu_page( 'options-general.php', 'generateblocks-settings' );
	}

	public function enqueue_scripts() {
		wp_enqueue_script(
			'generateblocks-settings',
			GENERATEBLOCKS_MODULE_DIR_URL . 'assets/js/scripts.js',
			array( 'jquery' ),
			filemtime( GENERATEBLOCKS_MODULE_DIR . 'assets/js/scripts.js' )
		);
	}

	public function save() {
		if ( isset( $_POST['generateblocks_settings'] ) ) {
			if ( ! check_admin_referer( 'generateblocks_settings', 'generateblocks_settings' ) ) {
				wp_die( __( 'Security check failed.', 'generateblocks' ) );
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( __( 'Security check failed.', 'generateblocks' ) );
			}

			$settings = get_option( 'generateblocks', array() );
			$values = $_POST['generateblocks'];

			if ( isset( $values['css_print_method'] ) ) {
				$settings['css_print_method'] = sanitize_key( $values['css_print_method'] );
			}

			update_option( 'generateblocks', $settings );

			wp_safe_redirect( admin_url( 'admin.php?page=generateblocks-settings' ) );
			exit;
		}
	}

	public function regenerate_css_files() {
		check_ajax_referer( 'generateblocks_regenerate_css_files', '_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( __( 'Security check failed.', 'generateblocks' ) );
		}

		update_option( 'generateblocks_dynamic_css_posts', array() );

		wp_send_json_success();
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
					<h1><?php _e( 'Settings', 'generateblocks-pro' ); ?></h1>

					<div class="gblocks-logo">
						<a href="https://generateblocks.com" target="_blank" rel="noopener noreferrer">
							<img width="200" src="<?php echo GENERATEBLOCKS_MODULE_DIR_URL . 'assets/images/gb-logo-white.svg'; ?>" alt="" />
						</a>
					</div>
				</div>

				<?php generateblocks_dashboard_navigation(); ?>

				<div class="gblocks-settings-content">
					<form action="options.php" method="post">
						<?php
						wp_nonce_field( 'generateblocks_settings', 'generateblocks_settings' );
						?>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<th scope="row">
										<?php _e( 'CSS Print Method', 'generateblocks' ); ?>
									</th>
									<td>
										<select name="generateblocks[css_print_method]">
											<option value="file"<?php selected( 'file', generateblocks_get_option( 'css_print_method' ) ); ?>><?php _e( 'External File', 'generateblocks' ); ?></option>
											<option value="inline"<?php selected( 'inline', generateblocks_get_option( 'css_print_method' ) ); ?>><?php _e( 'Inline Embedding', 'generateblocks' ); ?></option>
										</select>
										<p><?php _e( 'Generating your CSS in external files is better for overall performance.', 'generateblocks' ); ?></p>
									</td>
								</tr>
								<tr>
									<th scope="row">
										<?php _e( 'Regenerate CSS', 'generateblocks' ); ?>
									</th>
									<td>
										<?php printf(
											'<button data-nonce="%s" class="button generateblocks-button-spinner" id="generateblocks-regenerate-css-files-button">%s</button>',
											wp_create_nonce( 'generateblocks_regenerate_css_files' ),
											__( 'Regenerate Files', 'generateblocks' )
										); ?>
										<p><?php _e( 'Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks' ); ?></p>
									</td>
								</tr>
								<?php
								/**
								 * generateblocks_settings_fields hook.
								 *
								 * @since 1.0
								 */
								do_action( 'generateblocks_settings_fields' );
								?>
							</tbody>
						</table>
				        <?php
						submit_button();
				        ?>
				    </form>
				</div>
			</div>
		<?php
	}
}

new GenerateBlocks_Settings;

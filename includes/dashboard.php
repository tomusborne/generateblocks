<?php
/**
 * Our admin Dashboard.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'admin_menu', 'generateblocks_register_dashboard' );
/**
 * Register our Dashboard page.
 *
 * @since 0.1
 */
function generateblocks_register_dashboard() {
	add_options_page(
		__( 'GenerateBlocks', 'generateblocks' ),
		__( 'GenerateBlocks', 'generateblocks' ),
		'manage_options',
		'generateblocks',
		'generateblocks_do_dashboard'
	);
}

add_action( 'admin_head', 'generateblocks_fix_dashboard_menu_item' );
/**
 * Highlight the Settings menu item when on the Dashboard.
 *
 * @since 1.0
 */
function generateblocks_fix_dashboard_menu_item() {
	global $parent_file, $submenu_file;
	$screen = get_current_screen();

	if ( 'settings_page_generateblocks' === $screen->id ) {
		$submenu_file = 'generateblocks-settings'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
	}

	remove_submenu_page( 'options-general.php', 'generateblocks' );
}

add_action( 'admin_enqueue_scripts', 'generateblocks_enqueue_dashboard_scripts' );
/**
 * Add our scripts to the page.
 *
 * @since 0.1
 */
function generateblocks_enqueue_dashboard_scripts() {
	$screen = get_current_screen();

	if ( 'settings_page_generateblocks' === $screen->id || 'settings_page_generateblocks-settings' === $screen->id ) {
		wp_enqueue_style(
			'generateblocks-dashboard',
			GENERATEBLOCKS_DIR_URL . 'assets/css/dashboard.css',
			array(),
			filemtime( GENERATEBLOCKS_DIR . 'assets/css/dashboard.css' )
		);
	}
}

/**
 * Build our Dashboard menu.
 */
function generateblocks_dashboard_navigation() {
	$screen = get_current_screen();

	$tabs = apply_filters(
		'generateblocks_dashboard_tabs',
		array(
			'dashboard' => array(
				'name'  => __( 'Dashboard', 'generateblocks' ),
				'url'   => admin_url( 'options-general.php?page=generateblocks' ),
				'class' => 'settings_page_generateblocks' === $screen->id ? 'active' : '',
			),
			'settings'  => array(
				'name'  => __( 'Settings', 'generateblocks' ),
				'url'   => admin_url( 'options-general.php?page=generateblocks-settings' ),
				'class' => 'settings_page_generateblocks-settings' === $screen->id ? 'active' : '',
			),
		)
	);

	// Don't print any markup if we only have one tab.
	if ( count( $tabs ) === 1 ) {
		return;
	}
	?>
	<div class="gblocks-navigation">
		<?php
		foreach ( $tabs as $tab ) {
			printf(
				'<a href="%1$s" class="%2$s">%3$s</a>',
				esc_url( $tab['url'] ),
				esc_attr( $tab['class'] ),
				esc_html( $tab['name'] )
			);
		}
		?>
	</div>
	<?php
}

/**
 * Output our Dashboard HTML.
 *
 * @since 0.1
 */
function generateblocks_do_dashboard() {
	?>
		<div class="wrap gblocks-dashboard-wrap">
			<div class="gblocks-dashboard-header">
				<div class="gblocks-dashboard-header-content">
					<h1 class="gblocks-logo">
						<a href="https://generateblocks.com" target="_blank" rel="noopener noreferrer">
							<img width="200" height="55" src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/gb-logo-black.svg'; ?>" alt="<?php esc_attr_e( 'GenerateBlocks', 'generateblocks' ); ?>" />
						</a>
						<span class="gblocks-version"><?php echo esc_html( GENERATEBLOCKS_VERSION ); ?></span>
					</h1>
				</div>

				<?php generateblocks_dashboard_navigation(); ?>
			</div>

			<div class="gblocks-dashboard-intro-content">
				<?php esc_html_e( 'A small collection of lightweight WordPress blocks that can accomplish nearly anything.', 'generateblocks' ); ?>

				<div class="gblocks-sub-navigation">
					<a class="button" href="https://generateblocks.com" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Learn More', 'generateblocks' ); ?></a>
					<a class="button" href="https://docs.generateblocks.com" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Documentation', 'generateblocks' ); ?></a>
				</div>
			</div>

			<div class="gblocks-dashboard-content-container">
				<div class="gblocks-dashboard-blocks">
					<div class="gblocks-block">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 20 20" xml:space="preserve">
							<path style="fill:currentColor;" class="st0" d="M2.8 3.4c0-.4.3-.7.7-.7h1.2V0H3.4C1.5 0 0 1.5 0 3.4v1.2h2.8V3.4zM0 7.4h2.8v5.3H0zm17.2 0H20v5.3h-2.8zm0 9.2c0 .4-.3.7-.7.7h-1.2V20h1.2c1.9 0 3.4-1.5 3.4-3.4v-1.2h-2.8v1.2h.1zM7.4 0h5.3v2.8H7.4zm-4 17.2c-.4 0-.7-.3-.7-.7v-1.2H0v1.2c0 2 1.5 3.5 3.4 3.5h1.2v-2.8H3.4zm4 0h5.3V20H7.4zm9.2-14.4c.4 0 .7.3.7.7v1.2H20V3.4C20 1.5 18.5 0 16.6 0h-1.2v2.8h1.2z"/>
						</svg>

						<h3><?php esc_html_e( 'Container', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Organize your content into rows and sections.', 'generateblocks' ); ?></p>
					</div>

					<div class="gblocks-block">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 20 20" xml:space="preserve">
							<path style="fill:currentColor;" class="st0" d="M20 .6c0-.3-.2-.6-.5-.6H.5C.2 0 0 .3 0 .6v4.6c0 .3.2.6.5.6h19c.3 0 .5-.3.5-.6V.6zM6.7 7.7c0-.3-.2-.6-.5-.6H.5c-.3 0-.5.3-.5.6v4.6c0 .3.2.6.5.6h5.6c.3 0 .5-.3.5-.6l.1-4.6zm13.2 0c0-.3-.2-.6-.6-.6H8.6c-.4 0-.6.3-.6.6v4.5c0 .3.2.6.6.6h10.8c.3 0 .6-.3.6-.6l-.1-4.5zM20 14.8c0-.3-.2-.6-.5-.6h-5.6c-.3 0-.5.2-.5.6v4.6c0 .3.2.6.5.6h5.6c.3 0 .5-.2.5-.6v-4.6zm-8 0c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.5.5v4.6c0 .4.2.6.5.6h11c.3 0 .5-.2.5-.5v-4.7z"/>
						</svg>

						<h3><?php esc_html_e( 'Grid', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Create advanced layouts with flexible grids.', 'generateblocks' ); ?></p>
					</div>

					<div class="gblocks-block">
						<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 38 38" height="100%" width="100%">
							<path style="fill:currentColor;fill-rule:nonzero;" d="M34.82,37.5l-10.183,0l0,-14.037l-11.774,0l0,14.037l-10.183,0l0,-37.5l10.183,0l0,12.652l11.774,0l0,-12.652l10.183,0l0,37.5Z"></path>
						</svg>

						<h3><?php esc_html_e( 'Headline', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Craft text-rich content with advanced typography.', 'generateblocks' ); ?></p>
					</div>

					<div class="gblocks-block">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 20 20" xml:space="preserve">
							<path style="fill:currentColor;" class="st0" d="M19.2 0H.8C.4 0 0 .4 0 .8v6.4c0 .4.4.8.8.8h18.4c.4 0 .8-.4.8-.8V.8c0-.4-.4-.8-.8-.8zm-.8 12H1.6c-.9 0-1.6.7-1.6 1.6v4.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6v-4.8c0-.9-.7-1.6-1.6-1.6zm.4 6.4c0 .2-.2.4-.4.4H1.6c-.2 0-.4-.2-.4-.4v-4.8c0-.2.2-.4.4-.4h16.8c.2 0 .4.2.4.4v4.8z"/>
						</svg>

						<h3><?php esc_html_e( 'Buttons', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Drive conversions with beautiful buttons.', 'generateblocks' ); ?></p>
					</div>
				</div>

				<div class="gblocks-getting-started">
					<p><?php esc_html_e( 'To get started, head over to the block editor and open the GenerateBlocks category.', 'generatepress' ); ?></p>
					<img width="400" src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/add-blocks.png'; ?>" alt="" />
				</div>

				<div class="gblocks-generatepress">
					<div class="gblocks-inside-generatepress">
						<div class="gblocks-generatepress-content">
							<img width="300" src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/generatepress.svg'; ?>" alt="" />
							<p><?php esc_html_e( 'Looking for a WordPress theme? GenerateBlocks and GeneratePress are built with the same principles in mind and complement each other perfectly.', 'generateblocks' ); ?></p>
							<div class="stats">
								<div class="downloads">
									<strong>2,000,000+</strong><br> <?php esc_html_e( 'Downloads', 'generateblocks' ); ?>
								</div>

								<div class="stars">
									<strong>1000+</strong><br>
									<img src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/stars.svg'; ?>" alt="" width="98" height="17" class="alignnone size-full wp-image-44">
								</div>

								<div class="active-websites">
									<strong>300,000+</strong><br> <?php esc_html_e( 'Active websites', 'generateblocks' ); ?>
								</div>

								<div class="active-websites">
									<strong>60,000+</strong><br> <?php esc_html_e( 'Happy customers', 'generateblocks' ); ?>
								</div>
							</div>
							<a class="gblocks-button" href="https://generatepress.com" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Learn more', 'generateblocks' ); ?></a>
						</div>

						<div class="gblocks-generatepress-image">
							<img width="450" src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/generatepress-sites.png'; ?>" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php
}

add_action( 'admin_init', 'generateblocks_dashboard_redirect' );
/**
 * Redirect to the Dashboard page on single plugin activation.
 *
 * @since 0.1
 */
function generateblocks_dashboard_redirect() {
	$do_redirect = apply_filters( 'generateblocks_do_activation_redirect', get_option( 'generateblocks_do_activation_redirect', false ) );

	if ( $do_redirect ) {
		delete_option( 'generateblocks_do_activation_redirect' );
		wp_safe_redirect( esc_url( admin_url( 'options-general.php?page=generateblocks' ) ) );
		exit;
	}
}

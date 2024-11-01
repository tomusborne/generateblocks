<?php
/**
 * Our admin Dashboard.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'admin_menu', 'generateblocks_register_dashboard', 9 );
/**
 * Register our Dashboard page.
 *
 * @since 0.1
 */
function generateblocks_register_dashboard() {
	$dashboard = add_menu_page(
		__( 'GenerateBlocks', 'generateblocks' ),
		__( 'GenerateBlocks', 'generateblocks' ),
		'manage_options',
		'generateblocks',
		'generateblocks_do_dashboard'
	);

	$show_upgrade_menu = apply_filters(
		'generateblocks_show_upgrade_menu',
		! defined( 'GENERATEBLOCKS_PRO_VERSION' )
	);

	if ( $show_upgrade_menu ) {
		add_submenu_page(
			'generateblocks',
			__( 'Upgrade', 'generateblocks' ),
			__( 'Upgrade', 'generateblocks' ),
			'manage_options',
			'generateblocks-upgrade',
			'generateblocks_do_dashboard'
		);
	}

	add_action( "admin_print_styles-$dashboard", 'generateblocks_enqueue_dashboard_scripts' );
}

/**
 * Add our Dashboard-specific scripts.
 *
 * @since 1.0.0
 */
function generateblocks_enqueue_dashboard_scripts() {
	$assets_file = GENERATEBLOCKS_DIR . 'dist/dashboard.asset.php';
	$compiled_assets = file_exists( $assets_file )
		? require $assets_file
		: false;

	$assets =
		isset( $compiled_assets['dependencies'] ) &&
		isset( $compiled_assets['version'] )
		? $compiled_assets
		: [
			'dependencies' => [],
			'version' => filemtime( GENERATEBLOCKS_DIR . 'dist/dashboard.js' ),
		];

	wp_enqueue_script(
		'generateblocks-dashboard',
		GENERATEBLOCKS_DIR_URL . 'dist/dashboard.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'generateblocks-dashboard', 'generateblocks' );
	}

	wp_localize_script(
		'generateblocks-dashboard',
		'generateblocksDashboard',
		array(
			'gpImage'       => esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/generatepress-sites.png',
			'gpLogo'        => esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/generatepress.svg',
			'gbVersion'     => GENERATEBLOCKS_VERSION,
			'gbpVersion'    => defined( 'GENERATEBLOCKS_PRO_VERSION' )
				? GENERATEBLOCKS_PRO_VERSION
				: false,
		)
	);

	wp_enqueue_style(
		'generateblocks-dashboard',
		GENERATEBLOCKS_DIR_URL . 'dist/dashboard.css',
		array( 'wp-components' ),
		GENERATEBLOCKS_VERSION
	);
}

/**
 * Get a list of our Dashboard pages.
 *
 * @since 1.2.0
 */
function generateblocks_get_dashboard_pages() {
	return apply_filters(
		'generateblocks_dashboard_screens',
		array(
			'generateblocks_page_generateblocks-settings',
		)
	);
}

add_filter( 'admin_body_class', 'generateblocks_set_admin_body_classes' );
/**
 * Add admin body classes when needed.
 *
 * @since 1.2.0
 * @param string $classes The existing classes.
 */
function generateblocks_set_admin_body_classes( $classes ) {
	$dashboard_pages = generateblocks_get_dashboard_pages();
	$current_screen = get_current_screen();

	if ( in_array( $current_screen->id, $dashboard_pages ) ) {
		$classes .= ' generateblocks-dashboard-page';
	}

	return $classes;
}

add_action( 'in_admin_header', 'generateblocks_do_dashboard_headers' );
/**
 * Add our Dashboard headers.
 *
 * @since 1.3.0
 */
function generateblocks_do_dashboard_headers() {
	$dashboard_pages = generateblocks_get_dashboard_pages();
	$current_screen = get_current_screen();

	if ( in_array( $current_screen->id, $dashboard_pages ) ) {
		generateblocks_do_dashboard_header();
	}
}

add_action( 'admin_enqueue_scripts', 'generateblocks_enqueue_global_dashboard_scripts' );
/**
 * Add our scripts to the page.
 *
 * @since 0.1
 */
function generateblocks_enqueue_global_dashboard_scripts() {
	wp_enqueue_style(
		'generateblocks-dashboard-global',
		GENERATEBLOCKS_DIR_URL . 'assets/css/dashboard-global.css',
		array(),
		GENERATEBLOCKS_VERSION
	);

	$dashboard_pages = generateblocks_get_dashboard_pages();
	$current_screen = get_current_screen();

	if ( in_array( $current_screen->id, $dashboard_pages ) ) {
		wp_enqueue_style(
			'generateblocks-settings-build',
			GENERATEBLOCKS_DIR_URL . 'dist/settings.css',
			array( 'wp-components' ),
			GENERATEBLOCKS_VERSION
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
			'settings'  => array(
				'name'  => __( 'Settings', 'generateblocks' ),
				'url'   => admin_url( 'admin.php?page=generateblocks-settings' ),
				'class' => 'generateblocks_page_generateblocks-settings' === $screen->id ? 'active' : '',
			),
		)
	);

	if ( ! defined( 'GENERATEBLOCKS_PRO_VERSION' ) ) {
		$tabs['pro'] = array(
			'name'  => __( 'Get Pro', 'generateblocks' ),
			'url'   => 'https://generatepress.com/blocks/',
			'class' => '',
		);
	}

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
 * Build our Dashboard header.
 *
 * @since 1.2.0
 */
function generateblocks_do_dashboard_header() {
	?>
	<div class="gblocks-dashboard-header">
		<div class="gblocks-dashboard-header-title">
			<h1>
				<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 50 60.12" xml:space="preserve"><path class="st0" d="M6.686 31.622V18.918a.077.077 0 01.05-.072l6.5-2.313 6.5-2.313 9.682-3.445L39.1 7.33a.067.067 0 00.036-.028.074.074 0 00.014-.044V.076a.077.077 0 00-.032-.062.076.076 0 00-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 00-.036.028.097.097 0 00-.013.046V52.067c0 .026.013.048.032.062s.044.018.069.009l3.267-1.163 3.267-1.163c.015-.005.028-.015.036-.028s.014-.028.014-.044V37.999l.001-6.377c-.001 0 0 0 0 0z"/><path class="st0" d="M23.949 29.976l13-4.625 13-4.625c.015-.005.028-.015.036-.028s.015-.028.015-.044V8.056a.077.077 0 00-.032-.062.076.076 0 00-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 00-.036.028.074.074 0 00-.014.044V60.045c0 .026.013.048.032.062a.076.076 0 00.069.009l6.475-2.304 6.475-2.304 6.525-2.322 6.525-2.322 6.5-2.313 6.5-2.313c.015-.005.028-.015.036-.028s.014-.025.014-.041V27.193a.077.077 0 00-.032-.062.076.076 0 00-.069-.009l-6.45 2.295L37 31.711a.067.067 0 00-.036.028.074.074 0 00-.014.044v6.272a.077.077 0 01-.05.072l-6.45 2.295L24 42.715a.075.075 0 01-.101-.071V30.046c0-.016.005-.031.014-.044a.08.08 0 01.036-.026z"/></svg>
				<?php echo esc_html( get_admin_page_title() ); ?>
			</h1>
		</div>

		<?php generateblocks_dashboard_navigation(); ?>
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
			<div id="gblocks-dashboard" />
		</div>
	<?php
}

add_action( 'admin_init', 'generateblocks_do_upgrade_redirect' );
/**
 * Redirect to the sales page when landing on the upgrade page.
 */
function generateblocks_do_upgrade_redirect() {
	if ( empty( $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}

	if ( 'generateblocks-upgrade' === $_GET['page'] ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		wp_redirect( 'https://generatepress.com/blocks' ); // phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
		exit;
	}
}

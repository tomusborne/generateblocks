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

	add_submenu_page(
		'generateblocks',
		__( 'Dashboard', 'generateblocks' ),
		__( 'Dashboard', 'generateblocks' ),
		'manage_options',
		'generateblocks'
	);

	add_action( "admin_print_styles-$dashboard", 'generateblocks_enqueue_dashboard_scripts' );
}

/**
 * Add our Dashboard-specific scripts.
 *
 * @since 1.0.0
 */
function generateblocks_enqueue_dashboard_scripts() {
	wp_enqueue_style(
		'generateblocks-dashboard',
		GENERATEBLOCKS_DIR_URL . 'assets/css/dashboard.css',
		array(),
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
			'toplevel_page_generateblocks',
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
			GENERATEBLOCKS_DIR_URL . 'dist/dashboard.css',
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
			'dashboard' => array(
				'name'  => __( 'Dashboard', 'generateblocks' ),
				'url'   => admin_url( 'admin.php?page=generateblocks' ),
				'class' => 'toplevel_page_generateblocks' === $screen->id ? 'active' : '',
			),
			'settings'  => array(
				'name'  => __( 'Settings', 'generateblocks' ),
				'url'   => admin_url( 'admin.php?page=generateblocks-settings' ),
				'class' => 'generateblocks_page_generateblocks-settings' === $screen->id ? 'active' : '',
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
			<div class="gblocks-dashboard-intro-content">
				<?php esc_html_e( 'A small collection of lightweight WordPress blocks that can accomplish nearly anything.', 'generateblocks' ); ?>

				<div class="gblocks-sub-navigation">
					<a class="button" href="https://generateblocks.com" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Learn More', 'generateblocks' ); ?></a>
					<a class="button" href="https://docs.generateblocks.com" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Documentation', 'generateblocks' ); ?></a>

					<?php if ( ! function_exists( 'generateblocks_pro_init' ) ) : ?>
						<a class="button primary" href="https://generateblocks.com/pro" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'GenerateBlocks Pro', 'generateblocks' ); ?></a>
					<?php endif; ?>
				</div>
			</div>

			<div class="gblocks-dashboard-content-container">
				<div class="gblocks-dashboard-blocks">
					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon"><path d="M23.7 24h-5.2v-2.2h3.3v-3.3H24v5.2c0 .2-.1.3-.3.3zm-15-2.2h6.5V24H8.7zM5.5 24H.3c-.2 0-.3-.1-.3-.3v-5.2h2.2v3.3h3.3V24zM0 8.7h2.2v6.5H0zm2.2-3.2H0V.3C0 .1.1 0 .3 0h5.2v2.2H2.2v3.3zM8.7 0h6.5v2.2H8.7zM24 5.5h-2.2V2.2h-3.3V0h5.2c.2 0 .3.1.3.3v5.2zm-2.2 3.2H24v6.5h-2.2z" /></svg>

						<h3><?php esc_html_e( 'Container', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Organize your content into rows and sections.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/container/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Container Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon"><path d="M13.8 10.8H.3c-.2 0-.3-.1-.3-.3V.3C0 .1.1 0 .3 0h13.6c.2 0 .3.1.3.3v10.3c-.1.1-.2.2-.4.2zM1.8 9h10.6V1.8H1.8V9zm21.9 1.8h-7c-.2 0-.3-.1-.3-.3V.3c0-.2.1-.3.3-.3h7c.2 0 .3.1.3.3v10.3c0 .1-.1.2-.3.2zM18.2 9h4V1.8h-4V9zm-8 4.2h13.6c.2 0 .3.1.3.3v10.3c0 .2-.1.3-.3.3H10.2c-.2 0-.3-.1-.3-.3V13.5c0-.2.1-.3.3-.3zm12 1.8H11.7v7.3h10.6V15zM.3 13.2h7c.2 0 .3.1.3.3v10.3c0 .2-.1.3-.3.3h-7c-.2-.1-.3-.2-.3-.4V13.5c0-.2.1-.3.3-.3zM5.8 15h-4v7.3h4V15z" /></svg>

						<h3><?php esc_html_e( 'Grid', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Create advanced layouts with flexible grids.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/grid/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Grid Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon gblocks-block-icon__headline"><path d="M23.7 24h-8c-.1 0-.3-.1-.3-.3V16H8.7v7.6c0 .1-.1.3-.3.3H.3c-.1.1-.3 0-.3-.2V.3C0 .2.1 0 .3 0h8c.2 0 .4.1.4.3V8h6.8V.3c0-.1.1-.3.3-.3h8c.1 0 .2.1.2.3v23.5c0 .1-.1.2-.3.2zm-6.6-1.7h5V1.7h-5v8H6.9v-8h-5v20.4h5v-8h10.3v8.2z" /></svg>

						<h3><?php esc_html_e( 'Headline', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Craft text-rich content with advanced typography.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/headline/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Headline Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon">
							<path d="M23.7 10.8H.3c-.1 0-.1 0-.2-.1-.1 0-.1-.1-.1-.1V.4C0 .3 0 .3.1.2S.2 0 .3 0h23.4c.1 0 .1 0 .2.1.1 0 .1.1.1.2v10.2c0 .1 0 .1-.1.2 0 .1-.1.1-.2.1zM1.8 9.1h20.4V1.9L12 1.8H1.8v7.3z" />
							<path d="M15 6.3H4.8V4.5H15v.9zm4.2 0h-2.6V4.5h2.6v.9zM23.7 24H.3c-.1 0-.1 0-.2-.1s-.1-.1-.1-.2V13.5c0-.1 0-.1.1-.2s.1-.1.2-.1h23.4c.1 0 .1 0 .2.1s.1.1.1.2v10.2c0 .1 0 .1-.1.2 0 .1-.1.1-.2.1zM1.8 22.2h20.4V15H1.8v7.2z" />
							<path d="M19.2 19.5H9v-1.8h10.2v.9zM4.8 17.7h2.6v1.8H4.8v-.9z" />
						</svg>

						<h3><?php esc_html_e( 'Buttons', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Drive conversions with beautiful buttons.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Buttons Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon">
							<path d="M22.8 5.2h-7.4c-.2 0-.3-.1-.3-.3V3.7c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c0 .2-.1.3-.3.3zm0 3.4h-7.4c-.2 0-.3-.1-.3-.3V7.1c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c0 .2-.1.3-.3.3zm0-6.8h-7.4c-.2 0-.3-.1-.3-.3V.3c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c0 .2-.1.3-.3.3zM8.6 20.6H1.2c-.2 0-.3-.1-.3-.3v-1.2c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c-.1.2-.2.3-.3.3zm0 3.4H1.2c-.2 0-.3-.1-.3-.3v-1.2c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c-.1.2-.2.3-.3.3zm0-6.8H1.2c-.2 0-.3-.1-.3-.3v-1.2c0-.2.1-.3.3-.3h7.4c.2 0 .3.1.3.3v1.2c-.1.1-.2.3-.3.3z" />
							<path d="M17.7 24c-1.7 0-3.3-.7-4.4-1.8-2.4-2.4-2.3-6.3-2.2-10.2.1-4.3.2-8.4-3-9.8-1.5-.7-3.2-.5-4.4.4-1.2.8-1.9 2.1-1.9 3.5 0 .8.2 1.6.5 2.3.9 1.7 2.5 2.5 5.6 2.7.2 0 .3.1.3.3l-.1 1.2c0 .2-.1.3-.3.3-2-.1-4.4-.5-6-2.2-1.3-1.3-2-3.1-1.8-5 .2-1.9 1.1-3.5 2.7-4.6C4.4-.1 6.7-.3 8.8.5c4.4 1.8 4.2 7 4.1 11.5-.1 3.5-.2 7.1 1.6 8.9.9.9 2.2 1.4 3.6 1.3 1.3-.1 2.5-.8 3.3-1.9.9-1.2 1-2.9.4-4.4-.8-1.9-2.5-2.8-5.8-3-.2 0-.3-.1-.3-.3l.1-1.2c0-.2.1-.3.3-.3 2.7.2 6 .8 7.3 4.1.9 2 .6 4.4-.6 6.1-1.1 1.5-2.8 2.5-4.6 2.7h-.5z" />
						</svg>

						<h3><?php esc_html_e( 'Query Loop', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Build a list of posts from any post type using advanced query parameters.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/query-loop/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Query Loop Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" className="gblocks-block-icon">
							<path d="M16.4 11.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2zm0-6.7c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4z" />
							<path d="M23.7 24H.3c-.2 0-.3-.1-.3-.3V.3C0 .1.1 0 .3 0h23.4c.2 0 .3.1.3.3v23.4c0 .2-.1.3-.3.3zM1.8 22.2h20.4V1.8H1.8v20.4z" />
							<path d="M22.3 23.6 8.4 11.7l-6.9 6.1-1.2-1.3 7.9-6.9c.1-.1.3-.1.4 0l15.1 13-1 1.1c-.1 0-.3 0-.4-.1z" />
						</svg>

						<h3><?php esc_html_e( 'Image', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Add images to your content to make a visual statement.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/image/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Image Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>
				</div>

				<div class="gblocks-generatepress">
					<div class="gblocks-inside-generatepress">
						<div class="gblocks-generatepress-content">
							<img width="300" src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/generatepress.svg'; ?>" alt="" />
							<p><?php esc_html_e( 'Looking for a WordPress theme? GenerateBlocks and GeneratePress are built with the same principles in mind and complement each other perfectly.', 'generateblocks' ); ?></p>
							<div class="stats">
								<div class="downloads">
									<strong>4,000,000+</strong><br> <?php esc_html_e( 'Downloads', 'generateblocks' ); ?>
								</div>

								<div class="stars">
									<strong>1000+</strong><br>
									<img src="<?php echo esc_url( GENERATEBLOCKS_DIR_URL ) . 'assets/images/stars.svg'; ?>" alt="" width="98" height="17" class="alignnone size-full wp-image-44">
								</div>

								<div class="active-websites">
									<strong>400,000+</strong><br> <?php esc_html_e( 'Active websites', 'generateblocks' ); ?>
								</div>

								<div class="active-websites">
									<strong>90,000+</strong><br> <?php esc_html_e( 'Happy customers', 'generateblocks' ); ?>
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
		wp_safe_redirect( esc_url( admin_url( 'admin.php?page=generateblocks' ) ) );
		exit;
	}
}

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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M21.375 22h-3.75v-1.25h3.125v-3.125H22v3.75c0 .345-.28.625-.625.625zM9.188 20.75h5.625V22H9.188zM6.375 22h-3.75A.625.625 0 0 1 2 21.375v-3.75h1.25v3.125h3.125V22zM2 9.187h1.25v5.625H2zm1.25-2.812H2v-3.75C2 2.28 2.28 2 2.625 2h3.75v1.25H3.25v3.125zM9.188 2h5.625v1.25H9.188zM22 6.375h-1.25V3.25h-3.125V2h3.75c.345 0 .625.28.625.625v3.75zm-1.25 2.812H22v5.625h-1.25z" /></svg>

						<h3><?php esc_html_e( 'Container', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Organize your content into rows and sections.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/container/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Container Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M21.375 10.755h-4.689a.625.625 0 0 1-.625-.625V2.625c0-.345.28-.625.625-.625h4.689a.624.624 0 0 1 .625.625v7.505c0 .345-.28.625-.625.625zm-4.064-1.251h3.44V3.25h-3.44v6.254zm-4.474 1.251H2.625A.625.625 0 0 1 2 10.13V2.625C2 2.28 2.28 2 2.625 2h10.212c.345 0 .625.28.625.625v7.505a.626.626 0 0 1-.625.625zM3.249 9.504h8.963V3.25H3.249v6.254zm4.064 12.497H2.625A.625.625 0 0 1 2 21.375V13.87c0-.345.28-.625.625-.625h4.688c.345 0 .625.28.625.625v7.505a.627.627 0 0 1-.625.626zM3.249 20.75h3.439v-6.255H3.249v6.255zm18.126 1.251H11.162a.625.625 0 0 1-.625-.625V13.87c0-.345.28-.625.625-.625h10.213c.345 0 .625.28.625.625v7.505c0 .346-.28.626-.625.626zm-9.588-1.251h8.964v-6.255h-8.964v6.255z" /></svg>

						<h3><?php esc_html_e( 'Grid', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Create advanced layouts with flexible grids.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/grid/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Grid Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M21.375 22h-5.769a.625.625 0 0 1-.625-.625v-6.042H9.019v6.042a.625.625 0 0 1-.625.625H2.625A.625.625 0 0 1 2 21.375V2.625C2 2.28 2.28 2 2.625 2h5.769c.346 0 .625.28.625.625v6.041h5.961V2.625A.626.626 0 0 1 15.606 2h5.769c.345 0 .625.28.625.625v18.75c0 .345-.28.625-.625.625zm-5.144-1.25h4.519V3.25h-4.519v6.041c0 .345-.28.625-.625.625H8.394a.625.625 0 0 1-.625-.625V3.25H3.25v17.5h4.519v-6.042c0-.345.28-.625.625-.625h7.212c.345 0 .625.28.625.625v6.042z" /></svg>

						<h3><?php esc_html_e( 'Headline', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Craft text-rich content with advanced typography.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/headline/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Headline Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M21.375 16.45H2.625A.625.625 0 0 1 2 15.825v-7.65c0-.345.28-.625.625-.625h18.75c.345 0 .625.28.625.625v7.65c0 .345-.28.625-.625.625zM3.25 15.2h17.5V8.8H3.25v6.4z" /><path d="M15.536 12.625H5.882a.625.625 0 0 1 0-1.25h9.654a.625.625 0 0 1 0 1.25z" /><circle cx="17.936" cy="12" r=".807" /></svg>

						<h3><?php esc_html_e( 'Button', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Drive conversions with beautiful buttons.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Buttons Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M21.374 6.133H14.67a.625.625 0 0 1 0-1.25h6.704a.625.625 0 0 1 0 1.25zm0 2.882H14.67a.625.625 0 0 1 0-1.25h6.704a.625.625 0 0 1 0 1.25zm0-5.764H14.67a.625.625 0 0 1 0-1.251h6.704a.625.625 0 0 1 0 1.251zM9.329 19.118H2.625a.625.625 0 1 1 0-1.25h6.704a.625.625 0 0 1 0 1.25zm0 2.883H2.625a.625.625 0 0 1 0-1.25h6.704a.625.625 0 0 1 0 1.25zm0-5.766H2.625a.625.625 0 1 1 0-1.25h6.704a.625.625 0 0 1 0 1.25z" /><path d="M16.841 22.001a5.17 5.17 0 0 1-3.661-1.517c-1.961-1.961-1.876-5.29-1.793-8.51.095-3.705.185-7.204-2.646-8.399-1.275-.538-2.731-.405-3.8.351-.981.692-1.576 1.721-1.677 2.895a3.929 3.929 0 0 0 1.137 3.116c.882.882 2.245 1.322 4.419 1.428.344.017.61.31.594.655a.621.621 0 0 1-.655.594c-1.688-.082-3.81-.36-5.242-1.792a5.179 5.179 0 0 1-1.498-4.107A5.211 5.211 0 0 1 4.22 2.904c1.418-1.002 3.337-1.186 5.006-.481 3.616 1.526 3.511 5.622 3.409 9.583-.076 2.956-.154 6.012 1.428 7.594a3.924 3.924 0 0 0 3.114 1.137c1.174-.1 2.202-.695 2.896-1.675.754-1.066.889-2.52.353-3.796-.72-1.716-2.283-2.509-5.226-2.652a.626.626 0 0 1-.594-.655.615.615 0 0 1 .655-.594c2.32.112 5.136.602 6.317 3.416.701 1.67.515 3.587-.486 5.002a5.204 5.204 0 0 1-4.251 2.218z" /></svg>

						<h3><?php esc_html_e( 'Query Loop', 'generateblocks' ); ?></h3>
						<p><?php esc_html_e( 'Build a list of posts from any post type using advanced query parameters.', 'generateblocks' ); ?></p>

						<div class="gblocks-block-learn-more">
							<a class="button" href="https://docs.generateblocks.com/collection/query-loop/" target="_blank" rel="noreferrer noopener"><?php esc_html_e( 'Query Loop Documentation', 'generateblocks' ); ?></a>
						</div>
					</div>

					<div class="gblocks-block">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gblocks-block-icon"><path className="gblocks-svg-icon-box" d="M0 0h24v24H0z" /><path d="M15.77 11.655a3.429 3.429 0 0 1-3.425-3.425 3.428 3.428 0 0 1 3.425-3.425 3.429 3.429 0 0 1 3.424 3.425 3.429 3.429 0 0 1-3.424 3.425zm0-5.6a2.179 2.179 0 0 0-2.176 2.175c0 1.199.977 2.175 2.176 2.175s2.175-.976 2.175-2.175a2.178 2.178 0 0 0-2.175-2.175z" /><path d="M21.375 22.001H2.625A.625.625 0 0 1 2 21.375V2.625C2 2.28 2.28 2 2.625 2h18.751a.624.624 0 0 1 .624.625v18.751c0 .345-.28.625-.625.625zM3.249 20.75H20.75V3.25H3.249v17.5z" /><path d="M20.956 21.839 8.968 11.018l-5.91 5.698-.867-.9L8.52 9.714a.624.624 0 0 1 .853-.014l12.422 11.212-.839.927z" /></svg>

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

<?php
/**
 * Our admin Dashboard.
 *
 * @package FlexBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'admin_menu', 'flexblocks_register_dashboard' );

function flexblocks_register_dashboard() {
	$dashboard = add_options_page( __( 'FlexBlocks', 'flexblocks' ), __( 'FlexBlocks', 'flexblocks' ), 'manage_options', 'flexblocks', 'flexblocks_do_dashboard' );
	add_action( "admin_print_styles-$dashboard", 'flexblocks_register_dashboard_scripts' );
}

function flexblocks_register_dashboard_scripts() {
	wp_enqueue_style(
		'flexblocks-dashboard',
		FLEXBLOCKS_MODULE_DIR_URL . 'assets/css/dashboard.css',
		array(),
		filemtime( FLEXBLOCKS_MODULE_DIR . 'assets/css/dashboard.css' )
	);
}

function flexblocks_do_dashboard() {
	?>
		<div class="wrap fx-dashboard-wrap">
			<div class="fx-dashboard-header">
				<h1>
					<?php
						printf(
							__( 'Welcome to %s', 'flexblocks' ),
							'<strong>' . __( 'FlexBlocks', 'flexblocks' ) . '</strong>'
						);
					?>
				</h1>

				<div class="fx-logo">
					<a href="https://flexblocks.com" target="_blank" rel="noopener noreferrer">
						<img width="200" src="<?php echo FLEXBLOCKS_MODULE_DIR_URL . 'assets/images/flex-blocks-logo-wht.svg'; ?>" alt="" />
					</a>
				</div>
			</div>

			<div class="fx-dashboard-intro-content">
				<?php _e( "FlexBlocks isn't your average block plugin with 30+ half-baked blocks. Instead, we've created 4 powerful blocks that can be used to create nearly anything.", "flexblocks" ); ?>
			</div>

			<div class="fx-dashboard-blocks">
				<div class="fx-block">
					<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 38 38" height="100%" width="100%">
						<path style="fill:currentColor;fill-rule:nonzero;" d="M24.333,33.588l0,3.785c-3.595,0.169 -7.571,0.169 -11.166,0l0,-3.785c3.518,0.216 7.648,0.216 11.166,0Zm-20.037,-5.255c0.27,1.905 0.641,3.288 1.112,3.759c0.471,0.471 1.854,0.842 3.759,1.112l0,3.893c-3.593,-0.341 -6.322,-0.897 -7.095,-1.669c-0.772,-0.773 -1.328,-3.502 -1.669,-7.095l3.893,0Zm32.801,0c-0.341,3.593 -0.897,6.322 -1.669,7.095c-0.773,0.772 -3.502,1.328 -7.095,1.669l0,-3.893c1.905,-0.27 3.288,-0.641 3.759,-1.112c0.471,-0.471 0.842,-1.854 1.112,-3.759l3.893,0Zm0.276,-15.166c0.169,3.595 0.169,7.571 0,11.166l-3.785,0c0.216,-3.518 0.216,-7.648 0,-11.166l3.785,0Zm-33.461,0c-0.216,3.518 -0.216,7.648 0,11.166l-3.785,0c-0.169,-3.595 -0.169,-7.571 0,-11.166l3.785,0Zm24.421,-12.764c3.593,0.341 6.322,0.897 7.095,1.669c0.772,0.773 1.328,3.502 1.669,7.095l-3.893,0c-0.27,-1.905 -0.641,-3.288 -1.112,-3.759c-0.471,-0.471 -1.854,-0.842 -3.759,-1.112l0,-3.893Zm-19.166,0l0,3.893c-1.905,0.27 -3.288,0.641 -3.759,1.112c-0.471,0.471 -0.842,1.854 -1.112,3.759l-3.893,0c0.341,-3.593 0.897,-6.322 1.669,-7.095c0.773,-0.772 3.502,-1.328 7.095,-1.669Zm4,-0.276c3.595,-0.169 7.571,-0.169 11.166,0l0,3.785c-3.518,-0.216 -7.648,-0.216 -11.166,0l0,-3.785Z"></path>
					</svg>

					<h3><?php _e( 'Container', 'flexblocks' ); ?></h3>
					<p><?php _e( 'The foundation of your content. Build beautiful containers anywhere.', 'flexblocks' ); ?></p>
					<a class="fx-button" href="https://flexblocks.com/#container" target="_blank" rel="noopener noreferrer"><?php _e( 'Learn more', 'flexblocks' ); ?></a>
				</div>

				<div class="fx-block">
					<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 38 38" height="100%" width="100%">
						<g>
							<path style="fill:currentColor;fill-rule:nonzero;" d="M37.5,2.229c0,-0.54 -0.439,-0.979 -0.979,-0.979l-35.542,0c-0.54,0 -0.979,0.439 -0.979,0.979l0,8.042c0,0.54 0.439,0.979 0.979,0.979l35.542,0c0.54,0 0.979,-0.439 0.979,-0.979l0,-8.042Z"></path>
							<path style="fill:currentColor;fill-rule:nonzero;" d="M12.5,14.742c0,-0.547 -0.445,-0.992 -0.992,-0.992l-10.516,0c-0.547,0 -0.992,0.445 -0.992,0.992l0,8.016c0,0.547 0.445,0.992 0.992,0.992l10.516,0c0.547,0 0.992,-0.445 0.992,-0.992l0,-8.016Z"></path>
							<path style="fill:currentColor;fill-rule:nonzero;" d="M37.5,14.793c0,-0.576 -0.467,-1.043 -1.043,-1.043l-20.414,0c-0.576,0 -1.043,0.467 -1.043,1.043l0,7.914c0,0.576 0.467,1.043 1.043,1.043l20.414,0c0.576,0 1.043,-0.467 1.043,-1.043l0,-7.914Z"></path>
							<path style="fill:currentColor;fill-rule:nonzero;" d="M37.5,27.215c0,-0.533 -0.432,-0.965 -0.965,-0.965l-10.57,0c-0.533,0 -0.965,0.432 -0.965,0.965l0,8.07c0,0.533 0.432,0.965 0.965,0.965l10.57,0c0.533,0 0.965,-0.432 0.965,-0.965l0,-8.07Z"></path>
							<path style="fill:currentColor;fill-rule:nonzero;" d="M22.5,27.21c0,-0.53 -0.43,-0.96 -0.96,-0.96l-20.58,0c-0.53,0 -0.96,0.43 -0.96,0.96l0,8.08c0,0.53 0.43,0.96 0.96,0.96l20.58,0c0.53,0 0.96,-0.43 0.96,-0.96l0,-8.08Z"></path>
						</g>
					</svg>

					<h3><?php _e( 'Grid', 'flexblocks' ); ?></h3>
					<p><?php _e( 'Use our powerful grid system to build simple & complex layouts.', 'flexblocks' ); ?></p>
					<a class="fx-button" href="https://flexblocks.com/#grid" target="_blank" rel="noopener noreferrer"><?php _e( 'Learn more', 'flexblocks' ); ?></a>
				</div>

				<div class="fx-block">
					<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 38 38" height="100%" width="100%">
						<path style="fill:currentColor;fill-rule:nonzero;" d="M34.82,37.5l-10.183,0l0,-14.037l-11.774,0l0,14.037l-10.183,0l0,-37.5l10.183,0l0,12.652l11.774,0l0,-12.652l10.183,0l0,37.5Z"></path>
					</svg>

					<h3><?php _e( 'Headline', 'flexblocks' ); ?></h3>
					<p><?php _e( 'More than just titles - take full control of any kind of text.', 'flexblocks' ); ?></p>
					<a class="fx-button" href="https://flexblocks.com/#headline" target="_blank" rel="noopener noreferrer"><?php _e( 'Learn more', 'flexblocks' ); ?></a>
				</div>

				<div class="fx-block">
					<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 38 38" height="100%" width="100%">
						<path style="fill:currentColor;fill-rule:nonzero;" d="M34.375,27.213l-31.25,0c-1.725,0 -3.125,-1.4 -3.125,-3.125l0,-10.676c0,-1.725 1.4,-3.125 3.125,-3.125l31.25,0c1.725,0 3.125,1.4 3.125,3.125l0,10.676c0,1.725 -1.4,3.125 -3.125,3.125Zm-0.812,-15.926l-29.626,0c-1.552,0 -2.812,1.26 -2.812,2.812l0,5.625c0,1.553 1.26,2.813 2.812,2.813l29.626,0c1.552,0 2.812,-1.26 2.812,-2.813l0,-5.625c0,-1.552 -1.26,-2.812 -2.812,-2.812Z"></path>
					</svg>

					<h3><?php _e( 'Buttons', 'flexblocks' ); ?></h3>
					<p><?php _e( 'No limit on the number or styles of buttons you can create.', 'flexblocks' ); ?></p>
					<a class="fx-button" href="https://flexblocks.com/#buttons" target="_blank" rel="noopener noreferrer"><?php _e( 'Learn more', 'flexblocks' ); ?></a>
				</div>
			</div>

			<div class="fx-generatepress">
				<div class="fx-inside-generatepress">
					<div class="fx-generatepress-content">
						<h2>
							<?php
								printf(
									__( 'The perfect %s theme for your next project.', 'flexblocks' ),
									'<strong>' . __( 'lightweight', 'flexblocks' ) . '</strong>'
								);
							?>
						</h2>
						<p><?php _e( "Looking for a theme to pair with FlexBlocks? We've put years of love into GeneratePress, and we've integrated FlexBlocks with it seamlessly.", "flexblocks" ); ?></p>
						<a class="fx-button" href="https://generatepress.com" target="_blank" rel="noopener"><?php _e( 'Learn more', 'flexblocks' ); ?></a>
						<div class="stats">
							<div class="downloads">
								<strong>2,000,000+</strong><br> <?php _e( 'Downloads', 'flexblocks' ); ?>
							</div>

							<div class="stars">
								<strong>900+</strong><br>
								<img src="<?php echo FLEXBLOCKS_MODULE_DIR_URL . 'assets/images/stars.svg'; ?>" alt="" width="98" height="17" class="alignnone size-full wp-image-44">
							</div>

							<div class="active-websites">
								<strong>200,000+</strong><br> <?php _e( 'Active websites', 'flexblocks' ); ?>
							</div>

							<div class="active-websites">
								<strong>50,000+</strong><br> <?php _e( 'Happy customers', 'flexblocks' ); ?>
							</div>
						</div>
					</div>

					<div class="fx-generatepress-image">
						<img width="200" src="<?php echo FLEXBLOCKS_MODULE_DIR_URL . 'assets/images/generatepress.svg'; ?>" alt="" />
					</div>
				</div>
			</div>
		</div>
	<?php
}

add_action( 'admin_init', 'flexblocks_dashboard_redirect' );
/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation.
 *
 * @since 0.1
 */
function flexblocks_dashboard_redirect() {
	$do_redirect = apply_filters( 'flexblocks_do_activation_redirect', get_option( 'flexblocks_do_activation_redirect', false ) );

	if ( $do_redirect ) {
		delete_option( 'flexblocks_do_activation_redirect' );
		wp_safe_redirect( esc_url( admin_url( 'options-general.php?page=flexblocks' ) ) );
		exit;
	}
}

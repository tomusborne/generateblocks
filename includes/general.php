<?php
/**
 * General actions and filters.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'enqueue_block_editor_assets', 'generateblocks_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 0.1
 */
function generateblocks_do_block_editor_assets() {
	wp_localize_script(
		'generateblocks-media-editor-script',
		'generateblocksBlockMedia',
		[
			'standardPlaceholder'   => GENERATEBLOCKS_DIR_URL . 'assets/images/placeholder1280x720.png',
			'squarePlaceholder'     => GENERATEBLOCKS_DIR_URL . 'assets/images/placeholder800x.png',
		]
	);

	wp_localize_script(
		'generateblocks-text-editor-script',
		'generateblocksBlockText',
		[
			'defaultButtonAttributes' => apply_filters(
				'generateblocks_default_button_attributes',
				[
					'styles' => [
						'display' => 'inline-flex',
						'alignItems' => 'center',
						'backgroundColor' => '#215bc2',
						'color' => '#ffffff',
						'paddingTop' => '1rem',
						'paddingRight' => '2rem',
						'paddingBottom' => '1rem',
						'paddingLeft' => '2rem',
						'textDecoration' => 'none',
						'&:is(:hover, :focus)' => [
							'backgroundColor' => '#1a4a9b',
							'color' => '#ffffff',
						],
					],
				]
			),
		]
	);

	global $pagenow;

	$generateblocks_deps = array( 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-element', 'wp-compose', 'wp-data' );

	if ( 'widgets.php' === $pagenow ) {
		unset( $generateblocks_deps[2] );
	}

	$assets_file = GENERATEBLOCKS_DIR . 'dist/blocks.asset.php';
	$compiled_assets = file_exists( $assets_file )
		? require $assets_file
		: false;

	$assets =
		isset( $compiled_assets['dependencies'] ) &&
		isset( $compiled_assets['version'] )
		? $compiled_assets
		: [
			'dependencies' => $generateblocks_deps,
			'version' => filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.js' ),
		];

	wp_enqueue_script(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'generateblocks', 'generateblocks' );
	}

	wp_enqueue_style(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.css',
		array( 'wp-edit-blocks', 'generateblocks-packages' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.css' )
	);

	$image_sizes = get_intermediate_image_sizes();
	$image_sizes = array_diff( $image_sizes, array( '1536x1536', '2048x2048' ) );
	$image_sizes[] = 'full';

	wp_localize_script(
		'generateblocks',
		'generateBlocksInfo',
		array(
			'imageSizes' => $image_sizes,
			'svgShapes' => generateblocks_get_svg_shapes(),
			'syncResponsivePreviews' => generateblocks_get_option( 'sync_responsive_previews' ),
			'excerptLength' => apply_filters( 'excerpt_length', 55 ), // phpcs:ignore -- Core filter.
			'excerptMore' => apply_filters( 'excerpt_more', ' ' . '[&hellip;]' ), // phpcs:ignore -- Core filter.
			'imagePlaceholders' => array(
				'standard' => GENERATEBLOCKS_DIR_URL . 'assets/images/image-placeholder.png',
				'square' => GENERATEBLOCKS_DIR_URL . 'assets/images/square-image-placeholder.png',
			),
			'globalContainerWidth' => generateblocks_get_global_container_width(),
			'queryLoopEditorPostsCap' => apply_filters( 'generateblocks_query_loop_editor_posts_cap', 50 ),
			'disableGoogleFonts' => generateblocks_get_option( 'disable_google_fonts' ),
			'typographyFontFamilyList' => generateblocks_get_font_family_list(),
			'useV1Blocks' => generateblocks_use_v1_blocks(),
		)
	);

	if ( function_exists( 'generate_get_color_defaults' ) ) {
		$color_settings = wp_parse_args(
			get_option( 'generate_settings', array() ),
			generate_get_color_defaults()
		);

		$generatepressDefaultStyling = apply_filters(
			'generateblocks_gp_default_styling',
			array(
				'buttonBackground' => $color_settings['form_button_background_color'],
				'buttonBackgroundHover' => $color_settings['form_button_background_color_hover'],
				'buttonText' => $color_settings['form_button_text_color'],
				'buttonTextHover' => $color_settings['form_button_text_color_hover'],
				'buttonPaddingTop' => '10px',
				'buttonPaddingRight' => '20px',
				'buttonPaddingBottom' => '10px',
				'buttonPaddingLeft' => '20px',
			)
		);

		$css = sprintf(
			'.gb-button.button {
				background-color: %1$s;
				color: %2$s;
				padding-top: %3$s;
				padding-right: %4$s;
				padding-bottom: %5$s;
				padding-left: %6$s;
			}',
			$generatepressDefaultStyling['buttonBackground'],
			$generatepressDefaultStyling['buttonText'],
			$generatepressDefaultStyling['buttonPaddingTop'],
			$generatepressDefaultStyling['buttonPaddingRight'],
			$generatepressDefaultStyling['buttonPaddingBottom'],
			$generatepressDefaultStyling['buttonPaddingLeft']
		);

		$css .= sprintf(
			'.gb-button.button:active, .gb-button.button:hover, .gb-button.button:focus {
				background-color: %1$s;
				color: %2$s;
			}',
			$generatepressDefaultStyling['buttonBackgroundHover'],
			$generatepressDefaultStyling['buttonTextHover']
		);

		wp_add_inline_style( 'generateblocks', $css );
	}

	$defaults = generateblocks_get_block_defaults();

	wp_localize_script(
		'generateblocks',
		'generateBlocksDefaults',
		$defaults
	);

	wp_localize_script(
		'generateblocks',
		'generateBlocksStyling',
		generateblocks_get_default_styles()
	);

	wp_localize_script(
		'generateblocks',
		'generateBlocksLegacyDefaults',
		array(
			'v_1_4_0' => GenerateBlocks_Legacy_Attributes::get_defaults( '1.4.0' ),
		)
	);

	$editor_sidebar_assets = generateblocks_get_enqueue_assets( 'editor-sidebar' );

	wp_enqueue_script(
		'generateblocks-editor-sidebar',
		GENERATEBLOCKS_DIR_URL . 'dist/editor-sidebar.js',
		$editor_sidebar_assets['dependencies'],
		$editor_sidebar_assets['version'],
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'generateblocks-editor-sidebar', 'generateblocks' );
	}

	wp_enqueue_style(
		'generateblocks-editor-sidebar',
		GENERATEBLOCKS_DIR_URL . 'dist/editor-sidebar.css',
		array( 'wp-components' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/editor-sidebar.css' )
	);

	$packages_asset_info = generateblocks_get_enqueue_assets( 'packages' );
	wp_register_style(
		'generateblocks-packages',
		GENERATEBLOCKS_DIR_URL . 'dist/packages.css',
		'',
		$packages_asset_info['version']
	);

	// Enqueue scripts for all edge22 packages in the plugin.
	$package_json = GENERATEBLOCKS_DIR . 'package.json';

	if ( file_exists( $package_json ) ) {
		$package_json_parsed = json_decode(
			file_get_contents( $package_json ), // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			true
		);

		$edge22_packages = array_filter(
			$package_json_parsed['dependencies'],
			function( $package_name ) {
				return 0 === strpos( $package_name, '@edge22/' );
			},
			ARRAY_FILTER_USE_KEY
		);

		foreach ( $edge22_packages as $name => $version ) {
			$name = str_replace( '@edge22/', '', $name );
			$path = GENERATEBLOCKS_DIR . "dist/{$name}-imported.asset.php";

			if ( ! file_exists( $path ) ) {
				continue;
			}

			$package_info = require $path;

			wp_register_script(
				"generateblocks-$name",
				GENERATEBLOCKS_DIR_URL . 'dist/' . $name . '.js',
				$package_info['dependencies'],
				$version,
				true
			);

			wp_register_style(
				"generateblocks-$name",
				GENERATEBLOCKS_DIR_URL . 'dist/' . $name . '.css',
				[],
				$version
			);
		}
	}

	$editor_assets = generateblocks_get_enqueue_assets( 'editor' );

	wp_enqueue_script(
		'generateblocks-editor',
		GENERATEBLOCKS_DIR_URL . 'dist/editor.js',
		$editor_assets['dependencies'],
		$editor_assets['version'],
		true
	);

	$tags = GenerateBlocks_Register_Dynamic_Tag::get_tags();
	$tag_list = [];

	foreach ( $tags as $tag => $data ) {
		$relevant_data = $data;
		unset( $relevant_data['return'] );
		if ( $data ) {
			$tag_list[] = $relevant_data;
		}
	}

	wp_localize_script(
		'generateblocks-editor',
		'generateBlocksEditor',
		[
			'useV1Blocks'        => generateblocks_use_v1_blocks(),
			'dynamicTags'        => $tag_list,
			'hasGPFontLibrary'   => function_exists( 'generatepress_is_module_active' )
				? generatepress_is_module_active( 'generate_package_font_library', 'GENERATE_FONT_LIBRARY' )
				: false,
			'dateFormat' => get_option( 'date_format' ),
			'wpContentUrl' => content_url(),
			'typographyFontFamilyList' => generateblocks_get_font_family_list(),
			'dynamicTagsPreview' => apply_filters( 'generateblocks_dynamic_tags_preview', true ) ? 'enabled' : 'disabled',
		]
	);

	wp_enqueue_style(
		'generateblocks-editor',
		GENERATEBLOCKS_DIR_URL . 'dist/editor.css',
		array( 'wp-edit-blocks', 'generateblocks-packages' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/editor.css' )
	);
}

add_filter( 'block_categories_all', 'generateblocks_do_category' );
/**
 * Add GeneratePress category to Gutenberg.
 *
 * @param array $categories Existing categories.
 * @since 0.1
 */
function generateblocks_do_category( $categories ) {
	array_unshift(
		$categories,
		[
			'slug'  => 'generateblocks',
			'title' => __( 'GenerateBlocks', 'generateblocks' ),
		]
	);

	return $categories;
}

add_action( 'wp_enqueue_scripts', 'generateblocks_do_google_fonts' );
add_action( 'enqueue_block_editor_assets', 'generateblocks_do_google_fonts' );
/**
 * Do Google Fonts.
 *
 * @since 0.1
 */
function generateblocks_do_google_fonts() {
	if ( generateblocks_get_option( 'disable_google_fonts' ) ) {
		return;
	}

	$fonts_url = generateblocks_get_google_fonts_uri();

	if ( $fonts_url ) {
		wp_enqueue_style( 'generateblocks-google-fonts', $fonts_url, array(), null, 'all' ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	}
}

add_filter( 'generateblocks_css_print_method', 'generateblocks_set_css_print_method' );
/**
 * Set our CSS print method.
 *
 * @param string $method Existing method.
 */
function generateblocks_set_css_print_method( $method ) {
	$method = generateblocks_get_option( 'css_print_method' );

	if ( is_single() ) {
		$method = 'inline';
	}

	return $method;
}

add_filter( 'excerpt_allowed_blocks', 'generateblocks_set_excerpt_allowed_blocks' );
/**
 * Add blocks that can be displayed in post excerpts.
 *
 * @param array $allowed Existing allowed blocks.
 * @since 1.0
 */
function generateblocks_set_excerpt_allowed_blocks( $allowed ) {
	$allowed[] = 'generateblocks/headline';
	$allowed[] = 'generateblocks/container';
	$allowed[] = 'generateblocks/text';
	$allowed[] = 'generateblocks/element';

	return $allowed;
}

add_filter( 'excerpt_allowed_wrapper_blocks', 'generateblocks_set_excerpt_allowed_wrapper_blocks' );
/**
 * Allows excerpts to be generated from the `innerBlocks` of these wrappers.
 *
 * @param array $allowed Existing allowed wrapper blocks.
 * @since 1.5.0
 */
function generateblocks_set_excerpt_allowed_wrapper_blocks( $allowed ) {
	$allowed[] = 'generateblocks/container';
	$allowed[] = 'generateblocks/element';

	return $allowed;
}

add_filter( 'generateblocks_before_container_close', 'generateblocks_do_shape_divider', 10, 2 );
/**
 * Add shape divider to Container.
 *
 * @since 1.2.0
 * @param string $output The current block output.
 * @param array  $attributes The current block attributes.
 */
function generateblocks_do_shape_divider( $output, $attributes ) {
	$defaults = generateblocks_get_block_defaults();

	$settings = wp_parse_args(
		$attributes,
		$defaults['container']
	);

	if ( ! empty( $settings['shapeDividers'] ) ) {
		$shapes = generateblocks_get_svg_shapes();
		$shape_values = array();

		foreach ( $shapes as $group => $data ) {
			if ( ! empty( $data['svgs'] ) && is_array( $data['svgs'] ) ) {
				foreach ( $data['svgs'] as $key => $shape ) {
					$shape_values[ $key ] = $shape['icon'];
				}
			}
		}

		$output .= '<div class="gb-shapes">';

		foreach ( (array) $settings['shapeDividers'] as $index => $option ) {
			if ( ! empty( $option['shape'] ) ) {
				if ( isset( $shape_values[ $option['shape'] ] ) ) {
					$shapeNumber = $index + 1;

					$output .= sprintf(
						'<div class="gb-shape gb-shape-' . $shapeNumber . '">%s</div>',
						$shape_values[ $option['shape'] ]
					);
				}
			}
		}

		$output .= '</div>';
	}

	return $output;
}

add_filter( 'generateblocks_do_content', 'generateblocks_do_widget_styling' );
/**
 * Process all widget content for potential styling.
 *
 * @since 1.3.4
 * @param string $content The existing content to process.
 */
function generateblocks_do_widget_styling( $content ) {
	$widget_blocks = get_option( 'widget_block' );

	foreach ( (array) $widget_blocks as $block ) {
		if ( isset( $block['content'] ) ) {
			$content .= $block['content'];
		}
	}

	return $content;
}

add_filter( 'generateblocks_attr_container', 'generateblocks_set_inline_background_style', 10, 2 );
/**
 * Add our background image attribute to the Container.
 *
 * @since 1.5.0
 * @param array $attributes Existing attributes.
 * @param array $settings Block settings.
 */
function generateblocks_set_inline_background_style( $attributes, $settings ) {
	if ( generateblocks_has_background_image( $settings ) && $settings['bgImageInline'] ) {
		$url = generateblocks_get_background_image_url( $settings );

		if ( $url ) {
			$attribute_name = 'background-image';

			if ( 'element' !== $settings['bgOptions']['selector'] ) {
				$attribute_name = '--' . $attribute_name;
			}

			$attributes['style'] = $attribute_name . ': url(' . esc_url( $url ) . ');';
		}
	}

	return $attributes;
}

add_filter( 'generateblocks_block_css_selector', 'generateblocks_set_block_css_selectors', 10, 3 );
/**
 * Change our block selectors if needed.
 *
 * @param string $selector Existing selector.
 * @param string $name The block name.
 * @param array  $attributes The block attributes.
 */
function generateblocks_set_block_css_selectors( $selector, $name, $attributes ) {
	$blockVersion = ! empty( $attributes['blockVersion'] ) ? $attributes['blockVersion'] : 1;
	$defaults = generateblocks_get_block_defaults();

	if ( 'button' === $name ) {
		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		if ( $blockVersion < 3 ) {
			// Old versions of the this block used this backwards logic
			// to determine whether to remove the "a" to the selector.
			$clean_selector = $selector;
			$selector = 'a' . $selector;

			if ( isset( $attributes['hasUrl'] ) && ! $attributes['hasUrl'] ) {
				$selector = $clean_selector;
			}
		} else {
			$is_link = (
				! empty( $settings['hasUrl'] ) ||
				! empty( $settings['dynamicLinkType'] )
			) && 'link' === $settings['buttonType'];

			if ( $is_link ) {
				$selector = 'a' . $selector;
			}

			if ( 'button' === $settings['buttonType'] ) {
				$selector = 'button' . $selector;
			}
		}

		if ( $settings['hasButtonContainer'] || $blockVersion < 3 ) {
			$selector = '.gb-button-wrapper ' . $selector;
		} elseif ( isset( $settings['isPagination'] ) && $settings['isPagination'] ) {
			$selector = '.gb-query-loop-pagination ' . $selector;
		}
	}

	if ( 'headline' === $name ) {
		$settings = wp_parse_args(
			$attributes,
			$defaults['headline']
		);

		if ( apply_filters( 'generateblocks_headline_selector_tagname', true, $attributes ) ) {
			$selector = $settings['element'] . $selector;
		}
	}

	return $selector;
}

add_action( 'init', 'generateblocks_register_user_meta' );
/**
 * Register GenerateBlocks custom user meta fields.
 *
 * @return void
 */
function generateblocks_register_user_meta() {
	register_meta(
		'user',
		GenerateBlocks_Rest::ONBOARDING_META_KEY,
		array(
			'type' => 'object',
			'single' => true,
			'show_in_rest' => array(
				'schema' => array(
					'type'  => 'object',
					'properties' => array(
						'insert_inner_container' => array( 'type' => 'boolean' ),
					),
					'additionalProperties' => array(
						'type' => 'boolean',
					),
				),
			),
		)
	);
}

add_filter( 'block_editor_settings_all', 'generateblocks_do_block_css_reset', 15 );
/**
 * This resets the `max-width`, `margin-left`, and `margin-right` properties for our blocks in the editor.
 * We have to do this as most themes use `.wp-block` to set a `max-width` and auto margins.
 *
 * We used to do this directly in the block CSS if those block attributes didn't exist, but this allows us
 * to overwrite the reset in the `block_editor_settings_all` filter with a later priority.
 *
 * @param array $editor_settings The existing editor settings.
 */
function generateblocks_do_block_css_reset( $editor_settings ) {
	$css = '.gb-container, .gb-headline, .gb-button {max-width:unset;margin-left:0;margin-right:0;}';
	$editor_settings['styles'][] = [ 'css' => $css ];

	$blocks_to_reset = [
		'.editor-styles-wrapper .wp-block-generateblocks-text:where(:not(h1, h2, h3, h4, h5, h6, p))',
		'.editor-styles-wrapper .wp-block-generateblocks-element',
		'.editor-styles-wrapper .wp-block-generateblocks-shape',
		'.editor-styles-wrapper .wp-block-generateblocks-media',
		'.editor-styles-wrapper .wp-block-generateblocks-query',
		'.editor-styles-wrapper .wp-block-generateblocks-query-no-results',
		'.editor-styles-wrapper .wp-block-generateblocks-query-page-numbers',
		'.editor-styles-wrapper .wp-block-generateblocks-looper',
		'.editor-styles-wrapper .wp-block-generateblocks-loop-item',
	];

	$heading_blocks_to_reset = [
		'.editor-styles-wrapper .wp-block-generateblocks-text:where(h1, h2, h3, h4, h5, h6, p)',
	];

	$css  = implode( ',', $blocks_to_reset ) . '{max-width:unset;margin:0;}';
	$css .= implode( ',', $heading_blocks_to_reset ) . '{max-width:unset;margin-left:0;margin-right:0;}';
	$editor_settings['styles'][] = [ 'css' => $css ];

	return $editor_settings;
}

add_filter( 'generateblocks_css_output', 'generateblocks_add_general_css' );
/**
 * Add general CSS that doesn't apply to our own blocks.
 *
 * @param string $css Existing CSS.
 */
function generateblocks_add_general_css( $css ) {
	$container_width = generateblocks_get_global_container_width();

	if ( $container_width ) {
		$css .= ':root{--gb-container-width:' . $container_width . ';}';
	}

	$css .= '.gb-container .wp-block-image img{vertical-align:middle;}';
	$css .= '.gb-grid-wrapper .wp-block-image{margin-bottom:0;}';
	$css .= '.gb-highlight{background:none;}';
	$css .= '.gb-shape{line-height:0;}';

	return $css;
}

add_filter( 'block_editor_settings_all', 'generateblocks_do_block_editor_styles', 15 );
/**
 * Add our block editor styles.
 *
 * @param array $editor_settings The existing editor settings.
 */
function generateblocks_do_block_editor_styles( $editor_settings ) {
	$container_width = generateblocks_get_global_container_width();

	$editor_settings['styles'][] = array(
		'css' => ':root{--gb-container-width:' . $container_width . ';}',
	);

	$editor_settings['styles'][] = array(
		'css' => '.gb-shape{line-height:0;}',
	);

	return $editor_settings;
}

add_action( 'enqueue_block_editor_assets', 'generateblocks_set_editor_permissions', 0 );
/**
 * Output permissions for use in the editor.
 *
 * @return void
 */
function generateblocks_set_editor_permissions() {
	$permissions = apply_filters(
		'generateblocks_permissions',
		[
			'isAdminUser'       => current_user_can( 'manage_options' ),
			'canEditPosts'      => current_user_can( 'edit_posts' ),
			'isGbProActive'     => is_plugin_active( 'generateblocks-pro/plugin.php' ),
			'isGpPremiumActive' => is_plugin_active( 'gp-premium/gp-premium.php' ),
		]
	);

	$permission_object = wp_json_encode( $permissions );
	wp_register_script( 'generateblocks-editor-permissions', '', [], '1.0', false );
	wp_enqueue_script( 'generateblocks-editor-permissions' );
	$script = sprintf(
		'const gbPermissions = %s;
		Object.freeze( gbPermissions );',
		$permission_object
	);
	wp_add_inline_script( 'generateblocks-editor-permissions', $script );
}

add_filter( 'render_block', 'generateblocks_do_html_attributes_escaping', 20, 2 );
/**
 * Filter the rendered block content and escape HTML attributes.
 *
 * @param string $content The block content about to be appended to the post content.
 * @param array  $block    The full block, including name and attributes.
 * @return string
 */
function generateblocks_do_html_attributes_escaping( $content, $block ) {
	$html_attributes = $block['attrs']['htmlAttributes'] ?? [];
	$link_attributes = $block['attrs']['linkHtmlAttributes'] ?? [];

	if ( empty( $html_attributes ) && empty( $link_attributes ) ) {
		return $content;
	}

	$v1_block_names  = generateblocks_get_v1_block_names();
	$block_name      = $block['blockName'] ?? '';

	// Only do this for our non-v1 blocks.
	if (
		! generateblocks_str_starts_with( $block_name, 'generateblocks' ) ||
		in_array( $block_name, $v1_block_names, true )
	) {
		return $content;
	}

	$content = generateblocks_with_escaped_attributes(
		$content,
		[
			'block_html_attrs' => $html_attributes,
			'link_html_attrs'  => $link_attributes,
		]
	);

	return $content;
}

add_filter( 'generateblocks_allowed_option_keys_rest_api', 'generateblocks_allow_additional_option_keys_rest_api' );
/**
 * Allow additional option keys to be accessible via the REST API.
 *
 * @param array $allowed_keys Existing allowed keys.
 */
function generateblocks_allow_additional_option_keys_rest_api( $allowed_keys ) {
	if ( ! is_array( $allowed_keys ) ) {
		$allowed_keys = [];
	}

	$acf_option_keys = generateblocks_get_acf_option_field_keys();
	$allowed_keys    = array_merge( $allowed_keys, $acf_option_keys );

	return $allowed_keys;
}

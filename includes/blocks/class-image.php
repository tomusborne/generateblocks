<?php
/**
 * Handles the Image block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Image related functions.
 */
class GenerateBlocks_Block_Image {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	private static $block_ids = [];

	/**
	 * Keep track of CSS we want to output once per block type.
	 *
	 * @var boolean
	 */
	private static $singular_css_added = false;

	/**
	 * Block defaults.
	 */
	public static function defaults() {
		return [
			'mediaId' => '',
			'sizeSlug' => '',
			'width' => '',
			'widthTablet' => '',
			'widthMobile' => '',
			'height' => '',
			'heightTablet' => '',
			'heightMobile' => '',
			'borderColor' => '',
			'objectFit' => '',
			'objectFitTablet' => '',
			'objectFitMobile' => '',
			'align' => '',
			'alignment' => '',
			'alignmentTablet' => '',
			'alignmentMobile' => '',
		];
	}

	/**
	 * Store our block ID in memory.
	 *
	 * @param string $id The block ID to store.
	 */
	public static function store_block_id( $id ) {
		self::$block_ids[] = $id;
	}

	/**
	 * Check if our block ID exists.
	 *
	 * @param string $id The block ID to store.
	 */
	public static function block_id_exists( $id ) {
		return in_array( $id, (array) self::$block_ids );
	}

	/**
	 * Compile our CSS data based on our block attributes.
	 *
	 * @param array $attributes Our block attributes.
	 */
	public static function get_css_data( $attributes ) {
		$css = new GenerateBlocks_Dynamic_CSS();
		$desktop_css = new GenerateBlocks_Dynamic_CSS();
		$tablet_css = new GenerateBlocks_Dynamic_CSS();
		$tablet_only_css = new GenerateBlocks_Dynamic_CSS();
		$mobile_css = new GenerateBlocks_Dynamic_CSS();
		$css_data = [];

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['image']
		);

		$id = $attributes['uniqueId'];

		// Only add this CSS once.
		if ( ! self::$singular_css_added ) {
			do_action(
				'generateblocks_block_one_time_css_data',
				'image',
				$settings,
				$css
			);

			self::$singular_css_added = true;
		}

		// Map deprecated settings.
		$settings = GenerateBlocks_Map_Deprecated_Attributes::map_attributes( $settings );

		$css->set_selector( '.gb-block-image-' . $id );
		generateblocks_add_spacing_css( $css, $settings );

		// Set a flag we'll update later if we disable floats.
		$disable_float = false;
		$has_desktop_float = 'floatLeft' === $settings['alignment'] || 'floatRight' === $settings['alignment'];
		$has_tablet_float = 'floatLeft' === $settings['alignmentTablet'] || 'floatRight' === $settings['alignmentTablet'];

		if ( $has_desktop_float ) {
			$css->add_property( 'float', generateblocks_get_float_alignment( $settings['alignment'] ) );
		} else {
			$css->add_property( 'text-align', $settings['alignment'] );
		}

		$css->set_selector( '.gb-image-' . $id );
		generateblocks_add_border_css( $css, $settings );
		$css->add_property( 'width', $settings['width'] );
		$css->add_property( 'height', $settings['height'] );
		$css->add_property( 'object-fit', $settings['objectFit'] );
		$css->add_property( 'vertical-align', 'middle' );

		$tablet_css->set_selector( '.gb-block-image-' . $id );
		generateblocks_add_spacing_css( $tablet_css, $settings, 'Tablet' );

		if ( $has_tablet_float ) {
			$tablet_css->add_property( 'float', generateblocks_get_float_alignment( $settings['alignmentTablet'] ) );
		} else {
			$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );

			if ( $settings['alignmentTablet'] && $has_desktop_float ) {
				$tablet_css->add_property( 'float', 'none' );
				$disable_float = true;
			}
		}

		$tablet_css->set_selector( '.gb-image-' . $id );
		generateblocks_add_border_css( $tablet_css, $settings, 'Tablet' );
		$tablet_css->add_property( 'width', $settings['widthTablet'] );
		$tablet_css->add_property( 'height', $settings['heightTablet'] );
		$tablet_css->add_property( 'object-fit', $settings['objectFitTablet'] );

		$mobile_css->set_selector( '.gb-block-image-' . $id );
		generateblocks_add_spacing_css( $mobile_css, $settings, 'Mobile' );

		if ( 'floatLeft' === $settings['alignmentMobile'] || 'floatRight' === $settings['alignmentMobile'] ) {
			$mobile_css->add_property( 'float', generateblocks_get_float_alignment( $settings['alignmentMobile'] ) );
		} else {
			$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );

			if (
				$settings['alignmentMobile'] &&
				! $disable_float &&
				(
					$has_desktop_float ||
					$has_tablet_float
				)
			) {
				$mobile_css->add_property( 'float', 'none' );
			}
		}

		$mobile_css->set_selector( '.gb-image-' . $id );
		generateblocks_add_border_css( $mobile_css, $settings, 'Mobile' );
		$mobile_css->add_property( 'width', $settings['widthMobile'] );
		$mobile_css->add_property( 'height', $settings['heightMobile'] );
		$mobile_css->add_property( 'object-fit', $settings['objectFitMobile'] );

		// Store this block ID in memory.
		self::store_block_id( $id );

		/**
		 * Do generateblocks_block_css_data hook
		 *
		 * @since 1.0
		 *
		 * @param string $name The name of our block.
		 * @param array  $settings The settings for the current block.
		 * @param object $css Our desktop/main CSS data.
		 * @param object $desktop_css Our desktop only CSS data.
		 * @param object $tablet_css Our tablet CSS data.
		 * @param object $tablet_only_css Our tablet only CSS data.
		 * @param object $mobile_css Our mobile CSS data.
		 */
		do_action(
			'generateblocks_block_css_data',
			'image',
			$settings,
			$css,
			$desktop_css,
			$tablet_css,
			$tablet_only_css,
			$mobile_css
		);

		return [
			'main'        => $css->css_output(),
			'desktop'     => $desktop_css->css_output(),
			'tablet'      => $tablet_css->css_output(),
			'tablet_only' => $tablet_only_css->css_output(),
			'mobile'      => $mobile_css->css_output(),
		];
	}

	/**
	 * Wrapper function for our dynamic buttons.
	 *
	 * @since 1.6.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		if ( empty( $attributes['useDynamicData'] ) ) {
			// Add styles to this block if needed.
			$content = generateblocks_maybe_add_block_css(
				$content,
				[
					'class_name' => 'GenerateBlocks_Block_Image',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

			return generateblocks_filter_images( $content, $attributes );
		}

		$image = empty( $attributes['dynamicContentType'] )
			? generateblocks_filter_images( GenerateBlocks_Dynamic_Content::get_static_content( $content ), $attributes )
			: GenerateBlocks_Dynamic_Content::get_dynamic_image( $attributes, $block );

		if ( ! $image ) {
			return '';
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['image']
		);

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Image',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$output .= sprintf(
			'<figure %s>',
			generateblocks_attr(
				'image-figure',
				array(
					'class' => implode(
						' ',
						array(
							'gb-block-image',
							'gb-block-image-' . $settings['uniqueId'],
						)
					),
				),
				$settings,
				$block
			)
		);

		$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

		if ( $dynamic_link ) {
			$relAttributes = array();

			if ( ! empty( $settings['relNoFollow'] ) ) {
				$relAttributes[] = 'nofollow';
			}

			if ( ! empty( $settings['openInNewWindow'] ) ) {
				$relAttributes[] = 'noopener';
				$relAttributes[] = 'noreferrer';
			}

			if ( ! empty( $settings['relSponsored'] ) ) {
				$relAttributes[] = 'sponsored';
			}

			$image = sprintf(
				'<a %s>%s</a>',
				generateblocks_attr(
					'image-link',
					array(
						'class' => '',
						'href' => $dynamic_link,
						'rel' => ! empty( $relAttributes ) ? implode( ' ', $relAttributes ) : null,
						'target' => ! empty( $settings['openInNewWindow'] ) ? '_blank' : null,
					),
					$settings,
					$block
				),
				$image
			);
		}

		$output .= $image;

		if ( isset( $block->parsed_block['innerBlocks'][0]['attrs'] ) ) {
			$image_id = GenerateBlocks_Dynamic_Content::get_dynamic_image_id( $attributes );
			$block->parsed_block['innerBlocks'][0]['attrs']['dynamicImage'] = $image_id;

			$caption = (
				new WP_Block(
					$block->parsed_block['innerBlocks'][0]
				)
			)->render( array( 'dynamic' => true ) );

			if ( $caption ) {
				$output .= $caption;
			}
		}

		$output .= '</figure>';

		return $output;
	}
}

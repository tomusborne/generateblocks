<?php
/**
 * Handles legacy attributes that have changed.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Provides a method to define old attributes and serve old settings based on them.
 */
class GenerateBlocks_Legacy_Attributes {
	/**
	 * Get our old defaults that have changed.
	 *
	 * @param string $version The version to get defaults from.
	 */
	public static function get_defaults( $version ) {
		if ( '1.4.0' === $version ) {
			return apply_filters(
				'generateblocks_defaults',
				array(
					'gridContainer' => array(
						'horizontalGap' => 30,
					),
					'container' => array(
						'paddingTop' => '40',
						'paddingRight' => '40',
						'paddingBottom' => '40',
						'paddingLeft' => '40',
						'width' => 50,
						'widthMobile' => 100,
					),
				)
			);
		}
	}

	/**
	 * Update our settings based on old defaults.
	 *
	 * @param string $version The version to target.
	 * @param string $block The name of the block we're targeting.
	 * @param array  $settings The current settings.
	 * @param array  $atts The block attributes.
	 */
	public static function get_settings( $version, $block, $settings, $atts ) {
		$legacy_defaults = self::get_defaults( $version );

		if ( empty( $legacy_defaults ) ) {
			return $settings;
		}

		if ( '1.4.0' === $version ) {
			if ( 'grid' === $block ) {
				$legacy_settings = wp_parse_args(
					$atts,
					$legacy_defaults['gridContainer']
				);

				$settings['horizontalGap'] = $legacy_settings['horizontalGap'];
			}

			if ( 'container' === $block ) {
				$legacy_settings = wp_parse_args(
					$atts,
					$legacy_defaults['container']
				);

				$settings['paddingTop'] = $legacy_settings['paddingTop'];
				$settings['paddingRight'] = $legacy_settings['paddingRight'];
				$settings['paddingBottom'] = $legacy_settings['paddingBottom'];
				$settings['paddingLeft'] = $legacy_settings['paddingLeft'];
				$settings['width'] = $legacy_settings['width'];
				$settings['widthMobile'] = $legacy_settings['widthMobile'];
			}
		}

		return $settings;
	}
}

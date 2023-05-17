<?php
/**
 * Maps our old attributes to their new attribute names.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Map our deprecated attributes.
 */
class GenerateBlocks_Map_Deprecated_Attributes {
	/**
	 * Class instance.
	 *
	 * @access private
	 * @var $instance Class instance.
	 */
	private static $instance;

	/**
	 * Our devices.
	 *
	 * @access private
	 * @var $devices List of devices.
	 */
	private static $devices = [ '', 'Tablet', 'Mobile' ];

	/**
	 * Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Get all of our mapped attributes.
	 *
	 * @param array $settings Existing settings.
	 * @return array Mapped settings.
	 */
	public static function map_attributes( $settings ) {
		$settings = self::map_spacing( $settings );
		$settings = self::map_borders( $settings );
		$settings = self::map_typography( $settings );

		return $settings;
	}

	/**
	 * Map our old spacing attributes.
	 *
	 * @param array $settings Existing settings.
	 * @return array Mapped spacing settings.
	 */
	public static function map_spacing( $settings ) {
		if ( ! empty( $settings['spacing'] ) ) {
			return $settings;
		}

		$padding_attributes = [
			'paddingTop',
			'paddingRight',
			'paddingBottom',
			'paddingLeft',
		];

		$margin_attributes = [
			'marginTop',
			'marginRight',
			'marginBottom',
			'marginLeft',
		];

		foreach ( self::$devices as $device ) {
			foreach ( $padding_attributes as $attribute ) {
				$setting_name = $attribute . $device;

				if ( $settings[ $setting_name ] || is_numeric( $settings[ $setting_name ] ) ) {
					$unit = is_numeric( $settings[ $setting_name ] )
						? $settings['paddingUnit']
						: '';

					$settings['spacing'][ $setting_name ] = $settings[ $setting_name ] . $unit;
				}
			}

			foreach ( $margin_attributes as $attribute ) {
				$setting_name = $attribute . $device;

				if ( $settings[ $setting_name ] || is_numeric( $settings[ $setting_name ] ) ) {
					$unit = is_numeric( $settings[ $setting_name ] )
						? $settings['marginUnit']
						: '';

					$settings['spacing'][ $setting_name ] = $settings[ $setting_name ] . $unit;
				}
			}
		}

		return $settings;
	}

	/**
	 * Map our old border attributes.
	 *
	 * @param array $settings Existing settings.
	 * @return array Mapped border settings.
	 */
	public static function map_borders( $settings ) {
		if ( ! empty( $settings['borders'] ) ) {
			return $settings;
		}

		$border_radius_attributes = [
			'borderRadiusTopLeft' => 'borderTopLeftRadius',
			'borderRadiusTopRight' => 'borderTopRightRadius',
			'borderRadiusBottomRight' => 'borderBottomRightRadius',
			'borderRadiusBottomLeft' => 'borderBottomLeftRadius',
		];

		foreach ( self::$devices as $device ) {
			foreach ( $border_radius_attributes as $old_attribute_name => $new_attribute_name ) {
				$setting_name = $old_attribute_name . $device;

				if ( $settings[ $setting_name ] || is_numeric( $settings[ $setting_name ] ) ) {
					$unit = is_numeric( $settings[ $setting_name ] )
						? $settings['borderRadiusUnit']
						: '';

					$settings['borders'][ $new_attribute_name . $device ] = $settings[ $setting_name ] . $unit;
				}
			}
		}

		$border_width_attributes = [
			'borderSizeTop' => 'borderTopWidth',
			'borderSizeRight' => 'borderRightWidth',
			'borderSizeBottom' => 'borderBottomWidth',
			'borderSizeLeft' => 'borderLeftWidth',
		];

		foreach ( self::$devices as $device ) {
			foreach ( $border_width_attributes as $old_attribute_name => $new_attribute_name ) {
				$setting_name = $old_attribute_name . $device;

				if ( $settings[ $setting_name ] || is_numeric( $settings[ $setting_name ] ) ) {
					$unit = is_numeric( $settings[ $setting_name ] )
						? 'px'
						: '';

					$settings['borders'][ $new_attribute_name . $device ] = $settings[ $setting_name ] . $unit;

					$border_style_name = str_replace( 'Width', 'Style', $new_attribute_name );
					$settings['borders'][ $border_style_name . $device ] = 'solid';

					if ( ! empty( $settings['borderColor'] ) ) {
						$border_color_name = str_replace( 'Width', 'Color', $new_attribute_name );
						$settings['borders'][ $border_color_name ] = isset( $settings['borderColorOpacity'] )
							? generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] )
							: $settings['borderColor'];
					}

					if ( ! empty( $settings['borderColorHover'] ) ) {
						$border_color_hover_name = str_replace( 'Width', 'ColorHover', $new_attribute_name );
						$settings['borders'][ $border_color_hover_name ] = isset( $settings['borderColorHoverOpacity'] )
							? generateblocks_hex2rgba( $settings['borderColorHover'], $settings['borderColorHoverOpacity'] )
							: $settings['borderColorHover'];
					}

					if ( ! empty( $settings['borderColorCurrent'] ) ) {
						$border_color_current_name = str_replace( 'Width', 'ColorCurrent', $new_attribute_name );
						$settings['borders'][ $border_color_current_name ] = $settings['borderColorCurrent'];
					}
				}
			}
		}

		return $settings;
	}

	/**
	 * Map our old typography attributes.
	 *
	 * @param array $settings Existing settings.
	 * @return array Mapped spacing settings.
	 */
	public static function map_typography( $settings ) {
		if ( ! empty( $settings['typography'] ) ) {
			return $settings;
		}

		$old_attributes = [
			'fontFamily',
			'fontSize',
			'lineHeight',
			'letterSpacing',
			'fontWeight',
			'textTransform',
			'alignment',
		];

		foreach ( self::$devices as $device ) {
			foreach ( $old_attributes as $attribute ) {
				$setting_name = $attribute . $device;

				if ( isset( $settings[ $setting_name ] ) && ( $settings[ $setting_name ] || is_numeric( $settings[ $setting_name ] ) ) ) {
					$unit = '';

					switch ( $attribute ) {
						case 'fontSize':
							$unit = $settings['fontSizeUnit'];
							break;

						case 'lineHeight':
							$unit = $settings['lineHeightUnit'];
							break;

						case 'letterSpacing':
							$unit = 'em';
							break;
					}

					// textAlign used to be called "alignment".
					if ( 'alignment' === $attribute ) {
						$settings['typography'][ 'textAlign' . $device ] = $settings[ $setting_name ];
						continue;
					}

					$settings['typography'][ $setting_name ] = $settings[ $setting_name ] . $unit;
				}
			}
		}

		return $settings;
	}
}

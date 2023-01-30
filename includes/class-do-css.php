<?php
/**
 * Builds our dynamic CSS.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Creates minified css via PHP.
 */
class GenerateBlocks_Dynamic_CSS {

	/**
	 * The css selector that you're currently adding rules to
	 *
	 * @access protected
	 * @var string
	 */
	protected $_selector = ''; // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Stores the final css output with all of its rules for the current selector.
	 *
	 * @access protected
	 * @var string
	 */
	protected $_selector_output = ''; // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Stores all of the rules that will be added to the selector
	 *
	 * @access protected
	 * @var string
	 */
	protected $_css = ''; // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * The string that holds all of the css to output
	 *
	 * @access protected
	 * @var array
	 */
	protected $_output = array(); // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Sets a selector to the object and changes the current selector to a new one
	 *
	 * @access public
	 * @since  1.0
	 *
	 * @param  string $selector - the css identifier of the html that you wish to target.
	 * @return $this
	 */
	public function set_selector( $selector = '' ) {
		// Render the css in the output string everytime the selector changes.
		if ( '' !== $this->_selector ) {
			$this->add_selector_rules_to_output();
		}

		$this->_selector = $selector;
		return $this;
	}

	/**
	 * Adds a css property with value to the css output
	 *
	 * @access public
	 * @since  1.0
	 *
	 * @param  string $property - the css property.
	 * @param  string $value - the value to be placed with the property.
	 * @param  string $unit - the unit for the value (px).
	 * @return $this
	 */
	public function add_property( $property, $value, $unit = false ) {
		if ( empty( $value ) && ! is_numeric( $value ) ) {
			return false;
		}

		if (
			is_array( $value ) &&
			! array_filter(
				$value,
				function( $v ) {
					return is_numeric( $v ) || 'auto' === $v;
				}
			)
		) {
			return false;
		}

		if ( is_array( $value ) ) {
			$valueTop = generateblocks_has_number_value( $value[0] );
			$valueRight = generateblocks_has_number_value( $value[1] );
			$valueBottom = generateblocks_has_number_value( $value[2] );
			$valueLeft = generateblocks_has_number_value( $value[3] );

			if ( $valueTop && $valueRight && $valueBottom && $valueLeft ) {
				$value = generateblocks_get_shorthand_css( $value[0], $value[1], $value[2], $value[3], $unit );

				if ( 'border-width' === $property ) {
					$this->_css .= 'border-style: solid;';
				}

				$this->_css .= $property . ':' . $value . ';';
				return $this;
			} else {
				if ( $valueTop ) {
					$property_top = $property . '-top';
					$unit_top = $unit;

					if ( 'border-radius' === $property ) {
						$property_top = 'border-top-left-radius';
					} elseif ( 'border-width' === $property ) {
						$property_top = 'border-top-width';
						$this->_css .= 'border-top-style: solid;';
					}

					if ( 0 === $value[0] || '0' === $value[0] || 'auto' === $value[0] ) {
						$unit_top = '';
					}

					$this->_css .= $property_top . ':' . $value[0] . $unit_top . ';';
				}

				if ( $valueRight ) {
					$property_right = $property . '-right';
					$unit_right = $unit;

					if ( 'border-radius' === $property ) {
						$property_right = 'border-top-right-radius';
					} elseif ( 'border-width' === $property ) {
						$property_right = 'border-right-width';
						$this->_css .= 'border-right-style: solid;';
					}

					if ( 0 === $value[1] || '0' === $value[1] || 'auto' === $value[1] ) {
						$unit_right = '';
					}

					$this->_css .= $property_right . ':' . $value[1] . $unit_right . ';';
				}

				if ( $valueBottom ) {
					$property_bottom = $property . '-bottom';
					$unit_bottom = $unit;

					if ( 'border-radius' === $property ) {
						$property_bottom = 'border-bottom-right-radius';
					} elseif ( 'border-width' === $property ) {
						$property_bottom = 'border-bottom-width';
						$this->_css .= 'border-bottom-style: solid;';
					}

					if ( 0 === $value[2] || '0' === $value[2] || 'auto' === $value[2] ) {
						$unit_bottom = '';
					}

					$this->_css .= $property_bottom . ':' . $value[2] . $unit_bottom . ';';
				}

				if ( $valueLeft ) {
					$property_left = $property . '-left';
					$unit_left = $unit;

					if ( 'border-radius' === $property ) {
						$property_left = 'border-bottom-left-radius';
					} elseif ( 'border-width' === $property ) {
						$property_left = 'border-left-width';
						$this->_css .= 'border-left-style: solid;';
					}

					if ( 0 === $value[3] || '0' === $value[3] || 'auto' === $value[3] ) {
						$unit_left = '';
					}

					$this->_css .= $property_left . ':' . $value[3] . $unit_left . ';';
				}

				return $this;
			}
		}

		// Add our unit to our value if it exists.
		if ( $unit ) {
			$value = $value . $unit;
		}

		$this->_css .= $property . ':' . $value . ';';
		return $this;
	}

	/**
	 * Adds the current selector rules to the output variable
	 *
	 * @access private
	 * @since  1.0
	 *
	 * @return $this
	 */
	private function add_selector_rules_to_output() {
		if ( ! empty( $this->_css ) ) {
			$this->_selector_output = $this->_selector;
			$this->_output[ $this->_selector_output ][] = $this->_css;
			$this->_output[ $this->_selector_output ] = array_unique( $this->_output[ $this->_selector_output ] );

			// Reset the css.
			$this->_css = '';
		}

		return $this;
	}

	/**
	 * Returns the minified css in the $_output variable
	 *
	 * @access public
	 * @since  1.0
	 *
	 * @return string
	 */
	public function css_output() {
		// Add current selector's rules to output.
		$this->add_selector_rules_to_output();

		return $this->_output;
	}
}

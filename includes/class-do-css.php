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
 *
 */
class GenerateBlocks_Dynamic_CSS {

	/**
	 * The css selector that you're currently adding rules to
	 *
	 * @access protected
	 * @var string
	 */
	protected $_selector = '';

	/**
	 * Stores the final css output with all of its rules for the current selector.
	 *
	 * @access protected
	 * @var string
	 */
	protected $_selector_output = '';

	/**
	 * Stores all of the rules that will be added to the selector
	 *
	 * @access protected
	 * @var string
	 */
	protected $_css = '';

	/**
	 * The string that holds all of the css to output
	 *
	 * @access protected
	 * @var string
	 */
	protected $_output = '';

	/**
	 * Stores media queries
	 *
	 * @var null
	 */
	protected $_media_query = null;

	/**
	 * The string that holds all of the css to output inside of the media query
	 *
	 * @access protected
	 * @var string
	 */
	protected $_media_query_output = '';

	/**
	 * Sets a selector to the object and changes the current selector to a new one
	 *
	 * @access public
	 * @since  1.0
	 *
	 * @param  string $selector - the css identifier of the html that you wish to target
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
	 * @param  string $property - the css property
	 * @param  string $value - the value to be placed with the property
	 * @param  string $og_default - check to see if the value matches the default
	 * @param  string $unit - the unit for the value (px)
	 * @return $this
	 */
	public function add_property( $property, $value, $unit = false ) {
		// If we don't have a value or our value is the same as our og default, bail.
		if ( empty( $value ) && 0 !== $value && '0' !== $value ) {
			return false;
		}

		if ( is_array( $value ) && ! array_filter( $value ) ) {
			return false;
		}

		if ( is_array( $value ) ) {
			if ( $value[0] && $value[1] && $value[2] && $value[3] ) {
				$value = generateblocks_get_shorthand_css( $value[0], $value[1], $value[2], $value[3], $unit );

				$this->_css .= $property . ':' . $value . ';';
				return $this;
			} else {
				if ( $value[0] || 0 === $value[0] || '0' === $value[0] ) {
					$property_top = $property . '-top';

					if ( 'border-radius' === $property ) {
						$property_top = 'border-top-left-radius';
					} else if ( 'border-width' === $property ) {
						$property_top = 'border-top-width';
					}

					if ( 0 === $value[0] || '0' === $value[0] ) {
						$unit = '';
					}

					$this->_css .= $property_top . ':' . $value[0] . $unit . ';';
				}

				if ( $value[1] || 0 === $value[1] || '0' === $value[1] ) {
					$property_right = $property . '-right';

					if ( 'border-radius' === $property ) {
						$property_right = 'border-top-right-radius';
					} else if ( 'border-width' === $property ) {
						$property_right = 'border-right-width';
					}

					if ( 0 === $value[1] || '0' === $value[1] ) {
						$unit = '';
					}

					$this->_css .= $property_right . ':' . $value[1] . $unit . ';';
				}

				if ( $value[2] || 0 === $value[2] || '0' === $value[2] ) {
					$property_bottom = $property . '-bottom';

					if ( 'border-radius' === $property ) {
						$property_bottom = 'border-bottom-right-radius';
					} else if ( 'border-width' === $property ) {
						$property_bottom = 'border-bottom-width';
					}

					if ( 0 === $value[2] || '0' === $value[2] ) {
						$unit = '';
					}

					$this->_css .= $property_bottom . ':' . $value[2] . $unit . ';';
				}

				if ( $value[3] || 0 === $value[3] || '0' === $value[3] ) {
					$property_left = $property . '-left';

					if ( 'border-radius' === $property ) {
						$property_left = 'border-bottom-left-radius';
					} else if ( 'border-width' === $property ) {
						$property_left = 'border-left-width';
					}

					if ( 0 === $value[3] || '0' === $value[3] ) {
						$unit = '';
					}

					$this->_css .= $property_left . ':' . $value[3] . $unit . ';';
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
	 * Sets a media query in the class
	 *
	 * @since  1.1
	 * @param  string $value
	 * @return $this
	 */
	public function start_media_query( $value ) {
		// Add the current rules to the output.
		$this->add_selector_rules_to_output();

		// Add any previous media queries to the output.
		if ( ! empty( $this->_media_query ) ) {
			$this->add_media_query_rules_to_output();
		}

		// Set the new media query.
		$this->_media_query = $value;
		return $this;
	}

	/**
	 * Stops using a media query.
	 *
	 * @see    start_media_query()
	 *
	 * @since  1.1
	 * @return $this
	 */
	public function stop_media_query() {
		return $this->start_media_query( null );
	}

	/**
	 * Adds the current media query's rules to the class' output variable
	 *
	 * @since  1.1
	 * @return $this
	 */
	private function add_media_query_rules_to_output() {
		if ( ! empty( $this->_media_query_output ) ) {
			$this->_output .= sprintf( '@media %1$s{%2$s}', $this->_media_query, $this->_media_query_output );

			// Reset the media query output string.
			$this->_media_query_output = '';
		}

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
			$selector_output = sprintf( '%1$s{%2$s}', $this->_selector_output, $this->_css );

			// Add our CSS to the output.
			if ( ! empty( $this->_media_query ) ) {
				$this->_media_query_output .= $selector_output;
				$this->_css = '';
			} else {
				$this->_output .= $selector_output;
			}

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

		// Output minified css.
		return $this->_output;
	}

}

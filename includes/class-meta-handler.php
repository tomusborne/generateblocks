<?php
/**
 * The retrieve metadata and options.
 *
 * @package GenerateBlocks\Meta_Handler
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for handling dynamic tags.
 *
 * @since 2.0.0
 */
class GenerateBlocks_Meta_Handler extends GenerateBlocks_Singleton {
	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {

	}

	/**
	 * Check to see if a value if array-like and if so, get the provided property from it.
	 *
	 * @param mixed $value The value to check the property against.
	 * @param mixed $property The property to retrieve from the value if it exists.
	 * @param bool  $single_only If true, only return value if it's a string-like value.
	 * @return mixed The $property value if it exists, otherwise the $value.
	 */
	public static function maybe_get_property( $value, $property, $single_only = true ) {
		if ( ! $property
			&& ! $single_only
			&& ( is_array( $value ) || is_object( $value ) )
		) {
			return $value;
		}

		if ( is_array( $value ) ) {
			return $value[ $property ] ?? $value;
		} elseif ( is_object( $value ) ) {
			return $value->$property ?? $value;
		}

		// Return the value if it's not an array or object.
		return $value;
	}

	/**
	 * Parse a dynamic tag key and retrieve a value from it.
	 *
	 * @param string     $key The key from the parent value for retrieval.
	 * @param string|int $parent_value The parent value to check the key against.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @param string     $fallback The fallback value if the return value is empty.
	 * @return string
	 */
	public static function get_value( $key, $parent_value, $single_only = true, $fallback = '' ) {
		$parts = explode( '.', $key );

		// var_dump( $key, $parts, $parent_value );

		// Stop here if we can't find at least one sub field name in the key.
		if ( count( $parts ) < 2 ) {
			if ( $single_only ) {
				return is_string( $parent_value ) ? $parent_value : $fallback;
			} elseif ( is_array( $parent_value ) || is_object( $parent_value ) ) {
				return $parent_value ? $parent_value : $fallback;
			}
		}

		$sub_name  = $parts[1];
		$sub_value = self::maybe_get_property( $parent_value, $sub_name, $single_only );

		if ( is_array( $sub_value ) || is_object( $sub_value ) ) {
			return self::get_value(
				implode( '.', array_slice( $parts, 1 ) ),
				$sub_value
			);
		}

		// Coerce simple values to strings.
		$value = (string) $sub_value;

		return '' !== $value ? $value : $fallback;
	}

	/**
	 * Get a meta value.
	 *
	 * @param string|int $id The id of the em to fetch meta from.
	 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @param string     $callable Function name to call. Should be a native WordPress function (ex: get_post_meta).
	 * @param string     $fallback The fallback value to show if the returned value is empty.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_meta( $id, $key, $single_only = true, $callable = null, $fallback = '' ) {
		if ( ! is_string( $callable ) || ! function_exists( $callable ) ) {
			return '';
		}

		$key_parts = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];

		if ( empty( $key ) ) {
			return '';
		}

		/**
		 * Allow a filter to set this meta value using some
		 * custom setter function (such as get_field in ACF). If this value returns
		 * something we can skip calling get_post_meta for it and return the value instead.
		 *
		 * @since 2.0.0
		 *
		 * @param string|null $pre_value The pre-filtered value, or null if unset.
		 * @param int         $id The entity ID used to fetch the meta value.
		 * @param string      $key The meta key to fetch.
		 * @param string      $callable Function name to call. Should be a native WordPress function (ex: get_post_meta).
		 * @param bool        $single_only If true, only return value if it's a string-like value.
		 */
		$pre_value = apply_filters(
			'generateblocks_get_meta_pre_value',
			null,
			$id,
			$key,
			$callable
		);

		$meta = $pre_value ? $pre_value : call_user_func( $callable, $id, $parent_name, true );

		$meta = apply_filters(
			'generateblocks_get_meta_object',
			$meta,
			$id,
			$key,
			$callable
		);

		$value = self::get_value( $key, $meta, $single_only, $fallback );

		/**
		 * Filter the result of get_value for entity meta.
		 *
		 * @since 2.0.0
		 * @param string|int $id The ID of the entity to fetch meta from.
		 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
		 * @param bool       $single_only If true, only return value if it's a string-like value.
		 * @param string     $callable Function name to call. Should be a native WordPress function (ex: get_post_meta).
		 */
		return apply_filters( 'generateblocks_get_meta_value', $value, $id, $key, $single_only, $callable );
	}

	/**
	 * Get the post meta.
	 *
	 * @param string|int $id The id of the post to fetch meta from.
	 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_post_meta( $id, $key, $single_only = true ) {
		return self::get_meta( $id, $key, $single_only, 'get_post_meta' );
	}


	/**
	 * Get the user meta.
	 *
	 * @param string|int $id The id of the user to fetch meta from.
	 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_user_meta( $id, $key, $single_only = true ) {
		return self::get_meta( $id, $key, $single_only, 'get_user_meta' );
	}

	/**
	 * Get the term meta.
	 *
	 * @param string|int $id The id of the term to fetch meta from.
	 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_term_meta( $id, $key, $single_only = true ) {
		return self::get_meta( $id, $key, $single_only, 'get_term_meta' );
	}

	/**
	 * Get the term meta.
	 *
	 * @param string $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool   $single_only If true, only return value if it's a string-like value.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_option( $key, $single_only = true ) {
		return self::get_meta( 'option', $key, $single_only, 'get_option' );
	}
}

GenerateBlocks_Meta_Handler::get_instance()->init();

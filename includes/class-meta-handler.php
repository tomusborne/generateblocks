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

	const DISALLOWED_KEYS = [
		'post_password',
		'password',
		'user_pass',
	];

	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	/**
	 * Register class REST routes.
	 *
	 * @return void
	 */
	public function register_rest_routes() {

		register_rest_route(
			'generateblocks/v1',
			'/meta/get-post-meta',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_post_meta_rest' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/meta/get-user-meta',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_user_meta_rest' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/meta/get-term-meta',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_post_meta_rest' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/meta/get-option',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_option_rest' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

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
	 * Check if a value is an array or object.
	 *
	 * @param mixed $value The value to check.
	 * @return bool If the value is an array or object.
	 */
	public static function is_array_or_object( $value ) {
		return is_array( $value ) || is_object( $value );
	}

	/**
	 * Recursive or single value retrieval.
	 *
	 * @param string     $key The key from the parent value for retrieval.
	 * @param string|int $parent_value The parent value to check the key against.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @param string     $fallback The fallback value if the return value is empty.
	 * @return string
	 */
	public static function get_value( $key, $parent_value, $single_only = true, $fallback = '' ) {
		// Stop here if the key is empty, and not "0".
		if ( empty( $key ) && ! is_numeric( $key ) ) {
			if ( $single_only ) {
				$parent_value = self::is_array_or_object( $parent_value ) ? $fallback : (string) $parent_value;

				return '' !== $parent_value ? $parent_value : $fallback;
			}

			return self::is_array_or_object( $parent_value ) ? $parent_value : $fallback;
		}

		$parts     = explode( '.', $key );
		$sub_value = self::maybe_get_property( $parent_value, $parts[0], $single_only );

		if ( self::is_array_or_object( $sub_value ) ) {
			return self::get_value(
				implode( '.', array_slice( $parts, 1 ) ),
				$sub_value,
				$single_only,
				$fallback
			);
		}

		// Coerce simple values to strings.
		$value = (string) $sub_value;

		return '' !== $value ? $value : $fallback;
	}

	/**
	 * Get a meta value.
	 *
	 * @param string|int $id The id of the entity to fetch meta from.
	 * @param string     $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool       $single_only If true, only return value if it's a string-like value.
	 * @param string     $callable Function name to call. Should be a native WordPress function (ex: get_post_meta).
	 * @param string     $fallback The fallback value to show if the returned value is empty.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_meta( $id, $key, $single_only = true, $callable = null, $fallback = '' ) {
		if ( ! is_string( $callable ) || ! function_exists( $callable ) || ! is_string( $key ) ) {
			return '';
		}

		$key_parts = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];

		if ( empty( $key ) || in_array( $parent_name, self::DISALLOWED_KEYS, true ) ) {
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
			$callable,
			$single_only
		);

		if ( is_numeric( $id ) ) {
			$meta = $pre_value ? $pre_value : call_user_func( $callable, $id, $parent_name, true );
		} else {
			$meta = $pre_value ? $pre_value : call_user_func( $callable, $parent_name );
		}

		// Some user meta is stored as user data.
		// If we're looking for user meta and can't find it, let's check for user data as well.
		if ( ! $meta && 'get_user_meta' === $callable ) {
			$meta = get_the_author_meta( $parent_name, $id );
		}

		$meta = apply_filters(
			'generateblocks_get_meta_object',
			$meta,
			$id,
			$key,
			$callable
		);

		// Only send the sub key(s) through. If they're empty this will return the value of $meta.
		array_shift( $key_parts );
		$sub_key = implode( '.', $key_parts );
		$value = self::get_value( $sub_key, $meta, $single_only, $fallback );

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
	 * Rest handler for get_post_meta
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function get_post_meta_rest( $request ) {
		$id          = (int) $request->get_param( 'id' );
		$key         = $request->get_param( 'key' );
		$single_only = true;

		if ( 'false' === $request->get_param( 'singleOnly' ) ) {
			$single_only = false;
		}

		return rest_ensure_response( self::get_post_meta( $id, $key, $single_only ) );
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
	 * Rest handler for get_user_meta
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function get_user_meta_rest( $request ) {
		$id          = (int) $request->get_param( 'id' );
		$key         = $request->get_param( 'key' );
		$single_only = true;

		if ( 'false' === $request->get_param( 'singleOnly' ) ) {
			$single_only = false;
		}

		return rest_ensure_response( self::get_user_meta( $id, $key, $single_only ) );
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
	 * Rest handler for get_term_meta
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function get_term_meta_rest( $request ) {
		$id          = (int) $request->get_param( 'id' );
		$key         = $request->get_param( 'key' );
		$single_only = true;

		if ( 'false' === $request->get_param( 'singleOnly' ) ) {
			$single_only = false;
		}

		return rest_ensure_response( self::get_term_meta( $id, $key, $single_only ) );
	}

	/**
	 * Get an option's value.
	 *
	 * @param string $key The meta key to fetch. May include one or more sub keys separated by a period.
	 * @param bool   $single_only If true, only return value if it's a string-like value.
	 * @return string|array|object The returned value or an empty string if not found.
	 */
	public static function get_option( $key, $single_only = true ) {
		return self::get_meta( 'option', $key, $single_only, 'get_option' );
	}

	/**
	 * Rest handler for get_option
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error The response object.
	 */
	public function get_option_rest( $request ) {
		$key         = $request->get_param( 'key' );
		$single_only = true;

		if ( 'false' === $request->get_param( 'singleOnly' ) ) {
			$single_only = false;
		}

		return rest_ensure_response( self::get_option( $key, $single_only ) );
	}
}

GenerateBlocks_Meta_Handler::get_instance()->init();

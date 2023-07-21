<?php
/**
 * The Pattern library class file.
 *
 * @package GenerateBlocks\Pattern_Library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main class for the Pattern Library Rest functions.
 *
 * @since 1.9
 */
class GenerateBlocks_Pattern_Library_Rest extends GenerateBlocks_Singleton {

	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register the REST routes.
	 *
	 * @return void
	 */
	public function register_routes(): void {
		$namespace = 'generateblocks/v1';

		register_rest_route(
			$namespace,
			'/pattern-library/libraries',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'list_libraries' ),
				'permission_callback' => array( $this, 'manage_options_permission' ),
			)
		);

		register_rest_route(
			$namespace,
			'/pattern-library/libraries/save',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'save_libraries' ),
				'permission_callback' => array( $this, 'manage_options_permission' ),
			)
		);

		register_rest_route(
			$namespace,
			'/pattern-library/categories',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'list_categories' ),
				'permission_callback' => array( $this, 'edit_posts_permission' ),
			)
		);

		register_rest_route(
			$namespace,
			'/pattern-library/patterns',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'list_patterns' ),
				'permission_callback' => array( $this, 'edit_posts_permission' ),
			)
		);
	}

	/**
	 * Manage options permission callback.
	 *
	 * @return bool
	 */
	public function manage_options_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Manage options permission callback.
	 *
	 * @return bool
	 */
	public function edit_posts_permission(): bool {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Returns a list of registered libraries.
	 *
	 * @param WP_REST_Request $request The request.
	 *
	 * @return WP_REST_Response
	 */
	public function list_libraries( WP_REST_Request $request ): WP_REST_Response {
		$is_enabled = $request->get_param( 'is_enabled' );
		$libraries = GenerateBlocks_Libraries::get_instance();
		$data = $libraries->get_all( ! ! $is_enabled );

		return new WP_REST_Response(
			array(
				'error'  => false,
				'data' => $data,
			),
			200
		);
	}

	/**
	 * Saves the list of libraries.
	 *
	 * @param WP_REST_Request $request The request.
	 *
	 * @return WP_REST_Response
	 */
	public function save_libraries( WP_REST_Request $request ): WP_REST_Response {
		$data = $request->get_param( 'data' );

		$instance = GenerateBlocks_Libraries::get_instance();
		$libraries = array_map( array( $instance, 'create' ), $data );

		update_option( 'generateblocks_pattern_libraries', $libraries );

		return new WP_REST_Response(
			array(
				'error'  => false,
				'success' => true,
			),
			200
		);
	}

	/**
	 * Returns a list of categories.
	 *
	 * @param WP_REST_Request $request The request.
	 *
	 * @return WP_REST_Response
	 */
	public function list_categories( WP_REST_Request $request ): WP_REST_Response {
		$library_id = $request->get_param( 'libraryId' );

		if ( ! $library_id ) {
			return $this->error( 404, "Library of id \"$library_id\" was not found." );
		}

		$libraries = GenerateBlocks_Libraries::get_instance();
		$library = $libraries->get_one( $library_id );

		if ( ! is_null( $library ) ) {
			return self::remote_fetch( $library, 'categories' );
		}

		return $this->error( 404, "Library of id \"$library_id\" was not found." );
	}

	/**
	 * Returns a list of patterns.
	 *
	 * @param WP_REST_Request $request The request.
	 *
	 * @return WP_REST_Response
	 */
	public function list_patterns( WP_REST_Request $request ): WP_REST_Response {
		$library_id = $request->get_param( 'libraryId' );
		$search = $request->get_param( 'search' );
		$category_id = $request->get_param( 'categoryId' );

		if ( ! $library_id ) {
			return $this->error( 404, "Library of id \"$library_id\" was not found." );
		}

		$libraries = GenerateBlocks_Libraries::get_instance();
		$library = $libraries->get_one( $library_id );

		if ( ! is_null( $library ) ) {
			return self::remote_fetch(
				$library,
				'patterns',
				array(
					'search' => $search,
					'categoryId' => $category_id,
				)
			);
		}

		return $this->error( 404, "Library of id \"$library_id\" was not found." );
	}

	/**
	 * Fetch pattern library remotely.
	 *
	 * @param GenerateBlocks_Library_DTO $library The library to fetch data.
	 * @param string                     $collection The collection type. Either 'categories' or 'patterns'.
	 * @param array                      $query_args The extra query arguments.
	 *
	 * @return WP_REST_Response
	 */
	private function remote_fetch(
		GenerateBlocks_Library_DTO $library,
		string $collection,
		array $query_args = array()
	): WP_REST_Response {
		$endpoint = "$library->domain/wp-json/generateblocks-pro/v1/pattern-library/$collection";
		$url = add_query_arg( $query_args, $endpoint );
		$key = 'gb_default_free_library' === $library->id
			? 'GxroZpidKoLZ2ofWNJdXtanAK9ZozWKo'
			: $library->public_key;

		$request = wp_remote_get(
			$url,
			array(
				'headers' => array(
					'X-GB-Public-Key' => $key,
				),
			)
		);

		if ( ! is_wp_error( $request ) ) {
			$body = wp_remote_retrieve_body( $request );
			$body = json_decode( $body, true );

			return new WP_REST_Response(
				array(
					'success'  => true,
					'response' => array(
						'data' => $body['response']['data'],
					),
				),
				200
			);
		} else {
			return self::error( 500, "Unable to request from $endpoint" );
		}
	}

	/**
	 * Returns a error response.
	 *
	 * @param int    $code Error code.
	 * @param string $message Error message.
	 *
	 * @return WP_REST_Response
	 */
	private function error( int $code, string $message ): WP_REST_Response {
		return new WP_REST_Response(
			array(
				'error'      => true,
				'success'    => false,
				'error_code' => $code,
				'response'   => $message,
			),
			$code
		);
	}
}

GenerateBlocks_Pattern_Library_Rest::get_instance()->init();

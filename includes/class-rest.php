<?php
/**
 * Rest API functions
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class GenerateBlocks_Rest
 */
class GenerateBlocks_Rest extends WP_REST_Controller {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 */
	private static $instance;

	/**
	 * Namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'generateblocks/v';

	/**
	 * Version.
	 *
	 * @var string
	 */
	protected $version = '1';

	/**
	 * Onboarding meta key.
	 *
	 * @var string
	 */
	const ONBOARDING_META_KEY = 'generateblocks_onboarding';

	/**
	 * Initiator.
	 *
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * GenerateBlocks_Rest constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register rest routes.
	 */
	public function register_routes() {
		$namespace = $this->namespace . $this->version;

		// Update Settings.
		register_rest_route(
			$namespace,
			'/settings/',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_settings' ),
				'permission_callback' => array( $this, 'update_settings_permission' ),
			)
		);

		// Update single setting.
		register_rest_route(
			$namespace,
			'/setting/',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_setting' ),
				'permission_callback' => array( $this, 'update_settings_permission' ),
			)
		);

		// Regenerate CSS Files.
		register_rest_route(
			$namespace,
			'/regenerate_css_files/',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'regenerate_css_files' ),
				'permission_callback' => array( $this, 'update_settings_permission' ),
			)
		);

		register_rest_route(
			$namespace,
			'/onboarding/',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'onboarding' ),
				'permission_callback' => array( $this, 'onboarding_permission' ),
			)
		);

		register_rest_route(
			$namespace,
			'/get-attachment-by-url/',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_attachment_by_url' ),
				'permission_callback' => array( $this, 'can_edit_posts' ),
			)
		);
	}

	/**
	 * Get edit options permissions.
	 *
	 * @return bool
	 */
	public function update_settings_permission() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Sanitize our options.
	 *
	 * @since 1.2.0
	 * @param string $name The setting name.
	 * @param mixed  $value The value to save.
	 */
	public function sanitize_value( $name, $value ) {
		$callbacks = apply_filters(
			'generateblocks_option_sanitize_callbacks',
			array(
				'container_width'          => 'absint',
				'css_print_method'         => 'sanitize_text_field',
				'sync_responsive_previews' => 'rest_sanitize_boolean',
				'disable_google_fonts'     => 'rest_sanitize_boolean',
				'gb_use_v1_blocks'         => 'rest_sanitize_boolean',
			)
		);

		$callback = $callbacks[ $name ];

		if ( ! is_callable( $callback ) ) {
			return sanitize_text_field( $value );
		}

		return $callback( $value );
	}

	/**
	 * Update a single setting.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function update_setting( WP_REST_Request $request ) {
		$name  = $request->get_param( 'name' );
		$value = $request->get_param( 'value' );

		$allowed_settings = [
			'gb_use_v1_blocks',
		];

		if ( ! in_array( $name, $allowed_settings, true ) ) {
			return $this->error( 'rest_forbidden', 'Sorry, you are not allowed to update this setting.' );
		}

		$value = $this->sanitize_value( $name, $value );

		update_option( $name, $value );

		return $this->success( __( 'Settings saved.', 'generateblocks' ) );
	}

	/**
	 * Update Settings.
	 *
	 * @param WP_REST_Request $request  request object.
	 *
	 * @return mixed
	 */
	public function update_settings( WP_REST_Request $request ) {
		$current_settings = get_option( 'generateblocks', array() );
		$new_settings     = $request->get_param( 'settings' );

		foreach ( $new_settings as $name => $value ) {
			// Skip if the option hasn't changed.
			if ( isset( $current_settings[ $name ] ) && $current_settings[ $name ] === $new_settings[ $name ] ) {
				unset( $new_settings[ $name ] );
				continue;
			}

			// Only save options that we know about.
			if ( ! array_key_exists( $name, generateblocks_get_option_defaults() ) ) {
				unset( $new_settings[ $name ] );
				continue;
			}

			// Sanitize our value.
			$new_settings[ $name ] = $this->sanitize_value( $name, $value );
		}

		if ( empty( $new_settings ) ) {
			return $this->success( __( 'No changes found.', 'generateblocks' ) );
		}

		if ( is_array( $new_settings ) ) {
			update_option( 'generateblocks', array_merge( $current_settings, $new_settings ) );
		}

		return $this->success( __( 'Settings saved.', 'generateblocks' ) );
	}

	/**
	 * Regenerate CSS Files.
	 *
	 * @param WP_REST_Request $request  request object.
	 *
	 * @return mixed
	 */
	public function regenerate_css_files( WP_REST_Request $request ) {
		update_option( 'generateblocks_dynamic_css_posts', array() );

		return $this->success( __( 'CSS files regenerated.', 'generateblocks' ) );
	}

	/**
	 * Mark an onboard as "viewed" by the user.
	 *
	 * @param WP_REST_Request $request request object.
	 *
	 * @return WP_REST_Response The response.
	 */
	public function onboarding( WP_REST_Request $request ) {
		$user_id = get_current_user_id();
		$onboard = get_user_meta( $user_id, self::ONBOARDING_META_KEY, true );
		$key = $request->get_param( 'key' );

		if ( ! $onboard ) {
			$onboard = array();
		}

		$onboard[ $key ] = true;

		update_user_meta( get_current_user_id(), self::ONBOARDING_META_KEY, $onboard );

		return new WP_REST_Response( array( 'success' => true ), 200 );
	}

	/**
	 * Get the attachment object by its URL.
	 *
	 * @param WP_REST_Request $request request object.
	 *
	 * @return WP_REST_Response The response.
	 */
	public function get_attachment_by_url( WP_REST_Request $request ) {
		$url = $request->get_param( 'url' );

		if ( ! $url ) {
			return $this->error( 'no_url', __( 'No URL provided.', 'generateblocks' ) );
		}

		// Regular expression to remove '-300x300' like size patterns from the URL.

		$pattern = '/-\d+x\d+(?=\.\w{3,4}$)/';
		$url = preg_replace( $pattern, '', $url );
		$id = attachment_url_to_postid( $url );

		if ( ! $id ) {
			return $this->error( 'no_attachment', __( 'No attachment found.', 'generateblocks' ) );
		}

		// Get image metadata, such as width, height, and sizes.
		$image_metadata = wp_get_attachment_metadata( $id );

		// Get the full URL of the image.
		$full_url = wp_get_attachment_url( $id );

		// Get URLs for all available sizes.
		$sizes = [];
		$image_sizes = get_intermediate_image_sizes();
		foreach ( $image_sizes as $size ) {
			$image_src = wp_get_attachment_image_src( $id, $size );
			if ( $image_src && $image_src[0] !== $full_url ) {
				$sizes[ $size ] = [
					'url'    => $image_src[0],
					'width'  => $image_src[1],
					'height' => $image_src[2],
				];
			}
		}

		$response = [
			'id'       => $id,
			'full_url' => $full_url,
			'width'    => isset( $image_metadata['width'] ) ? $image_metadata['width'] : '',
			'height'   => isset( $image_metadata['height'] ) ? $image_metadata['height'] : '',
			'sizes'    => $sizes,
		];

		return $this->success( $response );
	}


	/**
	 * Get onboarding edit permission.
	 *
	 * @return bool
	 */
	public function onboarding_permission() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Check if the user can edit posts.
	 */
	public function can_edit_posts() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Success rest.
	 *
	 * @param mixed $response response data.
	 * @return mixed
	 */
	public function success( $response ) {
		return new WP_REST_Response(
			array(
				'success'  => true,
				'response' => $response,
			),
			200
		);
	}

	/**
	 * Error rest.
	 *
	 * @param mixed $code     error code.
	 * @param mixed $response response data.
	 * @return mixed
	 */
	public function error( $code, $response ) {
		return new WP_REST_Response(
			array(
				'error'      => true,
				'success'    => false,
				'error_code' => $code,
				'response'   => $response,
			),
			401
		);
	}
}

GenerateBlocks_Rest::get_instance();

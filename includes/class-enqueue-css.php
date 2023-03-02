<?php
/**
 * Handles the CSS Output.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue our block CSS to the current page.
 */
class GenerateBlocks_Enqueue_CSS {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 * @since 0.1
	 */
	private static $instance;

	/**
	 * Check to see if we've made this CSS in this instance.
	 * This should only run on first load if needed.
	 *
	 * @access private
	 * @var boolean
	 */
	private static $has_made_css = false;

	/**
	 * Check to see if we've enqueued our CSS.
	 *
	 * @access private
	 * @var boolean
	 */
	private static $has_enqueued_css = false;

	/**
	 * Initiator.
	 *
	 * @since 0.1
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->add_options();

		add_action( 'save_post', array( $this, 'post_update_option' ), 10, 2 );
		add_action( 'save_post_wp_block', array( $this, 'wp_block_update' ), 10, 2 );
		add_action( 'init', array( $this, 'enqueue_assets' ) );
		add_filter( 'widget_update_callback', array( $this, 'force_file_regen_on_widget_save' ) );
		add_action( 'customize_save_after', array( $this, 'force_file_regen_on_customizer_save' ) );
	}

	/**
	 * Tell our system it's ok to generate CSS.
	 */
	private function enable_enqueue() {
		self::$has_enqueued_css = true;
	}

	/**
	 * Check to see if we can generate CSS.
	 */
	public static function can_enqueue() {
		return self::$has_enqueued_css || ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() );
	}

	/**
	 * Enqueue our front-end assets.
	 */
	public function enqueue_assets() {
		$dynamic_css_priority = apply_filters( 'generateblocks_dynamic_css_priority', 25 );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_dynamic_css' ), $dynamic_css_priority );
		add_action( 'wp_enqueue_scripts', array( $this, 'print_inline_css' ), $dynamic_css_priority );
	}

	/**
	 * Get the current page ID.
	 */
	public function page_id() {
		global $post;

		$id = isset( $post ) ? $post->ID : false;
		$id = ( ! is_singular() ) ? false : $id;
		$id = ( function_exists( 'is_shop' ) && is_shop() ) ? get_option( 'woocommerce_shop_page_id' ) : $id;
		$id = ( is_home() ) ? get_option( 'page_for_posts' ) : $id;

		return $id;
	}

	/**
	 * Determine if we're using file mode or inline mode.
	 */
	public function mode() {
		// Check if we're using file mode or inline mode.
		// Default to file mode and fallback to inline if file mode is not possible.
		$mode = apply_filters( 'generateblocks_css_print_method', 'file' );

		if (
			( function_exists( 'is_customize_preview' ) && is_customize_preview() )
			||
			is_preview()
			||
			// AMP inlines all CSS, so inlining from the start improves CSS processing performance.
			( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() )
		) {
			return 'inline';
		}

		// Additional checks for file mode.
		if ( 'file' === $mode && $this->needs_update() ) {
			// Only allow processing 1 file every 5 seconds.
			$current_time = (int) time();
			$last_time    = (int) get_option( 'generateblocks_dynamic_css_time' );

			if ( 5 <= ( $current_time - $last_time ) ) {
				// Attempt to write to the file.
				$mode = ( $this->can_write() && $this->make_css() ) ? 'file' : 'inline';

				// Does again if the file exists.
				if ( 'file' === $mode ) {
					$mode = ( file_exists( $this->file( 'path' ) ) ) ? 'file' : 'inline';
				}
			}
		}

		return $mode;
	}

	/**
	 * Enqueue the dynamic CSS.
	 */
	public function enqueue_dynamic_css() {
		$this->enable_enqueue();
		$page_id = $this->page_id();

		if ( ! $page_id ) {
			return;
		}

		$has_generateblocks = get_post_meta( $page_id, '_generateblocks_dynamic_css_version', true );

		if ( empty( $has_generateblocks ) ) {
			return;
		}

		if ( 'file' === $this->mode() ) {
			if ( ! self::$has_made_css ) {
				// Store our block IDs based on the content we find.
				generateblocks_get_dynamic_css( '', true );
			}

			wp_enqueue_style( 'generateblocks', esc_url( $this->file( 'uri' ) ), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		}
	}

	/**
	 * Print our inline CSS.
	 */
	public function print_inline_css() {
		$this->enable_enqueue();

		if ( 'inline' === $this->mode() || ! wp_style_is( 'generateblocks', 'enqueued' ) ) {
			// Build our CSS based on the content we find.
			generateblocks_get_dynamic_css();

			$css = generateblocks_get_frontend_block_css();

			if ( empty( $css ) ) {
				return;
			}

			// Add a "dummy" handle we can add inline styles to.
			wp_register_style( 'generateblocks', false ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			wp_enqueue_style( 'generateblocks' );

			wp_add_inline_style(
				'generateblocks',
				wp_strip_all_tags( $css ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
	}

	/**
	 * Make our CSS.
	 */
	public function make_css() {
		$page_id = $this->page_id();

		if ( ! $page_id ) {
			return false;
		}

		$has_generateblocks = get_post_meta( $page_id, '_generateblocks_dynamic_css_version', true );

		if ( empty( $has_generateblocks ) ) {
			return false;
		}

		// Build our CSS based on the content we find.
		generateblocks_get_dynamic_css();

		$content = generateblocks_get_frontend_block_css();

		if ( ! $content ) {
			return false;
		}

		// If we only have a little CSS, we should inline it.
		$css_size = strlen( $content );

		if ( $css_size < (int) apply_filters( 'generateblocks_css_inline_length', 500 ) ) {
			return false;
		}

		$filesystem = generateblocks_get_wp_filesystem();

		if ( ! $filesystem ) {
			return false;
		}

		// Take care of domain mapping.
		if ( defined( 'DOMAIN_MAPPING' ) && DOMAIN_MAPPING ) {
			if ( function_exists( 'domain_mapping_siteurl' ) && function_exists( 'get_original_url' ) ) {
				$mapped_domain = domain_mapping_siteurl( false );
				$original_domain = get_original_url( 'siteurl' );

				$content = str_replace( $original_domain, $mapped_domain, $content );
			}
		}

		if ( is_writable( $this->file( 'path' ) ) || ( ! file_exists( $this->file( 'path' ) ) && is_writable( dirname( $this->file( 'path' ) ) ) ) ) {
			$chmod_file = 0644;

			if ( defined( 'FS_CHMOD_FILE' ) ) {
				$chmod_file = FS_CHMOD_FILE;
			}

			if ( ! $filesystem->put_contents( $this->file( 'path' ), wp_strip_all_tags( $content ), $chmod_file ) ) {

				// Fail!
				return false;

			} else {

				$option             = get_option( 'generateblocks_dynamic_css_posts', array() );
				$option[ $page_id ] = true;
				update_option( 'generateblocks_dynamic_css_posts', $option );

				// Update the 'generateblocks_dynamic_css_time' option.
				$this->update_saved_time();

				// Set flag.
				self::$has_made_css = true;

				// Success!
				return true;

			}
		}
	}

	/**
	 * Determines if the CSS file is writable.
	 */
	public function can_write() {
		global $blog_id;

		// Get the upload directory for this site.
		$upload_dir = wp_get_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = ( is_multisite() && $blog_id > 1 ) ? '_blog-' . $blog_id : null;
		$page_id     = $this->page_id();

		if ( ! $page_id ) {
			return false;
		}

		$file_name   = '/style' . $css_blog_id . '-' . $page_id . '.css';
		$folder_path = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'generateblocks';

		// Does the folder exist?
		if ( file_exists( $folder_path ) ) {
			// Folder exists, but is the folder writable?
			if ( ! is_writable( $folder_path ) ) {
				// Folder is not writable.
				// Does the file exist?
				if ( ! file_exists( $folder_path . $file_name ) ) {
					// File does not exist, therefore it can't be created
					// since the parent folder is not writable.
					return false;
				} else {
					// File exists, but is it writable?
					if ( ! is_writable( $folder_path . $file_name ) ) {
						// Nope, it's not writable.
						return false;
					}
				}
			} else {
				// The folder is writable.
				// Does the file exist?
				if ( file_exists( $folder_path . $file_name ) ) {
					// File exists.
					// Is it writable?
					if ( ! is_writable( $folder_path . $file_name ) ) {
						// Nope, it's not writable.
						return false;
					}
				}
			}
		} else {
			// Can we create the folder?
			// returns true if yes and false if not.
			return wp_mkdir_p( $folder_path );
		}

		// all is well!
		return true;
	}

	/**
	 * Gets the css path or url to the stylesheet
	 *
	 * @param string $target path/url.
	 */
	public function file( $target = 'path' ) {
		global $blog_id;

		// Get the upload directory for this site.
		$upload_dir = wp_get_upload_dir();

		// If this is a multisite installation, append the blogid to the filename.
		$css_blog_id = ( is_multisite() && $blog_id > 1 ) ? '_blog-' . $blog_id : null;
		$page_id     = $this->page_id();

		$file_name   = 'style' . $css_blog_id . '-' . $page_id . '.css';
		$folder_path = $upload_dir['basedir'] . DIRECTORY_SEPARATOR . 'generateblocks';

		// The complete path to the file.
		$file_path = $folder_path . DIRECTORY_SEPARATOR . $file_name;

		// Get the URL directory of the stylesheet.
		$css_uri_folder = $upload_dir['baseurl'];

		$css_uri = trailingslashit( $css_uri_folder ) . 'generateblocks/' . $file_name;

		// Take care of domain mapping.
		if ( defined( 'DOMAIN_MAPPING' ) && DOMAIN_MAPPING ) {
			if ( function_exists( 'domain_mapping_siteurl' ) && function_exists( 'get_original_url' ) ) {
				$mapped_domain   = domain_mapping_siteurl( false );
				$original_domain = get_original_url( 'siteurl' );
				$css_uri         = str_replace( $original_domain, $mapped_domain, $css_uri );
			}
		}

		$css_uri = set_url_scheme( $css_uri );

		if ( 'path' === $target ) {
			return $file_path;
		} elseif ( 'url' === $target || 'uri' === $target ) {
			$timestamp = ( file_exists( $file_path ) ) ? '?ver=' . filemtime( $file_path ) : '';
			return $css_uri . $timestamp;
		}
	}

	/**
	 * Create settings.
	 */
	public function add_options() {
		/**
		 * The 'generateblocks_dynamic_css_posts' option will hold an array of posts that have had their css generated.
		 * We can use that to keep track of which pages need their CSS to be recreated and which don't.
		 */
		add_option( 'generateblocks_dynamic_css_posts', array(), '', 'yes' );

		/**
		 * The 'generateblocks_dynamic_css_time' option holds the time the file writer was last used.
		 */
		add_option( 'generateblocks_dynamic_css_time', time(), '', 'yes' );
	}

	/**
	 * Update the generateblocks_dynamic_css_posts option when a post is saved.
	 *
	 * @param int    $post_id The current post ID.
	 * @param object $post The current post.
	 */
	public function post_update_option( $post_id, $post ) {
		$is_autosave = wp_is_post_autosave( $post_id );
		$is_revision = wp_is_post_revision( $post_id );

		if ( $is_autosave || $is_revision || ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		if ( isset( $post->post_content ) ) {
			if ( strpos( $post->post_content, 'wp:generateblocks' ) !== false ) {
				update_post_meta( $post_id, '_generateblocks_dynamic_css_version', sanitize_text_field( GENERATEBLOCKS_VERSION ) );
			} else {
				delete_post_meta( $post_id, '_generateblocks_dynamic_css_version' );
			}

			// Store any re-usable block IDs on the page. We need this to regenerate CSS files later if the re-usable block is changed.
			$reusable_blocks = preg_match_all( '/wp:block {"ref":([^}]*)}/', $post->post_content, $matches );
			$stored_reusable_blocks = array();

			foreach ( $matches[1] as $match ) {
				$stored_reusable_blocks[] = $match;
			}

			if ( ! empty( $stored_reusable_blocks ) ) {
				$stored_reusable_blocks = array_map( 'intval', $stored_reusable_blocks );
				update_post_meta( $post_id, '_generateblocks_reusable_blocks', $stored_reusable_blocks );
			} else {
				delete_post_meta( $post_id, '_generateblocks_reusable_blocks' );
			}
		}

		// Make a new CSS file for this post on next load.
		$option = get_option( 'generateblocks_dynamic_css_posts', array() );
		unset( $option[ $post_id ] );

		update_option( 'generateblocks_dynamic_css_posts', $option );
	}

	/**
	 * Force regeneration of CSS files attached to pages with this re-usable block.
	 *
	 * @param int    $post_id The current post ID.
	 * @param object $post The current post.
	 */
	public function wp_block_update( $post_id, $post ) {
		$is_autosave = wp_is_post_autosave( $post_id );
		$is_revision = wp_is_post_revision( $post_id );

		if ( $is_autosave || $is_revision || ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		if ( isset( $post->post_content ) ) {
			if ( strpos( $post->post_content, 'wp:generateblocks' ) !== false ) {
				global $wpdb;

				$option = get_option( 'generateblocks_dynamic_css_posts', array() );

				$posts = $wpdb->get_col( "SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_generateblocks_reusable_blocks'" );

				foreach ( (array) $posts as $id ) {
					unset( $option[ $id ] );
				}

				update_option( 'generateblocks_dynamic_css_posts', $option );
			}
		}
	}

	/**
	 * Do we need to update the CSS file?
	 */
	public function needs_update() {
		$option = get_option( 'generateblocks_dynamic_css_posts', array() );
		$page_id = $this->page_id();

		// If the CSS file does not exist then we definitely need to regenerate the CSS.
		if ( ! file_exists( $this->file( 'path' ) ) ) {
			return true;
		}

		return ( ! isset( $option[ $page_id ] ) || ! $option[ $page_id ] ) ? true : false;
	}

	/**
	 * Update the 'generateblocks_dynamic_css_time' option.
	 */
	public function update_saved_time() {
		update_option( 'generateblocks_dynamic_css_time', time() );
	}

	/**
	 * Force CSS files to regenerate after a widget has been saved.
	 *
	 * @param array $instance The current widget instance's settings.
	 */
	public function force_file_regen_on_widget_save( $instance ) {
		if ( function_exists( 'wp_use_widgets_block_editor' ) && wp_use_widgets_block_editor() ) {
			update_option( 'generateblocks_dynamic_css_posts', array() );
		}

		return $instance;
	}

	/**
	 * Force CSS files to regenerate after the Customizer has been saved.
	 * This is necessary because force_file_regen_on_widget_save() doesn't fire in the Customizer for some reason.
	 *
	 * @todo Make this only happen when the widgets have been changed.
	 */
	public function force_file_regen_on_customizer_save() {
		if ( function_exists( 'wp_use_widgets_block_editor' ) && wp_use_widgets_block_editor() ) {
			update_option( 'generateblocks_dynamic_css_posts', array() );
		}
	}
}

GenerateBlocks_Enqueue_CSS::get_instance();

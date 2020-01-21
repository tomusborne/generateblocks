<?php
/**
 * Handles the CSS Output.
 *
 * @package     GenerateBlocks
 * @since       0.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Module object.
 */
class GenerateBlocks_Enqueue_CSS {

	public $css = '';

	/**
	 * Constructor
	 *
	 * @access public
	 */
	public function __construct( $css ) {
		$this->css = $css;

		if ( empty( $this->css ) ) {
			return;
		}

		add_action( 'wp', array( $this, 'print_styles_action' ), 20 );

		if ( ! apply_filters( 'generateblocks_output_inline_styles', false ) ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		} else {
			add_action( 'wp_head', array( $this, 'print_styles_inline' ) );
		}
	}

	/**
	 * Print styles inline.
	 *
	 * @access public
	 * @since 3.0.36
	 * @return void
	 */
	public function print_styles_inline() {
		printf(
			'<style id="generateblocks-css">%s</style>',
			$this->css
		);
	}

	/**
	 * Enqueue the styles.
	 *
	 * @access public
	 * @since 0.1
	 * @return void
	 */
	public function enqueue_styles() {

		$args = array(
			'action' => apply_filters( 'generateblocks_styles_action_handle', 'generateblocks-css' ),
		);

		// Set updated time.
		$time = strtotime( get_the_modified_date( 'F j, Y g:i a' ) );

		// Enqueue the dynamic stylesheet.
		wp_enqueue_style(
			'generateblocks',
			add_query_arg( $args, esc_url( get_permalink() ) ),
			array(),
			$time
		);
	}

	/**
	 * Prints the styles as an enqueued file.
	 *
	 * @access public
	 * @since 0.1
	 * @return void
	 */
	public function print_styles_action() {
		/**
		 * Note to code reviewers:
		 * There is no need for a nonce check here, we're only checking if this is a valid request or not.
		 */
		if ( empty( $_GET['action'] ) || apply_filters( 'generateblocks_styles_action_handle', 'generateblocks-css' ) !== $_GET['action'] ) { // phpcs:ignore WordPress.Security.NonceVerification
			return;
		}

		// This is a stylesheet.
		header( 'Content-type: text/css' );
		echo $this->css;
		exit;
	}
}

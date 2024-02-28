<?php
/**
 * This file handles the dynamic parts of our blocks.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Render the dynamic aspects of our blocks.
 *
 * @since 1.2.0
 */
class GenerateBlocks_Render_Block {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 * @since 1.2.0
	 */
	private static $instance;

	/**
	 * Initiator.
	 *
	 * @since 1.2.0
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
		add_action( 'init', array( $this, 'register_blocks' ) );

		if ( version_compare( $GLOBALS['wp_version'], '5.9', '>' ) ) {
			add_filter( 'render_block', array( $this, 'filter_rendered_blocks' ), 10, 3 );
		}
	}

	/**
	 * Register our dynamic blocks.
	 *
	 * @since 1.2.0
	 */
	public function register_blocks() {
		$container_args = [
			'title' => esc_html__( 'Container', 'generateblocks' ),
			'render_callback' => [ 'GenerateBlocks_Block_Container', 'render_block' ],
		];

		if ( version_compare( $GLOBALS['wp_version'], '6.1.0', '<' ) ) {
			$container_args['editor_script'] = 'generateblocks';
			$container_args['editor_style'] = 'generateblocks';
		} else {
			$container_args['editor_script_handles'] = [ 'generateblocks' ];
			$container_args['editor_style_handles'] = [ 'generateblocks' ];
		}

		register_block_type(
			'generateblocks/container',
			$container_args
		);

		register_block_type(
			'generateblocks/grid',
			array(
				'title' => esc_html__( 'Grid', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Grid', 'render_block' ],
				'uses_context' => array(
					'generateblocks/query',
					'generateblocks/queryId',
					'generateblocks/inheritQuery',
				),
			)
		);

		register_block_type(
			'generateblocks/query-loop',
			array(
				'title' => esc_html__( 'Query loop', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Grid', 'render_block' ],
				'provides_context' => array(
					'generateblocks/query' => 'query',
					'generateblocks/queryId' => 'uniqueId',
					'generateblocks/inheritQuery' => 'inheritQuery',
				),
			)
		);

		register_block_type(
			'generateblocks/button-container',
			array(
				'title' => esc_html__( 'Buttons', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Button_Container', 'render_block' ],
			)
		);

		register_block_type(
			'generateblocks/headline',
			array(
				'title' => esc_html__( 'Headline', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Headline', 'render_block' ],
			)
		);

		register_block_type(
			'generateblocks/button',
			array(
				'title' => esc_html__( 'Button', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Button', 'render_block' ],
				'uses_context' => array(
					'generateblocks/query',
					'generateblocks/queryId',
					'generateblocks/inheritQuery',
				),
			)
		);

		register_block_type(
			GENERATEBLOCKS_DIR . 'dist/blocks/image',
			array(
				'title' => esc_html__( 'Image', 'generateblocks' ),
				'render_callback' => [ 'GenerateBlocks_Block_Image', 'render_block' ],
				'uses_context' => array(
					'generateblocks/query',
					'generateblocks/queryId',
					'postType',
					'postId',
				),
			)
		);
	}

	/**
	 * Filter existing rendered blocks.
	 *
	 * @since 1.5.0
	 * @param string   $block_content The block content.
	 * @param array    $block The block data.
	 * @param WP_Block $instance Block instance.
	 */
	public function filter_rendered_blocks( $block_content, $block, $instance ) {
		$attributes = isset( $block['attrs'] ) ? $block['attrs'] : null;

		// Don't output if no dynamic link exists.
		if ( isset( $attributes ) && ! empty( $attributes['dynamicLinkType'] ) && ! empty( $attributes['dynamicLinkRemoveIfEmpty'] ) ) {
			$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $instance );

			if ( ! $dynamic_link ) {
				return '';
			}
		}

		return $block_content;
	}
}

GenerateBlocks_Render_Block::get_instance();

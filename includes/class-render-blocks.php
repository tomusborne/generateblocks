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
			add_filter( 'render_block', array( $this, 'late_filter_rendered_blocks' ), 20, 3 );
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
			'generateblocks/image',
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

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/text',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Text', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/element',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Element', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/media',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Media', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/shape',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Shape', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/query',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Query', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/looper',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Looper', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/query-no-results',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Query_No_Results', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/query-page-numbers',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Query_Page_Numbers', 'render_block' ],
			]
		);

		register_block_type_from_metadata(
			GENERATEBLOCKS_DIR . '/dist/blocks/loop-item',
			[
				'render_callback' => [ 'GenerateBlocks_Block_Loop_Item', 'render_block' ],
			]
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

	/**
	 * Filter existing rendered blocks. Fires later than `filter_rendered_blocks`.
	 *
	 * @since 2.0.0
	 * @param string   $block_content The block content.
	 * @param array    $block The block data.
	 * @param WP_Block $instance Block instance.
	 */
	public function late_filter_rendered_blocks( $block_content, $block, $instance ) {
		$block_name = $block['blockName'] ?? '';
		$attributes = $block['attrs'] ?? [];

		if ( 'generateblocks/media' === $block_name ) {
			$attachment_id = $attributes['mediaId'] ?? 0;

			if ( ! $attachment_id ) {
				$p = new WP_HTML_Tag_Processor( $block_content );

				if ( $p->next_tag(
					[
						'tag_name'   => 'img',
					]
				) ) {
					$attachment_id = (int) $p->get_attribute( 'data-media-id' ) ?? 0;
				}
			}

			if ( $attachment_id > 0 && 'img' === $attributes['tagName'] ) {
				$context = current_filter();

				if ( ! generateblocks_str_contains( $block_content, ' width=' ) && ! generateblocks_str_contains( $block_content, ' height=' ) ) {
					$block_content = wp_img_tag_add_width_and_height_attr( $block_content, $context, $attachment_id );
				}

				// Add 'srcset' and 'sizes' attributes if applicable.
				if ( ! generateblocks_str_contains( $block_content, ' srcset=' ) ) {
					$block_content = wp_img_tag_add_srcset_and_sizes_attr( $block_content, $context, $attachment_id );
				}

				// Add loading optimization attributes if applicable.
				$block_content = wp_img_tag_add_loading_optimization_attrs( $block_content, $context );
			}
		}

		return $block_content;
	}
}

GenerateBlocks_Render_Block::get_instance();

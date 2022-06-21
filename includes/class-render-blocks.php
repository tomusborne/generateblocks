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
		register_block_type(
			'generateblocks/container',
			array(
				'title' => esc_html__( 'Container', 'generateblocks' ),
				'render_callback' => array( $this, 'do_container_block' ),
				'editor_script' => 'generateblocks',
				'editor_style' => 'generateblocks',
			)
		);

		register_block_type(
			'generateblocks/grid',
			array(
				'title' => esc_html__( 'Grid', 'generateblocks' ),
				'render_callback' => array( $this, 'do_grid_block' ),
				'uses_context' => array(
					'generateblocks/query',
					'generateblocks/queryId',
				),
			)
		);

		register_block_type(
			'generateblocks/query-loop',
			array(
				'title' => esc_html__( 'Query loop', 'generateblocks' ),
				'render_callback' => array( $this, 'do_grid_block' ),
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
				'render_callback' => array( $this, 'do_button_container' ),
			)
		);

		register_block_type(
			'generateblocks/headline',
			array(
				'title' => esc_html__( 'Headline', 'generateblocks' ),
				'render_callback' => array( $this, 'do_headline_block' ),
			)
		);

		register_block_type(
			'generateblocks/button',
			array(
				'title' => esc_html__( 'Button', 'generateblocks' ),
				'render_callback' => array( $this, 'do_button_block' ),
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
				'render_callback' => array( $this, 'do_image_block' ),
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
	 * Output the dynamic aspects of our Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 * @param object $block The block data.
	 */
	public function do_container_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		$output = '';

		if ( $settings['isGrid'] ) {
			$gridItemClassNames = array(
				'gb-grid-column',
				'gb-grid-column-' . $settings['uniqueId'],
			);

			$output .= sprintf(
				'<div %s>',
				generateblocks_attr(
					'grid-item',
					array(
						'class' => implode( ' ', $gridItemClassNames ),
					),
					$settings,
					$block
				)
			);
		}

		$classNames = array(
			'gb-container',
			'gb-container-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( ! $settings['isGrid'] && ! empty( $settings['align'] ) ) {
			$classNames[] = 'align' . $settings['align'];
		}

		// Pass the dynamic url to our URL attribute.
		if ( isset( $settings['url'] ) ) {
			if ( $settings['useDynamicData'] && '' !== $settings['dynamicLinkType'] ) {
				$attributes['url'] = GenerateBlocks_Dynamic_Content::get_dynamic_url( $settings, $block );
			}
		}

		$tagName = apply_filters(
			'generateblocks_container_tagname',
			$settings['tagName'],
			$attributes,
			$block
		);

		$allowedTagNames = apply_filters(
			'generateblocks_container_allowed_tagnames',
			array(
				'div',
				'section',
				'header',
				'footer',
				'aside',
				'a',
			),
			$attributes,
			$block
		);

		if ( ! in_array( $tagName, $allowedTagNames ) ) {
			$tagName = 'div';
		}

		$output .= sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$output = apply_filters(
			'generateblocks_after_container_open',
			$output,
			$attributes,
			$block
		);

		$output .= '<div class="gb-inside-container">';

		$output = apply_filters(
			'generateblocks_inside_container',
			$output,
			$attributes,
			$block
		);

		$output .= $content;
		$output .= '</div>';

		$output = apply_filters(
			'generateblocks_before_container_close',
			$output,
			$attributes,
			$block
		);

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		if ( $settings['isGrid'] ) {
			$output .= '</div>';
		}

		return $output;
	}

	/**
	 * Output the dynamic aspects of our Grid block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 * @param object $block The block data.
	 */
	public function do_grid_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['gridContainer']
		);

		$classNames = array(
			'gb-grid-wrapper',
			'gb-grid-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'grid-wrapper',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		if ( empty( $attributes['isQueryLoop'] ) ) {
			$output .= $content;
		} else {
			$output .= $this->do_post_template( $attributes, $content, $block );
		}

		$output .= '</div>';

		return $output;
	}

	/**
	 * Output the dynamic aspects of our Button Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 * @param object $block The block data.
	 */
	public function do_button_container( $attributes, $content, $block ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}

		if ( isset( $block->parsed_block['innerBlocks'] ) ) {
			$button_count = apply_filters(
				'generateblocks_button_count',
				count( (array) $block->parsed_block['innerBlocks'] ),
				$attributes,
				$block
			);

			if ( 0 === $button_count ) {
				return;
			}
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['buttonContainer']
		);

		$classNames = array(
			'gb-button-wrapper',
			'gb-button-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'button-container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}

	/**
	 * Output the query.
	 *
	 * @param array    $attributes The block attributes.
	 * @param string   $content The inner blocks.
	 * @param WP_Block $block Block instance.
	 */
	public function do_post_template( $attributes, $content, $block ) {
		$page_key = isset( $block->context['generateblocks/queryId'] ) ? 'query-' . $block->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$query_args = GenerateBlocks_Query_Loop::get_query_args( $block, $page );

		// Override the custom query with the global query if needed.
		$use_global_query = ( isset( $block->context['generateblocks/inheritQuery'] ) && $block->context['generateblocks/inheritQuery'] );

		if ( $use_global_query ) {
			global $wp_query;

			if ( $wp_query && isset( $wp_query->query_vars ) && is_array( $wp_query->query_vars ) ) {
				// Unset `offset` because if is set, $wp_query overrides/ignores the paged parameter and breaks pagination.
				unset( $query_args['offset'] );
				$query_args = wp_parse_args( $wp_query->query_vars, $query_args );

				if ( empty( $query_args['post_type'] ) && is_singular() ) {
					$query_args['post_type'] = get_post_type( get_the_ID() );
				}
			}
		}

		$query_args = apply_filters(
			'generateblocks_query_loop_args',
			$query_args,
			$attributes,
			$block
		);

		$the_query = new WP_Query( $query_args );

		$content = '';
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();

				$block_content = (
				new WP_Block(
					$block->parsed_block,
					array(
						'postType' => get_post_type(),
						'postId'   => get_the_ID(),
					)
				)
				)->render( array( 'dynamic' => false ) );

				$content .= $block_content;
			}
		}

		$the_query->reset_postdata();

		return $content;
	}

	/**
	 * Wrapper function for our dynamic headlines.
	 *
	 * @since 1.5.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function do_headline_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['useDynamicData'] ) || ! $attributes['useDynamicData'] ) {
			return $content;
		}

		$allow_empty_content = false;

		if ( empty( $attributes['dynamicContentType'] ) ) {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_static_content( $content );

			if ( ! empty( $attributes['hasIcon'] ) && ! empty( $attributes['removeText'] ) ) {
				// Allow icon-only items to continue.
				$allow_empty_content = true;
			}
		} else {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_content( $attributes, $block );
		}

		if ( ! $dynamic_content && '0' !== $dynamic_content && ! $allow_empty_content ) {
			return '';
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['headline']
		);

		$classNames = array(
			'gb-headline',
			'gb-headline-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( empty( $settings['icon'] ) ) {
			$classNames[] = 'gb-headline-text';
		}

		$tagName = apply_filters(
			'generateblocks_dynamic_headline_tagname',
			$settings['element'],
			$attributes,
			$block
		);

		$allowedTagNames = apply_filters(
			'generateblocks_dynamic_headline_allowed_tagnames',
			array(
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'div',
				'p',
				'figcaption',
			),
			$attributes,
			$block
		);

		if ( ! in_array( $tagName, $allowedTagNames ) ) {
			$tagName = 'div';
		}

		$output = sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'dynamic-headline',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$icon_html = '';

		// Extract our icon from the static HTML.
		if ( $settings['hasIcon'] ) {
			$icon_html = GenerateBlocks_Dynamic_Content::get_icon_html( $content );

			if ( $icon_html ) {
				$output .= $icon_html;
				$output .= '<span class="gb-headline-text">';
			}
		}

		$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

		if ( $dynamic_link ) {
			$dynamic_content = sprintf(
				'<a href="%s">%s</a>',
				$dynamic_link,
				$dynamic_content
			);
		}

		$output .= $dynamic_content;

		if ( $icon_html ) {
			$output .= '</span>';
		}

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		return $output;
	}

	/**
	 * Wrapper function for our dynamic buttons.
	 *
	 * @since 1.5.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function do_button_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['useDynamicData'] ) || ! $attributes['useDynamicData'] ) {
			return $content;
		}

		$allow_empty_content = false;

		// Add an attribute showing we're working with the Button block.
		$attributes['isButton'] = true;

		if ( empty( $attributes['dynamicContentType'] ) ) {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_static_content( $content );

			if ( ! empty( $attributes['hasIcon'] ) && ! empty( $attributes['removeText'] ) ) {
				// Allow icon-only items to continue.
				$allow_empty_content = true;
			}
		} else {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_content( $attributes, $block );
		}

		if ( ! $dynamic_content && '0' !== $dynamic_content && ! $allow_empty_content ) {
			return '';
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		$classNames = array(
			'gb-button',
			'gb-button-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( empty( $settings['icon'] ) ) {
			$classNames[] = 'gb-button-text';
		}

		$relAttributes = array();

		if ( ! empty( $settings['relNoFollow'] ) ) {
			$relAttributes[] = 'nofollow';
		}

		if ( ! empty( $settings['target'] ) ) {
			$relAttributes[] = 'noopener';
			$relAttributes[] = 'noreferrer';
		}

		if ( ! empty( $settings['relSponsored'] ) ) {
			$relAttributes[] = 'sponsored';
		}

		$icon_html = '';

		// Extract our icon from the static HTML.
		if ( $settings['hasIcon'] ) {
			$icon_html = GenerateBlocks_Dynamic_Content::get_icon_html( $content );
		}

		$output = '';

		foreach ( (array) $dynamic_content as $content ) {
			$tagName = 'span';

			$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

			if ( isset( $content['attributes']['href'] ) || $dynamic_link ) {
				$tagName = 'a';
			}

			$button_attributes = array(
				'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
				'class' => implode( ' ', $classNames ),
				'href' => 'a' === $tagName ? $dynamic_link : null,
				'rel' => ! empty( $relAttributes ) ? implode( ' ', $relAttributes ) : null,
				'target' => ! empty( $settings['target'] ) ? '_blank' : null,
			);

			if ( isset( $content['attributes'] ) ) {
				foreach ( $content['attributes'] as $attribute => $value ) {
					if ( 'class' === $attribute ) {
						$button_attributes[ $attribute ] .= ' ' . $value;
					} else {
						$button_attributes[ $attribute ] = $value;
					}
				}
			}

			$output .= sprintf(
				'<%1$s %2$s>',
				$tagName,
				generateblocks_attr(
					'dynamic-button',
					$button_attributes,
					$settings,
					$block
				)
			);

			if ( $icon_html ) {
				if ( 'left' === $settings['iconLocation'] ) {
					$output .= $icon_html;
				}

				$output .= '<span class="gb-button-text">';
			}

			if ( isset( $content['content'] ) ) {
				$output .= $content['content'];
			} else {
				$output .= $content;
			}

			if ( $icon_html ) {
				$output .= '</span>';

				if ( 'right' === $settings['iconLocation'] ) {
					$output .= $icon_html;
				}
			}

			$output .= sprintf(
				'</%s>',
				$tagName
			);
		}

		return $output;
	}

	/**
	 * Wrapper function for our image block.
	 *
	 * @since 1.5.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function do_image_block( $attributes, $content, $block ) {
		if ( empty( $attributes['useDynamicData'] ) ) {
			return generateblocks_filter_images( $content, $attributes );
		}

		$image = empty( $attributes['dynamicContentType'] )
			? generateblocks_filter_images( GenerateBlocks_Dynamic_Content::get_static_content( $content ), $attributes )
			: GenerateBlocks_Dynamic_Content::get_dynamic_image( $attributes, $block );

		if ( ! $image ) {
			return '';
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['image']
		);

		$output = sprintf(
			'<figure %s>',
			generateblocks_attr(
				'image-figure',
				array(
					'class' => implode(
						' ',
						array(
							'gb-block-image',
							'gb-block-image-' . $settings['uniqueId'],
						)
					),
				),
				$settings,
				$block
			)
		);

		$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

		if ( $dynamic_link ) {
			$relAttributes = array();

			if ( ! empty( $settings['relNoFollow'] ) ) {
				$relAttributes[] = 'nofollow';
			}

			if ( ! empty( $settings['openInNewWindow'] ) ) {
				$relAttributes[] = 'noopener';
				$relAttributes[] = 'noreferrer';
			}

			if ( ! empty( $settings['relSponsored'] ) ) {
				$relAttributes[] = 'sponsored';
			}

			$dynamic_link_data = array(
				'href' => $dynamic_link,
				'rel' => ! empty( $relAttributes ) ? implode( ' ', $relAttributes ) : null,
				'target' => ! empty( $settings['openInNewWindow'] ) ? '_blank' : null,
			);

			$dynamic_link_attributes = '';

			foreach ( $dynamic_link_data as $attribute => $value ) {
				$dynamic_link_attributes .= sprintf(
					' %s="%s"',
					$attribute,
					$value
				);
			}

			$image = sprintf(
				'<a %s>%s</a>',
				trim( $dynamic_link_attributes ),
				$image
			);
		}

		$output .= $image;

		if ( isset( $block->parsed_block['innerBlocks'][0]['attrs'] ) ) {
			$image_id = GenerateBlocks_Dynamic_Content::get_dynamic_image_id( $attributes );
			$block->parsed_block['innerBlocks'][0]['attrs']['dynamicImage'] = $image_id;

			$caption = (
				new WP_Block(
					$block->parsed_block['innerBlocks'][0]
				)
			)->render( array( 'dynamic' => true ) );

			if ( $caption ) {
				$output .= $caption;
			}
		}

		$output .= '</figure>';

		return $output;
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

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
			)
		);

		register_block_type(
			'generateblocks/query-loop',
			array(
				'title' => esc_html__( 'Query loop', 'generateblocks' ),
				'render_callback' => array( $this, 'do_grid_block' ),
				'provides_context' => array(
					'generateblocks/query' => 'query',
					'generateblocks/gridId' => 'uniqueId',
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
					'generateblocks/gridId',
				),
			)
		);

		register_block_type(
			GENERATEBLOCKS_DIR . 'src/blocks/post-template',
			array(
				'title' => esc_html__( 'Post Template', 'generateblocks' ),
				'render_callback' => array( $this, 'do_post_template' ),
				'uses_context' => array(
					'generateblocks/query',
					'generateblocks/gridId',
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
	 */
	public function do_container_block( $attributes, $content ) {
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
					$settings
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

		$tagName = apply_filters( 'generateblocks_container_tagname', $settings['tagName'], $attributes );

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
			$attributes
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
				$settings
			)
		);

		$output = apply_filters( 'generateblocks_after_container_open', $output, $attributes );
		$output .= '<div class="gb-inside-container">';
		$output = apply_filters( 'generateblocks_inside_container', $output, $attributes );
		$output .= $content;
		$output .= '</div>';
		$output = apply_filters( 'generateblocks_before_container_close', $output, $attributes );

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
				$settings
			)
		);

		$output .= $content;

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
				$settings
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
		$page_key = isset( $block->context['generateblocks/gridId'] ) ? 'query-' . $block->context['generateblocks/gridId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$the_query = new WP_Query( GenerateBlocks_Query_Loop::get_query_args( $block, $page ) );

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
		if ( ! isset( $attributes['isDynamicContent'] ) || ! $attributes['isDynamicContent'] ) {
			return $content;
		}

		$allow_empty_content = false;

		if ( empty( $attributes['contentType'] ) ) {
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

		$tagName = apply_filters( 'generateblocks_dynamic_headline_tagname', $settings['element'], $attributes );

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
			),
			$attributes
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
				$settings
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
		} elseif ( ! empty( $attributes['dynamicLinkType'] ) ) {
			// If we've set a dynamic link and don't have one, don't output anything.
			return '';
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
		if ( ! isset( $attributes['isDynamicContent'] ) || ! $attributes['isDynamicContent'] ) {
			return $content;
		}

		$allow_empty_content = false;

		// Add an attribute showing we're working with the Button block.
		$attributes['isButton'] = true;

		if ( empty( $attributes['contentType'] ) ) {
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
			} elseif ( ! empty( $attributes['dynamicLinkType'] ) ) {
				// If we've set a dynamic link and don't have one, don't output anything.
				return '';
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
					$settings
				)
			);

			if ( $icon_html ) {
				$output .= $icon_html;
				$output .= '<span class="gb-button-text">';
			}

			if ( isset( $content['content'] ) ) {
				$output .= $content['content'];
			} else {
				$output .= $content;
			}

			if ( $icon_html ) {
				$output .= '</span>';
			}

			$output .= sprintf(
				'</%s>',
				$tagName
			);
		}

		return $output;
	}
}

GenerateBlocks_Render_Block::get_instance();

<?php
/**
 * Handles the Element block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Element block.
 */
class GenerateBlocks_Block_Looper extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Store our block name.
	 *
	 * @var string $block_name The block name.
	 */
	public static $block_name = 'generateblocks/looper';

	/**
	 * Sanitize a loop item's data for security.
	 *
	 * @param array|object $loop_item The loop item to sanitize.
	 * @return array|object The sanitized loop item.
	 */
	public static function sanitize_loop_item( $loop_item ) {

		$disallowed_keys = GenerateBlocks_Meta_Handler::DISALLOWED_KEYS ?? [];

		foreach ( $disallowed_keys as $key ) {

			if ( is_object( $loop_item ) ) {
				if ( isset( $loop_item->$key ) ) {
					unset( $loop_item->$key );
				}
			} elseif ( is_array( $loop_item ) ) {
				if ( isset( $loop_item[ $key ] ) ) {
					unset( $loop_item[ $key ] );
				}
			}
		}

		return $loop_item;
	}

	/**
	 * Render the repeater items for the Looper block.
	 *
	 * @param  array    $attributes Block attributes.
	 * @param  WP_Block $block The block instance.
	 * @return string  The rendered content.
	 */
	public static function render_loop_items( $attributes, $block ) {
		$query_data = $block->context['generateblocks/queryData']['data'] ?? null;
		$query_type = $block->context['generateblocks/queryData']['type'] ?? null;
		$output     = '';

		if ( GenerateBlocks_Block_Query::TYPE_WP_QUERY === $query_type ) {
			$output = self::render_wp_query( $query_data, $attributes, $block );
		}

		/**
		 * Allow users to filter the looper rendering of loop items.
		 *
		 * @param string       $output The block output.
		 * @param string       $query_type The query type.
		 * @param array|object $query_data The query data.
		 * @param array        $attributes Block attributes.
		 * @param WP_Block     $block The block instance.
		 */
		$output = apply_filters( 'generateblocks_looper_render_loop_items', $output, $query_type, $query_data, $block, $attributes );

		return $output;
	}

	/**
	 * Render the repeater items for the Looper block.
	 *
	 * @param WP_Query $query The WP_Query instance.
	 * @param array    $attributes Block attributes.
	 * @param WP_Block $block The block instance.
	 * @return string  The rendered content.
	 */
	public static function render_wp_query( $query, $attributes, $block ) {
		$query_id     = $block->context['generateblocks/queryData']['id'] ?? null;
		$page_key     = $query_id ? 'query-' . $query_id . '-page' : 'query-page';
		$per_page     = $query->query_vars['posts_per_page'] ?? get_option( 'posts_per_page', 10 );
		$page         = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$page_index   = $page - 1; // Zero based index for pages.
		$offset       = $page_index * $per_page;
		$content      = '';
		$inner_blocks = $block->parsed_block['innerBlocks'] ?? [];

		if ( empty( $inner_blocks ) ) {
			return '';
		}

		// Fallback to support preview in Elements.
		if ( ! $query ) {
			return (
				new WP_Block(
					$inner_blocks[0],
					array(
						'postType'                 => 'post',
						'postId'                   => 0,
						'generateblocks/queryType' => GenerateBlocks_Block_Query::TYPE_WP_QUERY,
						'generateblocks/loopIndex' => 1,
						'generateblocks/loopItem'  => [ 'ID' => 0 ],
					)
				)
			)->render( array( 'dynamic' => false ) );
		}

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				global $post;
				// Get the current index of the Loop.
				foreach ( $inner_blocks as $inner_block ) {
					$content .= (
						new WP_Block(
							$inner_block,
							array(
								'postType'                 => get_post_type(),
								'postId'                   => get_the_ID(),
								'generateblocks/queryType' => GenerateBlocks_Block_Query::TYPE_WP_QUERY,
								'generateblocks/loopIndex' => $offset + $query->current_post + 1,
								'generateblocks/loopItem'  => self::sanitize_loop_item( $post ),
							)
						)
					)->render();
				}
			}

			wp_reset_postdata();
		}

		return $content;
	}

	/**
	 * Render the Query block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$loop_items = self::render_loop_items( $attributes, $block );

		if ( ! $loop_items ) {
			return '';
		}

		$html_attributes = generateblocks_get_processed_html_attributes( $block_content );

		// If our processing returned nothing, let's try to build our attributes from the block attributes.
		if ( empty( $html_attributes ) ) {
			$html_attributes = generateblocks_get_backup_html_attributes( 'gb-looper', $attributes );
		}

		$tag_name = $attributes['tagName'] ?? 'div';

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$output .= sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			generateblocks_attr(
				'looper',
				$html_attributes,
				$attributes,
				$block
			),
			$loop_items
		);

		return $output;
	}
}

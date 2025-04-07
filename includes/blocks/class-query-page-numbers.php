<?php
/**
 * Handles the No Results block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The No Results block.
 */
class GenerateBlocks_Block_Query_Page_Numbers extends GenerateBlocks_Block {
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
	public static $block_name = 'generateblocks/query-page-numbers';

	/**
	 * Render the Shape block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param object $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$query_id      = $block->context['generateblocks/queryData']['id'] ?? null;
		$page_key      = $query_id ? 'query-' . $query_id . '-page' : 'query-page';
		$page          = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$args          = $block->context['generateblocks/queryData']['args'] ?? [];
		$per_page      = $args['posts_per_page'] ?? apply_filters( 'generateblocks_query_per_page_default', 10, $args );
		$content       = '';
		$mid_size      = isset( $block->attributes['midSize'] ) ? (int) $block->attributes['midSize'] : null;
		$inherit_query = $block->context['generateblocks/queryData']['inherit'] ?? false;

		if ( $inherit_query ) {
			$paginate_args = [ 'prev_next' => false ];

			if ( null !== $mid_size ) {
				$paginate_args['mid_size'] = $mid_size;
			}

			$content = paginate_links( $paginate_args );
		} else {
			$query_data = $block->context['generateblocks/queryData']['data'] ?? null;
			$max_pages  = $block->context['generateblocks/queryData']['maxPages'] ?? 0;

			if ( ! $query_data ) {
				return '';
			}

			$paginate_args = array(
				'base'      => '%_%',
				'format'    => "?$page_key=%#%",
				'current'   => max( 1, $page ),
				'total'     => $max_pages,
				'prev_next' => false,
			);

			if ( null !== $mid_size ) {
				$paginate_args['mid_size'] = $mid_size;
			}

			if ( 1 !== $page ) {
				/**
				 * `paginate_links` doesn't use the provided `format` when the page is `1`.
				 * This is great for the main query as it removes the extra query params
				 * making the URL shorter, but in the case of multiple custom queries is
				 * problematic. It results in returning an empty link which ends up with
				 * a link to the current page.
				 *
				 * A way to address this is to add a `fake` query arg with no value that
				 * is the same for all custom queries. This way the link is not empty and
				 * preserves all the other existent query args.
				 *
				 * @see https://developer.wordpress.org/reference/functions/paginate_links/
				 *
				 * The proper fix of this should be in core. Track Ticket:
				 * @see https://core.trac.wordpress.org/ticket/53868
				 *
				 * TODO: After two WP versions (starting from the WP version the core patch landed),
				 * we should remove this and call `paginate_links` with the proper new arg.
				 */
				$paginate_args['add_args'] = array( 'cst' => '' );
			}

			// We still need to preserve `paged` query param if exists, as is used
			// for Queries that inherit from global context.
			$paged = empty( $_GET['paged'] ) ? null : (int) $_GET['paged']; // phpcs:ignore -- No data processing happening.

			if ( $paged ) {
				$paginate_args['add_args'] = array( 'paged' => $paged );
			}

			$content = paginate_links( $paginate_args );
		}

		if ( empty( $content ) ) {
			return '';
		}

		$pagination_type    = $block->context['generateblocks/queryData']['paginationType'] ?? '';
		$instant_pagination = GenerateBlocks_Block_Query::TYPE_INSTANT_PAGINATION === $pagination_type;

		if ( $instant_pagination && class_exists( 'WP_HTML_Tag_Processor' ) ) {
			$p = new WP_HTML_Tag_Processor( $content );

			while ( $p->next_tag(
				array( 'class_name' => 'page-numbers' )
			) ) {
				if ( 'A' === $p->get_tag() ) {
					$p->set_attribute( 'data-gb-router-target', 'query-' . $query_id );
					$p->set_attribute( 'data-gb-prefetch', true );
				}
			}
			$content = $p->get_updated_html();
		}

		$html_attributes = generateblocks_get_processed_html_attributes( $block_content );

		// If our processing returned nothing, let's try to build our attributes from the block attributes.
		if ( empty( $html_attributes ) ) {
			$html_attributes = generateblocks_get_backup_html_attributes( 'gb-query-page-numbers', $attributes );
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
				'query-page-numbers',
				$html_attributes,
				$attributes,
				$block
			),
			$content
		);

		return $output;
	}
}

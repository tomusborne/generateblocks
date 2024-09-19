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
	 * Render the Shape block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$query_id            = $block->context['generateblocks/queryId'] ?? null;
		$page_key            = $query_id ? 'query-' . $query_id . '-page' : 'query-page';
		$force_reload        = isset( $block->context['generateblocks/forceReload'] ) && $block->context['generateblocks/forceReload'];
		$page                = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$max_page            = isset( $block->context['generateblocks/query']['pages'] ) ? (int) $block->context['generateblocks/query']['pages'] : 0;
		$content            = '';

		global $wp_query;
		$mid_size = isset( $block->attributes['midSize'] ) ? (int) $block->attributes['midSize'] : null;

		if ( isset( $block->context['generateblocks/inheritQuery'] ) && $block->context['generateblocks/inheritQuery'] ) {
			// Take into account if we have set a bigger `max page`
			// than what the query has.
			$total         = ! $max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page;
			$paginate_args = array(
				'prev_next' => false,
				'total'     => $total,
			);

			if ( null !== $mid_size ) {
				$paginate_args['mid_size'] = $mid_size;
			}

			$content = paginate_links( $paginate_args );
		} else {
			$block_query = $block->context['generateblocks/queryData'] ?? null;

			if ( ! $block_query ) {
				return '';
			}

			// `paginate_links` works with the global $wp_query, so we have to
			// temporarily switch it with our custom query.
			$prev_wp_query = $wp_query;
			$wp_query      = $block_query; // phpcs:ignore -- This is the way to do it.
			$total         = ! $max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page;
			$paginate_args = array(
				'base'      => '%_%',
				'format'    => "?$page_key=%#%",
				'current'   => max( 1, $page ),
				'total'     => $total,
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
			wp_reset_postdata(); // Restore original Post Data.
			$wp_query = $prev_wp_query; // phpcs:ignore -- This is the way to do it.
		}

		if ( empty( $content ) ) {
			return '';
		}

		if ( ! $force_reload && class_exists( 'WP_HTML_Tag_Processor' ) ) {
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

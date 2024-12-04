import { addFilter } from '@wordpress/hooks';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { getInnerBlocks } from '@utils';
import { PAGINATION_TEMPLATE, NO_RESULTS_TEMPLATE } from './templates';

function noResultsIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d="M8.994,7.858C12.857,7.858 15.994,10.995 15.994,14.858C15.994,18.722 12.857,21.858 8.994,21.858C5.131,21.858 1.994,18.722 1.994,14.858C1.994,10.995 5.131,7.858 8.994,7.858ZM13.272,11.817L5.952,19.137C6.811,19.748 7.861,20.108 8.994,20.108C11.892,20.108 14.244,17.756 14.244,14.858C14.244,13.725 13.885,12.675 13.272,11.817ZM12.035,10.579C11.177,9.968 10.127,9.608 8.994,9.608C6.096,9.608 3.744,11.961 3.744,14.858C3.744,15.992 4.103,17.042 4.716,17.899L12.035,10.579Z" />
			<path d="M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z" style={ { fillOpacity: 0.5 } } />
			<path d="M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z" />
		</svg>
	);
}

function paginationIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d="M14.456,14.429C14.652,14.429 14.842,14.463 15.027,14.53C15.212,14.597 15.376,14.698 15.519,14.832C15.662,14.967 15.777,15.135 15.864,15.337C15.95,15.538 15.994,15.771 15.994,16.034C15.994,16.354 15.928,16.634 15.796,16.875C15.665,17.116 15.491,17.319 15.275,17.484C15.06,17.65 14.812,17.773 14.531,17.854C14.251,17.935 13.963,17.976 13.666,17.976C13.413,17.976 13.161,17.954 12.909,17.909C12.657,17.864 12.413,17.794 12.178,17.699L12.472,16.791C12.522,16.819 12.591,16.847 12.678,16.875C12.765,16.903 12.863,16.931 12.972,16.959C13.081,16.987 13.193,17.009 13.308,17.026C13.423,17.043 13.537,17.051 13.649,17.051C13.834,17.051 14.003,17.028 14.157,16.98C14.311,16.932 14.443,16.865 14.552,16.778C14.662,16.691 14.747,16.59 14.809,16.476C14.87,16.361 14.901,16.236 14.901,16.102C14.901,15.933 14.866,15.792 14.796,15.677C14.726,15.562 14.629,15.471 14.506,15.404C14.383,15.337 14.234,15.289 14.061,15.261C13.887,15.233 13.699,15.219 13.497,15.219L13.027,15.219L13.027,14.622L14.439,12.899L12.312,12.899L12.312,11.975L15.742,11.975L15.742,12.739L14.262,14.429L14.456,14.429Z" />
			<path d="M4.697,16.934L5.958,16.934L5.958,17.858L2.369,17.858L2.369,16.934L3.655,16.934L3.655,13.261L2.545,14.109L2.041,13.437L3.957,11.975L4.697,11.975L4.697,16.934Z" />
			<path d="M10.917,17.858L7.168,17.858L7.168,17.043C7.235,16.987 7.32,16.913 7.42,16.82C7.521,16.728 7.635,16.623 7.761,16.505C7.887,16.387 8.02,16.258 8.16,16.118C8.3,15.978 8.437,15.833 8.572,15.681C8.762,15.468 8.929,15.275 9.072,15.101C9.215,14.928 9.333,14.764 9.425,14.61C9.518,14.456 9.586,14.304 9.631,14.156C9.676,14.007 9.698,13.855 9.698,13.698C9.698,13.586 9.673,13.476 9.623,13.37C9.572,13.263 9.502,13.169 9.412,13.088C9.323,13.007 9.215,12.943 9.089,12.895C8.963,12.847 8.824,12.823 8.673,12.823C8.471,12.823 8.288,12.854 8.122,12.916C7.957,12.978 7.785,13.081 7.605,13.227L7.168,12.454C7.404,12.286 7.666,12.144 7.954,12.029C8.243,11.914 8.575,11.857 8.95,11.857C9.191,11.857 9.422,11.89 9.644,11.958C9.865,12.025 10.061,12.124 10.232,12.256C10.403,12.388 10.539,12.552 10.64,12.748C10.741,12.944 10.791,13.171 10.791,13.429C10.791,13.608 10.776,13.775 10.745,13.929C10.714,14.083 10.666,14.237 10.602,14.391C10.537,14.545 10.453,14.703 10.35,14.866C10.246,15.028 10.121,15.205 9.976,15.396C9.864,15.541 9.742,15.688 9.61,15.837C9.478,15.985 9.348,16.127 9.219,16.261C9.09,16.396 8.963,16.522 8.837,16.64C8.711,16.757 8.597,16.855 8.496,16.934L10.917,16.934L10.917,17.858Z" />
			<path d="M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z" style={ { fillOpacity: 0.5 } } />
			<path d="M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z" />
		</svg>
	);
}

function QueryToolbar( toolbars, props ) {
	const { clientId, name } = props;
	const { insertBlocks, selectBlock } = useDispatch( 'core/block-editor' );
	const getBlock = useSelect( ( select ) => select( 'core/block-editor' )?.getBlock );

	if ( 'generateblocks/query' !== name ) {
		return toolbars;
	}

	return (
		<>
			{ toolbars }
			<ToolbarButton
				icon={ paginationIcon }
				label={ __( 'Add Pagination', 'generateblocks' ) }
				onClick={ () => {
					const block = getBlock( clientId );
					let pagination = null;

					if ( block?.innerBlocks ) {
						const allInnerBlocks = getInnerBlocks( block );
						// Only show the button if the page numbers block isn't already inserted.
						pagination = allInnerBlocks.find( ( innerBlock ) =>
							innerBlock.name === 'generateblocks/query-page-numbers'
						);
					}

					// Select the pagination if it exists, otherwise insert it.
					if ( pagination ) {
						selectBlock( pagination.clientId );
					} else {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ PAGINATION_TEMPLATE ] ), undefined, clientId );
					}
				} }
				showTooltip
			/>
			<ToolbarButton
				icon={ noResultsIcon }
				label={ __( 'Add No Results', 'generateblocks' ) }
				onClick={ () => {
					const block = getBlock( clientId );

					let noResults = true;

					if ( block?.innerBlocks ) {
						const allInnerBlocks = getInnerBlocks( block );

						// Only show the button if the no results block isn't already inserted.
						noResults = allInnerBlocks.find( ( innerBlock ) =>
							innerBlock.name === 'generateblocks/query-no-results'
						);
					}

					// Select the no results block if it exists, otherwise insert it.
					if ( noResults ) {
						selectBlock( noResults.clientId );
					} else {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ NO_RESULTS_TEMPLATE ] ), undefined, clientId );
					}
				} }
				showTooltip
			/>
		</>
	);
}

addFilter(
	'generateblocks.editor.toolbarAppenders',
	'generateblocks.query.addToolbarAppenders',
	QueryToolbar
);

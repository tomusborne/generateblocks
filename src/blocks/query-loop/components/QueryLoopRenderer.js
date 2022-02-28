import {
	BlockContextProvider,
	InnerBlocks,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const DEFAULT_BUTTON_ATTRIBUTES = {
	hasUrl: false,
	backgroundColor: '#0366d6',
	textColor: '#ffffff',
	backgroundColorHover: '#222222',
	textColorHover: '#ffffff',
	paddingTop: 15,
	paddingRight: 20,
	paddingBottom: 15,
	paddingLeft: 20,
	isDynamicContent: true,
	isPagination: true,
};

const PAGINATION_TEMPLATE = [ 'generateblocks/button-container', {},
	[
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( 'Previous page', 'generateblocks' ),
				dynamicLinkType: 'pagination-prev',
			} ),
		],
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( '1 2 ... 10', 'generateblocks' ),
				dynamicLinkType: 'pagination-numbers',
			} ),
		],
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( 'Next page', 'generateblocks' ),
				dynamicLinkType: 'pagination-next',
			} ),
		],
	],
];

const TEMPLATE = [ [ 'generateblocks/post-template' ], PAGINATION_TEMPLATE ];

const ALLOWED_BLOCKS = [ 'generateblocks/post-template', 'generateblocks/button-container' ];

export default function QueryLoopRenderer( { attributes } ) {
	return (
		<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
			<InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } templateLock={ true } />
		</BlockContextProvider>
	);
}


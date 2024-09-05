import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import attributes from './attributes';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import './editor.scss';
import withUniqueId from '../../hoc/withUniqueId';

registerBlockType( 'generateblocks/query-loop', {
	apiVersion: 2,
	title: __( 'Query Loop', 'generateblocks' ),
	description: __( 'Build a list of posts from any post type using advanced query parameters.', 'generateblocks' ),
	icon: getIcon( 'query-loop' ),
	category: 'generateblocks',
	keywords: [
		__( 'query' ),
		__( 'loop' ),
		__( 'generate' ),
	],
	attributes,
	supports: {
		className: false,
		customClassName: false,
	},
	providesContext: {
		'generateblocks/query': 'query',
		'generateblocks/queryId': 'uniqueId',
		'generateblocks/inheritQuery': 'inheritQuery',
	},
	edit: withUniqueId( edit ),
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	__experimentalLabel: ( attrs, { context } ) => {
		const customName = attrs?.metadata?.name || attrs?.blockLabel;

		if ( 'list-view' === context && customName ) {
			return customName;
		}

		return __( 'Query Loop', 'generateblocks' );
	},
} );

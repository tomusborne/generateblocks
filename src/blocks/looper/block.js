import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

import getIcon from '../../utils/get-icon';
import attributes from './attributes';
import edit from './edit';
import withUniqueId from '../../hoc/withUniqueId';

import './editor.scss';

registerBlockType( 'generateblocks/looper', {
	apiVersion: 3,
	title: __( 'Looper', 'generateblocks' ),
	description: __( 'Loop through data to build a list of content.', 'generateblocks' ),
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
		'generateblocks/isLoop': 'isLoop',
		'generateblocks/wpQuery': 'wpQuery',
		'generateblocks/noResults': 'noResults',
	},
	edit: withUniqueId( edit ),
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	__experimentalLabel: ( attrs, { label, context } ) => {
		if ( 'list-view' === context && attrs.blockLabel ) {
			return attrs.blockLabel;
		}

		return label;
	},
} );

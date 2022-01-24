import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import attributes from './attributes';
import editGridContainer from '../grid/edit';
import { InnerBlocks } from '@wordpress/block-editor';
import withQueryLoop from './hoc/withQueryLoop';

registerBlockType( 'generateblocks/query-loop', {
	apiVersion: 2,
	title: __( 'Query loop', 'generateblocks' ),
	description: __( 'Create advanced loops.', 'generateblocks' ),
	icon: getIcon( 'grid' ),
	category: 'generateblocks',
	keywords: [
		__( 'query' ),
		__( 'loop' ),
		__( 'generate' ),
	],
	attributes,
	usesContext: [ 'postId', 'postType', 'taxonomy', 'termId', 'taxonomyRest' ],
	supports: { className: false },
	edit: withQueryLoop( editGridContainer ),
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	__experimentalLabel: ( { isQueryLoop, queryType } ) => {
		if ( isQueryLoop ) {
			const labels = {
				'postType': __( 'Posts loop', 'generateblocks' ),
				'taxonomy': __( 'Terms loop', 'generateblocks' ),
			};

			return labels[ queryType ] ?? __( 'Query loop', 'generateblocks' );
		}

		return __( 'Query loop', 'generateblocks' );
	},
} );

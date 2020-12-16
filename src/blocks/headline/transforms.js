/**
 * WordPress dependencies
 */
import {
	createBlock,
} from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( 'generateblocks/headline', {
					content,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { content } ) => {
				return createBlock( 'generateblocks/headline', {
					content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( 'core/paragraph', {
					content,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { content } ) => {
				return createBlock( 'core/heading', {
					content,
				} );
			},
		},
	],
};

export default transforms;

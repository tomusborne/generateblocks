import {
	BlockContextProvider,
	InnerBlocks,
} from '@wordpress/block-editor';

const TEMPLATE = [ [ 'generateblocks/post-template' ] ];
const ALLOWED_BLOCKS = [ 'generateblocks/post-template' ];

export default function QueryLoopRenderer( { attributes } ) {
	return (
		<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
			<InnerBlocks template={ TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } templateLock={ true } />
		</BlockContextProvider>
	);
}


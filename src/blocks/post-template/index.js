import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import PostTemplateEdit from './edit';

registerBlockType( 'generateblocks/post-template', {
	edit: PostTemplateEdit,
	save: () => {
		return <InnerBlocks.Content />
	}
} );

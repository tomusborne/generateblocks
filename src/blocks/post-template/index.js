import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import PostTemplateEdit from './edit';
import getIcon from '../../utils/get-icon';

registerBlockType( 'generateblocks/post-template', {
	icon: getIcon( 'post-template' ),
	edit: PostTemplateEdit,
	save: () => {
		return <InnerBlocks.Content />;
	},
} );

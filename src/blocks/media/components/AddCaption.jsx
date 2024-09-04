import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import getIcon from '../../../utils/get-icon';

export function AddCaption( { clientId, tagName } ) {
	const {
		getBlock,
		getBlockParents,
	} = useSelect( ( select ) => select( blockEditorStore ), [] );
	const {
		replaceBlock,
		selectBlock,
	} = useDispatch( blockEditorStore );

	const blockParents = getBlockParents( clientId, true );

	const hasFigure = useMemo( () => {
		return blockParents.some( ( block ) => {
			const { name, attributes } = getBlock( block );

			return (
				'generateblocks/element' === name &&
				'figure' === attributes.tagName
			);
		} );
	}, [ blockParents ] );

	if ( 'img' !== tagName || hasFigure ) {
		return null;
	}

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					className="gblocks-add-new-button"
					icon={ getIcon( 'caption' ) }
					label={ __( 'Add Caption', 'generateblocks' ) }
					onClick={ () => {
						const block = getBlock( clientId );
						const image = createBlock(
							block.name,
							block.attributes
						);
						const caption = createBlock(
							'generateblocks/text',
							{
								content: '',
								tagName: 'figcaption',
							}
						);
						const newChildBlocks = [
							image,
							caption,
						];
						const newBlocks = createBlock(
							'generateblocks/element',
							{
								tagName: 'figure',
							},
							newChildBlocks
						);

						replaceBlock( clientId, newBlocks );
						selectBlock( caption.clientId );
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

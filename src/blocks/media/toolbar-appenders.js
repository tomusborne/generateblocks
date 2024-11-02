import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';

function captionIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d="M6.743,14.365C6.113,14.365 5.493,14.971 5.493,15.865C5.493,16.758 6.113,17.365 6.743,17.365C6.972,17.363 7.195,17.29 7.38,17.154C7.466,17.09 7.571,17.055 7.678,17.055C7.953,17.055 8.178,17.281 8.178,17.555C8.178,17.72 8.097,17.874 7.962,17.967C7.608,18.224 7.181,18.363 6.743,18.365C5.44,18.365 4.493,17.181 4.493,15.865C4.493,14.549 5.44,13.365 6.743,13.365C7.218,13.365 7.654,13.528 8.011,13.798C8.136,13.893 8.209,14.04 8.209,14.197C8.209,14.471 7.983,14.697 7.709,14.697C7.6,14.697 7.494,14.661 7.407,14.595C7.217,14.447 6.984,14.366 6.743,14.365ZM10.493,15.865C10.493,14.971 11.113,14.365 11.743,14.365C11.983,14.365 12.21,14.446 12.407,14.595C12.492,14.655 12.594,14.688 12.698,14.688C12.972,14.688 13.198,14.462 13.198,14.188C13.198,14.036 13.129,13.893 13.011,13.798C12.648,13.518 12.202,13.366 11.743,13.365C10.44,13.365 9.493,14.549 9.493,15.865C9.493,17.181 10.44,18.365 11.743,18.365C12.181,18.363 12.608,18.224 12.962,17.967C13.097,17.874 13.178,17.72 13.178,17.555C13.178,17.281 12.953,17.055 12.678,17.055C12.571,17.055 12.466,17.09 12.38,17.154C12.195,17.29 11.972,17.363 11.743,17.365C11.113,17.365 10.493,16.758 10.493,15.865ZM1.993,12.115C1.993,10.88 3.009,9.865 4.243,9.865L13.743,9.865C14.978,9.865 15.993,10.88 15.993,12.115L15.993,19.615C15.993,20.849 14.978,21.865 13.743,21.865L4.243,21.865C3.009,21.865 1.993,20.849 1.993,19.615L1.993,12.115ZM4.243,10.865C3.557,10.865 2.993,11.429 2.993,12.115L2.993,19.615C2.993,20.3 3.557,20.865 4.243,20.865L13.743,20.865C14.429,20.865 14.993,20.3 14.993,19.615L14.993,12.115C14.993,11.429 14.429,10.865 13.743,10.865L4.243,10.865Z" style={ { fillRule: 'nonzero' } } />
			<path d="M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z" style={ { fillOpacity: 0.5 } } />
			<path d="M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z" />
		</svg>
	);
}

function Toolbar( toolbar, { clientId, attributes, name } ) {
	const {
		getBlock,
		getBlocks,
		getBlockParents,
	} = useSelect( ( select ) => select( blockEditorStore ), [] );
	const {
		replaceBlock,
		selectBlock,
	} = useDispatch( blockEditorStore );
	const {
		tagName,
	} = attributes;

	if ( 'generateblocks/media' !== name || 'img' !== tagName ) {
		return toolbar;
	}

	return (
		<>
			{ toolbar }
			<ToolbarButton
				className="gblocks-add-new-button"
				icon={ captionIcon }
				label={ __( 'Add Caption', 'generateblocks' ) }
				onClick={ () => {
					const blockParents = getBlockParents( clientId, true );
					const figure = blockParents.filter( ( block ) => {
						const { name: blockName, attributes: blockAttributes } = getBlock( block );

						return (
							'generateblocks/element' === blockName &&
							'figure' === blockAttributes.tagName
						);
					} );

					if ( figure?.[ 0 ] ) {
						const innerBlocks = getBlocks( figure[ 0 ] );
						const caption = innerBlocks.filter( ( block ) => {
							const { name: blockName, attributes: blockAttributes } = getBlock( block.clientId );

							return (
								'generateblocks/text' === blockName &&
								'figcaption' === blockAttributes.tagName
							);
						} );

						if ( caption?.[ 0 ] ) {
							selectBlock( caption[ 0 ].clientId );
							return;
						}
					}

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
		</>
	);
}

addFilter(
	'generateblocks.editor.toolbarAppenders',
	'generateblocks.media.addToolbarAppenders',
	Toolbar
);

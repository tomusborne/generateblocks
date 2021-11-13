import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { cloneBlock, createBlock } from '@wordpress/blocks';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

const ALIGNMENT_CONTROLS = [
	{
		icon: 'editor-alignleft',
		title: __( 'Align Buttons Left', 'generateblocks' ),
		align: 'left',
	},
	{
		icon: 'editor-aligncenter',
		title: __( 'Align Buttons Center', 'generateblocks' ),
		align: 'center',
	},
	{
		icon: 'editor-alignright',
		title: __( 'Align Buttons Right', 'generateblocks' ),
		align: 'right',
	},
];

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
		deviceType,
	} = props;

	const {
		alignment,
		alignmentTablet,
		alignmentMobile,
	} = attributes;

	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const { getBlocksByClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					className="gblocks-add-new-button"
					icon={ getIcon( 'insert' ) }
					label={ __( 'Add Button', 'generateblocks' ) }
					onClick={ () => {
						const thisBlock = getBlocksByClientId( clientId )[ 0 ];

						if ( thisBlock ) {
							const childBlocks = thisBlock.innerBlocks;
							const keys = Object.keys( childBlocks );
							const lastKey = keys[ keys.length - 1 ];

							if ( typeof childBlocks[ lastKey ] !== 'undefined' ) {
								const blockToCopyId = childBlocks[ lastKey ].clientId;

								if ( blockToCopyId ) {
									const blockToCopy = getBlocksByClientId( blockToCopyId )[ 0 ];

									const clonedBlock = cloneBlock(
										blockToCopy,
										{
											uniqueId: '',
										}
									);

									insertBlocks( clonedBlock, undefined, clientId );
								}
							} else if ( 0 === childBlocks.length ) {
								insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
							}
						}
					} }
					showTooltip
				/>
			</ToolbarGroup>

			{ 'Desktop' === deviceType && (
				<AlignmentToolbar
					value={ alignment }
					alignmentControls={ ALIGNMENT_CONTROLS }
					onChange={ ( nextAlign ) => {
						setAttributes( { alignment: nextAlign } );
					} }
				/>
			) }

			{ 'Tablet' === deviceType && (
				<AlignmentToolbar
					value={ alignmentTablet }
					alignmentControls={ ALIGNMENT_CONTROLS }
					onChange={ ( value ) => {
						setAttributes( { alignmentTablet: value } );
					} }
				/>
			) }

			{ 'Mobile' === deviceType && (
				<AlignmentToolbar
					value={ alignmentMobile }
					alignmentControls={ ALIGNMENT_CONTROLS }
					onChange={ ( value ) => {
						setAttributes( { alignmentMobile: value } );
					} }
				/>
			) }
		</BlockControls>
	);
};

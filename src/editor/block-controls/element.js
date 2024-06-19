import { __ } from '@wordpress/i18n';
import { Button, BaseControl } from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';
import { containerColorControls, linkElementColorControls } from './colorControls.js';
import { addFilter } from '@wordpress/hooks';
import UnitControl from '../../components/unit-control/index.js';
import { URLControls } from '../../components/url-controls/index.js';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { GridColumnSelector } from '../../components/grid-column-selector/index.js';
import { DividerModal } from '../../components/icon-control/DividerModal.jsx';
import { OpenPanel } from '../../components/open-panel/index.js';
import { layouts } from '../../components/grid-column-selector/layouts.js';
import { moreDesignOptions, Padding, ColorPickerControls } from './index.js';
import { ImageUpload } from '../../components/image-upload/ImageUpload.jsx';

export function ElementOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		name,
		attributes,
		setAttributes,
		clientId,
	} = props;

	const {
		tagName,
		htmlAttributes = {},
		styles = {},
	} = attributes;

	const [ openShapeLibrary, setOpenShapeLibrary ] = useState( false );
	const {
		insertBlocks,
		removeBlock,
	} = useDispatch( blockEditorStore );
	const { getBlock } = useSelect( ( select ) => select( blockEditorStore ), [] );

	const backgroundImageUrl = useMemo( () => {
		const url = getStyleValue( 'backgroundImage' );

		const regex = /url\((['"]?)(.*?)\1\)/;
		const match = url.match( regex );

		if ( match && match[ 2 ] ) {
			return match[ 2 ];
		}
	}, [ getStyleValue( 'backgroundImage' ) ] );

	if ( 'generateblocks/element' !== name ) {
		return options;
	}

	return (
		<>
			{ 'a' === tagName && (
				<OpenPanel
					title={ __( 'Link Destination', 'generateblocks' ) }
				>
					<URLControls
						setAttributes={ setAttributes }
						htmlAttributes={ htmlAttributes }
					/>
				</OpenPanel>
			) }

			{ 'grid' === styles?.display && (
				<OpenPanel
					title={ __( 'Grid', 'generateblocks' ) }
				>
					<BaseControl
						label={ __( 'Layout', 'generateblocks' ) }
						id="grid-template-columns"
					>
						<GridColumnSelector
							value={ getStyleValue( 'gridTemplateColumns' ) }
							onClick={ ( value ) => {
								onStyleChange( 'gridTemplateColumns', value );
								const selectedLayout = layouts.find( ( { layout } ) => layout === value );
								const selectedLayoutDivCount = selectedLayout?.divs || 0;
								const innerBlocksCount = getBlock( clientId ).innerBlocks.length;

								if ( selectedLayoutDivCount > innerBlocksCount ) {
									const lastInnerBlock = getBlock( clientId ).innerBlocks[ innerBlocksCount - 1 ];

									if ( lastInnerBlock ) {
										const newBlockCount = selectedLayoutDivCount - innerBlocksCount;
										const newBlocksToInsert = [];

										for ( let i = 0; i < newBlockCount; i++ ) {
											const clonedBlock = cloneBlock(
												lastInnerBlock,
												{
													uniqueId: '',
												}
											);
											newBlocksToInsert.push( clonedBlock );
										}

										insertBlocks( newBlocksToInsert, innerBlocksCount, clientId, false );
									}
								} else if ( selectedLayoutDivCount < innerBlocksCount ) {
									const blocksToRemove = getBlock( clientId )?.innerBlocks
										.slice( selectedLayoutDivCount )
										.filter( ( block ) => (
											'generateblocks/element' === block.name &&
											0 === block.innerBlocks.length
										) );

									if ( blocksToRemove.length ) {
										blocksToRemove.forEach( ( block ) => {
											removeBlock( block.clientId, false );
										} );
									}
								}
							} }
						/>
					</BaseControl>

					<UnitControl
						id="columnGap"
						label={ __( 'Horizontal Gap', 'generateblocks' ) }
						value={ getStyleValue( 'columnGap' ) }
						onChange={ ( value ) => onStyleChange( 'columnGap', value ) }
					/>

					<UnitControl
						id="rowGap"
						label={ __( 'Vertical Gap', 'generateblocks' ) }
						value={ getStyleValue( 'rowGap' ) }
						onChange={ ( value ) => onStyleChange( 'rowGap', value ) }
					/>
				</OpenPanel>
			) }

			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<ColorPickerControls
					items={ 'a' === tagName ? linkElementColorControls : containerColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>

				<ImageUpload
					label={ __( 'Background Image', 'generateblocks' ) }
					value={ getStyleValue( 'backgroundImage' ) }
					onInsert={ ( value ) => onStyleChange( 'backgroundImage', `url(${ value })` ) }
					onSelectImage={ ( media ) => onStyleChange( 'backgroundImage', `url(${ media.url })` ) }
					showInput={ false }
					previewUrl={ backgroundImageUrl }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Shapes', 'generateblocks' ) }
			>
				<Button
					variant="secondary"
					size="compact"
					onClick={ () => setOpenShapeLibrary( true ) }
				>
					{ __( 'Open Shape Library', 'generateblocks' ) }
				</Button>

				{ !! openShapeLibrary && (
					<DividerModal
						setIsOpen={ setOpenShapeLibrary }
						onChange={ ( value ) => {
							setAttributes( {
								styles: {
									...styles,
									position: 'relative',
								},
							} );

							const newShapeBlock = createBlock(
								'generateblocks/shape',
								{
									html: value,
									styles: {
										position: 'absolute',
										bottom: '0',
										left: '0',
										right: '0',
										overflowX: 'hidden',
										overflowY: 'hidden',
										pointerEvents: 'none',
										color: '#000000',
										svg: {
											fill: 'currentColor',
											width: '100%',
										},
									},
								},
							);

							insertBlocks(
								newShapeBlock,
								0,
								clientId,
								true
							);

							setOpenShapeLibrary( false );
						} }
					/>
				) }
			</OpenPanel>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/elementOptions',
	ElementOptions
);

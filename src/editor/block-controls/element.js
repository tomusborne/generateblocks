import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Notice } from '@wordpress/components';
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
import { TagNameControl } from '../../components/tagname-control/TagNameControl.jsx';
import { HtmlAttributes } from '../../components/html-attributes';

export function ElementOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		currentAtRule,
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
		const url = getStyleValue( 'backgroundImage', currentAtRule );

		const regex = /url\((['"]?)(.*?)\1\)/;
		const match = url.match( regex );

		if ( match && match[ 2 ] ) {
			return match[ 2 ];
		}
	}, [ getStyleValue( 'backgroundImage' ), currentAtRule ] );

	if ( 'generateblocks/element' !== name ) {
		return options;
	}

	return (
		<>
			<OpenPanel
				title={ __( 'Link Destination', 'generateblocks' ) }
				shouldRender={ 'a' === tagName && '' === currentAtRule }
			>
				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Grid', 'generateblocks' ) }
				shouldRender={ 'grid' === getStyleValue( 'display', currentAtRule ) }
			>
				<BaseControl
					label={ __( 'Layout', 'generateblocks' ) }
					id="grid-template-columns"
				>
					<GridColumnSelector
						value={ getStyleValue( 'gridTemplateColumns', currentAtRule ) }
						onClick={ ( value ) => {
							onStyleChange( 'gridTemplateColumns', value, currentAtRule );
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
					value={ getStyleValue( 'columnGap', currentAtRule ) }
					onChange={ ( value ) => onStyleChange( 'columnGap', value, currentAtRule ) }
				/>

				<UnitControl
					id="rowGap"
					label={ __( 'Vertical Gap', 'generateblocks' ) }
					value={ getStyleValue( 'rowGap', currentAtRule ) }
					onChange={ ( value ) => onStyleChange( 'rowGap', value, currentAtRule ) }
				/>
			</OpenPanel>

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
					currentAtRule={ currentAtRule }
				/>

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
				/>

				<ImageUpload
					label={ __( 'Background Image', 'generateblocks' ) }
					value={ getStyleValue( 'backgroundImage', currentAtRule ) }
					onInsert={ ( value ) => onStyleChange( 'backgroundImage', `url(${ value })`, currentAtRule ) }
					onSelectImage={ ( media ) => onStyleChange( 'backgroundImage', `url(${ media.url })`, currentAtRule ) }
					showInput={ false }
					previewUrl={ backgroundImageUrl }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Shapes', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
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

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<TagNameControl
					blockName="generateblocks/element"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! styles?.display ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>

				{ 'a' === tagName && (
					<BaseControl>
						<Notice
							status="warning"
							isDismissible={ false }
						>
							{ __( 'This container is now a link element. Be sure not to add any interactive elements inside of it, like buttons or other links.', 'generateblocks' ) }
						</Notice>
					</BaseControl>
				) }

				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
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

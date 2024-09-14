import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	TagNameControl,
	GridColumnSelector,
	gridColumnLayouts as layouts,
	DividerModal,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';
import { getElementType } from '../utils/getElementType';
import { InlineBackgroundImage } from './InlineBackgroundImage';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	clientId,
} ) {
	const {
		tagName,
		htmlAttributes,
		styles,
	} = attributes;

	const [ openShapeLibrary, setOpenShapeLibrary ] = useState( false );
	const {
		insertBlocks,
		removeBlock,
	} = useDispatch( blockEditorStore );
	const { getBlock } = useSelect( ( select ) => select( blockEditorStore ), [] );
	const {
		currentAtRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
		clientId,
	};

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				title={ __( 'Link Destination', 'generateblocks' ) }
				shouldRender={ 'a' === tagName && '' === currentAtRule }
				panelId="link-destination"
			>
				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Grid', 'generateblocks' ) }
				shouldRender={ 'grid' === getStyleValue( 'display', currentAtRule ) }
				panelId="grid"
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
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="settings"
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
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Shapes', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="shapes"
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
				title={ __( 'Inline Background Image', 'generateblocks' ) }
				shouldRender={ 'container' === getElementType( tagName ) }
			>
				<InlineBackgroundImage
					htmlAttributes={ htmlAttributes }
					setAttributes={ setAttributes }
					styles={ styles }
					onStyleChange={ onStyleChange }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}

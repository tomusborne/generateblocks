import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

import { OpenPanel, IconModal } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	TagNameControl,
	GridColumnSelector,
	gridColumnLayouts as layouts,
	DynamicTagsOnboarder,
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
	htmlAttributes,
	styles,
	context,
} ) {
	const {
		tagName,
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
				shouldRender={ 'a' === tagName && '' === currentAtRule }
				panelId="link-destination"
			>
				<URLControls
					label={ __( 'Link Destination', 'generateblocks' ) }
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
					context={ context }
					tagName={ tagName }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				shouldRender={
					'grid' === getStyleValue( 'display' ) &&
					(
						'grid' === getStyleValue( 'display', currentAtRule ) ||
						'' === getStyleValue( 'display', currentAtRule )
					)
				}
				panelId="grid"
			>
				<BaseControl
					label={ __( 'Layout', 'generateblocks' ) }
					id="grid-template-columns"
				>
					<GridColumnSelector
						value={ getStyleValue( 'gridTemplateColumns', currentAtRule ) }
						onClick={ ( value ) => {
							if ( value === getStyleValue( 'gridTemplateColumns', currentAtRule ) ) {
								// If the same layout is clicked, remove the layout.
								onStyleChange( 'gridTemplateColumns', '', currentAtRule );
								return;
							}

							onStyleChange( 'gridTemplateColumns', value, currentAtRule );

							if ( '' !== currentAtRule ) {
								// Don't add/remove blocks for at rules.
								return;
							}

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
				shouldRender={ '' === currentAtRule }
				panelId="shapes"
			>
				<BaseControl
					label={ __( 'Shape', 'generateblocks' ) }
					id="shape"
				>
					<Button
						variant="secondary"
						size="compact"
						onClick={ () => setOpenShapeLibrary( true ) }
						style={ { display: 'block' } }
					>
						{ __( 'Open Shape Library', 'generateblocks' ) }
					</Button>
				</BaseControl>

				{ !! openShapeLibrary && (
					<IconModal
						title={ __( 'Shape Library', 'generateblocks' ) }
						iconType="divider"
						setIsOpen={ setOpenShapeLibrary }
						icons={ generateBlocksInfo.svgShapes }
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
									className: 'gb-shape--divider',
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
				{ ...panelProps }
				shouldRender={ 'container' === getElementType( tagName ) && '' === currentAtRule }
				panelId="inline-background-image"
			>
				<InlineBackgroundImage
					label={ __( 'Inline Background Image', 'generateblocks' ) }
					htmlAttributes={ htmlAttributes }
					setAttributes={ setAttributes }
					styles={ styles }
					onStyleChange={ onStyleChange }
					context={ context }
				/>
			</OpenPanel>

			<DynamicTagsOnboarder />
		</ApplyFilters>
	);
}

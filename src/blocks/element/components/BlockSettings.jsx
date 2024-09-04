import { __ } from '@wordpress/i18n';
import { Button, BaseControl, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

import {
	ApplyFilters,
	OpenPanel,
	URLControls,
	TagNameControl,
	HtmlAttributes,
	GridColumnSelector,
	gridColumnLayouts as layouts,
	DividerModal,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';

export const containerColorControls = [
	{
		label: 'Background Color',
		id: 'container-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'container-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
		],
	},
	{
		label: 'Link Color',
		id: 'container-link-color',
		items: [
			{
				tooltip: 'Link Color',
				value: 'color',
				selector: 'a',
			},
			{
				tooltip: 'Link Hover Color',
				value: 'color',
				selector: 'a:is(:hover, :focus)',
			},
		],
	},
];

export const linkElementColorControls = [
	{
		label: 'Background Color',
		id: 'link-element-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
			{
				tooltip: 'Hover Background Color',
				value: 'backgroundColor',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'link-element-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
			{
				tooltip: 'Hover Text Color',
				value: 'color',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
];

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
		</ApplyFilters>
	);
}

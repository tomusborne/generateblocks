import { __ } from '@wordpress/i18n';
import { Button, SelectControl, TextControl, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ColorPicker } from '@edge22/components';
import { containerColorControls, buttonColorControls, linkElementColorControls, textColorControls, shapeColorControls } from './design.js';
import { addFilter } from '@wordpress/hooks';
import DimensionsControl from '../components/dimensions/index.js';
import { ColorPickerGroup } from '../components/color-picker-group/ColorPickerGroup.jsx';
import UnitControl from '../components/unit-control/index.js';
import { URLControls } from '../components/url-controls/index.js';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { ImageUpload } from '../components/image-upload/ImageUpload.jsx';
import { IconControl } from '../components/icon-control';
import { GridColumnSelector } from '../components/grid-column-selector';
import { DividerModal } from '../components/icon-control/DividerModal.jsx';
import { OpenPanel } from '../components/open-panel';

function Padding( { getStyleValue, onStyleChange } ) {
	const paddingTop = getStyleValue( 'paddingTop' );
	const paddingRight = getStyleValue( 'paddingRight' );
	const paddingBottom = getStyleValue( 'paddingBottom' );
	const paddingLeft = getStyleValue( 'paddingLeft' );

	return (
		<DimensionsControl
			label={ __( 'Padding', 'generateblocks-pro' ) }
			attributeNames={ [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ] }
			values={ { paddingTop, paddingRight, paddingBottom, paddingLeft } }
			onChange={ ( values ) => Object.keys( values ).forEach( ( property ) => (
				onStyleChange( property, values[ property ] )
			) ) }
			placeholders={ {} }
		/>
	);
}

const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel__styles-tab' )?.click(),
};

function ColorPickerControls( { items, getStyleValue, onStyleChange } ) {
	return (
		<>
			{ items.map( ( control ) => {
				return (
					<ColorPickerGroup label={ control.label } key={ control.label }>
						{ control.items.map( ( item ) => {
							return (
								<ColorPicker
									key={ item.tooltip }
									tooltip={ item.tooltip }
									value={ getStyleValue( item.value, item.selector ) }
									onChange={ ( value ) => onStyleChange( item.value, value, '', item.selector ) }
								/>
							);
						}
						) }
					</ColorPickerGroup>
				);
			} ) }
		</>
	);
}

export function ContainerOptions( options, props ) {
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
	} = useDispatch( blockEditorStore );

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
							onClick={ ( value ) => onStyleChange( 'gridTemplateColumns', value ) }
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
	'generateblocks/containerOptions',
	ContainerOptions
);

export function TextOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		name,
		attributes,
		setAttributes,
	} = props;

	const {
		htmlAttributes,
		tagName,
		icon,
		iconLocation,
	} = attributes;

	if ( 'generateblocks/text' !== name ) {
		return options;
	}

	const colorControls = 'a' === tagName || 'button' === tagName
		? buttonColorControls
		: textColorControls;

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

			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<ColorPickerControls
					items={ colorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>

				<UnitControl
					id="fontSize"
					label={ __( 'Font size', 'generateblocks' ) }
					value={ getStyleValue( 'fontSize' ) }
					onChange={ ( value ) => onStyleChange( 'fontSize', value ) }
				/>

				<SelectControl
					label={ __( 'Appearance', 'generateblocks' ) }
					value={ getStyleValue( 'fontWeight' ) }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: __( 'Thin', 'generateblocks' ), value: '100' },
						{ label: __( 'Extra Light', 'generateblocks' ), value: '200' },
						{ label: __( 'Light', 'generateblocks' ), value: '300' },
						{ label: __( 'Normal', 'generateblocks' ), value: '400' },
						{ label: __( 'Medium', 'generateblocks' ), value: '500' },
						{ label: __( 'Semi Bold', 'generateblocks' ), value: '600' },
						{ label: __( 'Bold', 'generateblocks' ), value: '700' },
						{ label: __( 'Extra Bold', 'generateblocks' ), value: '800' },
						{ label: __( 'Black', 'generateblocks' ), value: '900' },
					] }
					onChange={ ( value ) => onStyleChange( 'fontWeight', value ) }
				/>

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Icon', 'generateblocks' ) }
			>
				<IconControl
					value={ icon }
					onChange={ ( value ) => {
						setAttributes( { icon: value } );
					} }
					onClear={ () => {
						setAttributes( { icon: '' } );
					} }
					attributes={ attributes }
				/>

				<SelectControl
					label={ __( 'Icon Location', 'generateblocks' ) }
					value={ iconLocation }
					options={ [
						{ label: __( 'Before', 'generateblocks' ), value: 'before' },
						{ label: __( 'After', 'generateblocks' ), value: 'after' },
					] }
					onChange={ ( value ) => setAttributes( { iconLocation: value } ) }
				/>
			</OpenPanel>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/textOptions',
	TextOptions
);

function ImageOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		name,
		attributes,
		setAttributes,
		onSelectImage,
	} = props;

	const {
		htmlAttributes,
		tagName,
	} = attributes;

	if ( 'generateblocks/void-element' !== name || 'img' !== tagName ) {
		return options;
	}

	return (
		<>
			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
			>
				<ImageUpload
					url={ htmlAttributes?.src }
					onInsert={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								src: value,
							},
						} );
					} }
					onSelectImage={ onSelectImage }
				/>

				<TextControl
					label={ __( 'Width', 'generateblocks' ) }
					value={ htmlAttributes?.width }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								width: value,
							},
						} );
					} }
				/>

				<TextControl
					label={ __( 'Height', 'generateblocks' ) }
					value={ htmlAttributes?.height }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								height: value,
							},
						} );
					} }
				/>

				<TextControl
					label={ __( 'Alt text', 'generateblocks' ) }
					value={ htmlAttributes?.alt }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								alt: value,
							},
						} );
					} }
				/>
			</OpenPanel>
			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<UnitControl
					id="width"
					label={ __( 'Width', 'generateblocks' ) }
					value={ getStyleValue( 'width' ) }
					onChange={ ( value ) => onStyleChange( 'width', value ) }
				/>

				<UnitControl
					id="height"
					label={ __( 'Height', 'generateblocks' ) }
					value={ getStyleValue( 'height' ) }
					onChange={ ( value ) => onStyleChange( 'height', value ) }
				/>
			</OpenPanel>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/imageOptions',
	ImageOptions
);

function ShapeOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		name,
		attributes,
		setAttributes,
	} = props;

	const {
		html,
	} = attributes;

	if ( 'generateblocks/shape' !== name ) {
		return options;
	}

	return (
		<>
			<OpenPanel
				title={ __( 'Shape', 'generateblocks' ) }
			>
				<IconControl
					value={ html }
					onChange={ ( value ) => {
						setAttributes( { html: value } );
					} }
					onClear={ () => {
						setAttributes( { html: '' } );
					} }
					attributes={ attributes }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<UnitControl
					id="width"
					label={ __( 'Width', 'generateblocks' ) }
					value={ getStyleValue( 'width', 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'width', value, '', 'svg' ) }
				/>

				<UnitControl
					id="height"
					label={ __( 'Height', 'generateblocks' ) }
					value={ getStyleValue( 'height', 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'height', value, '', 'svg' ) }
				/>

				<ColorPickerControls
					items={ shapeColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>
			</OpenPanel>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/shapeOptions',
	ShapeOptions
);

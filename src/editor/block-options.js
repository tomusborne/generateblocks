import { __ } from '@wordpress/i18n';
import { Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { ColorPicker } from '@edge22/components';
import { containerColorControls, buttonColorControls, linkElementColorControls, textColorControls } from './design.js';
import { addFilter } from '@wordpress/hooks';
import DimensionsControl from '../components/dimensions/index.js';
import { ColorPickerGroup } from '../components/color-picker-group/ColorPickerGroup.jsx';
import UnitControl from '../components/unit-control/index.js';
import { URLControls } from '../components/url-controls/index.js';
import { styles } from '@wordpress/icons';
import { ImageUpload } from '../components/image-upload/ImageUpload.jsx';
import { IconControl } from '../components/icon-control';

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

function MoreDesignOptions() {
	return (
		<Button
			variant="tertiary"
			size="compact"
			icon={ styles }
			onClick={ () => document.querySelector( '.gb-block-styles-tab-panel__styles-tab' )?.click() }
			style={ { width: '100%', justifyContent: 'center' } }
		>
			{ __( 'More design options', 'generateblocks' ) }
		</Button>
	);
}

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
	} = props;

	const {
		tagName,
		htmlAttributes = {},
	} = attributes;

	if ( 'generateblocks/element' !== name ) {
		return options;
	}

	return (
		<>
			{ 'a' === tagName && (
				<PanelBody>
					<URLControls
						setAttributes={ setAttributes }
						htmlAttributes={ htmlAttributes }
					/>
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Design', 'generateblocks' ) }
				initialOpen={ true }
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

				<MoreDesignOptions />
			</PanelBody>

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
				<PanelBody>
					<URLControls
						setAttributes={ setAttributes }
						htmlAttributes={ htmlAttributes }
					/>
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Design', 'generateblocks' ) }
				initialOpen={ false }
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

				<MoreDesignOptions />
			</PanelBody>

			<PanelBody
				title={ __( 'Icon', 'generateblocks' ) }
				initialOpen={ false }
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
			</PanelBody>

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
			<PanelBody>
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
			</PanelBody>
			<PanelBody
				title={ __( 'Design', 'generateblocks' ) }
				initialOpen={ true }
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

				<MoreDesignOptions />
			</PanelBody>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/imageOptions',
	ImageOptions
);

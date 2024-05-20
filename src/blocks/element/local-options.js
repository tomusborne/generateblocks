import { __ } from '@wordpress/i18n';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { ColorPicker } from '@edge22/components';
import { containerColorControls, buttonColorControls } from './design.js';
import { addFilter } from '@wordpress/hooks';
import DimensionsControl from '../../components/dimensions';
import { ColorPickerGroup } from '../../components/color-picker-group/ColorPickerGroup.jsx';
import UnitControl from '../../components/unit-control/index.js';
import { URLControls } from '../../components/url-controls';
import { styles } from '@wordpress/icons';

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
		>
			{ __( 'More design options', 'generateblocks' ) }
		</Button>
	);
}

export function ContainerOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		name,
	} = props;

	if ( 'generateblocks/element' !== name ) {
		return options;
	}

	return (
		<>
			<PanelBody
				title={ __( 'Design', 'generateblocks' ) }
				initialOpen={ true }
			>
				{ containerColorControls.map( ( control ) => {
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

export function ButtonOptions( options, props ) {
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
	} = attributes;

	if ( 'generateblocks/text' !== name ) {
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
				{ buttonColorControls.map( ( control ) => {
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
							} ) }
						</ColorPickerGroup>
					);
				} ) }

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

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/buttonOptions',
	ButtonOptions
);

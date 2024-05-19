import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ColorPicker } from '@edge22/components';
import { containerColorControls, buttonColorControls } from './design.js';
import { addFilter } from '@wordpress/hooks';
import DimensionsControl from '../../components/dimensions';

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
						<ColorPicker
							key={ control.label }
							label={ control.label }
							value={ getStyleValue( control.value, control.selector ) }
							onChange={ ( value ) => onStyleChange( control.value, value, '', control.selector ) }
						/>
					);
				} ) }

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>
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
	} = props;

	if ( 'generateblocks/text' !== name ) {
		return options;
	}

	return (
		<>
			<PanelBody
				title={ __( 'Design', 'generateblocks' ) }
				initialOpen={ true }
			>
				{ buttonColorControls.map( ( control ) => {
					return (
						<ColorPicker
							key={ control.label }
							label={ control.label }
							value={ getStyleValue( control.value, control.selector ) }
							onChange={ ( value ) => onStyleChange( control.value, value, '', control.selector ) }
						/>
					);
				} ) }

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>
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

import { __ } from '@wordpress/i18n';
import { shapeColorControls } from './colorControls.js';
import { addFilter } from '@wordpress/hooks';
import UnitControl from '../../components/unit-control/index.js';
import { IconControl } from '../../components/icon-control';
import { OpenPanel } from '../../components/open-panel';
import { moreDesignOptions, ColorPickerControls } from './index.js';
import { HtmlAttributes } from '@components/html-attributes';

function ShapeOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		currentAtRule,
		name,
		attributes,
		setAttributes,
	} = props;

	const {
		html,
		htmlAttributes,
	} = attributes;

	if ( 'generateblocks/shape' !== name ) {
		return options;
	}

	return (
		<>
			<OpenPanel
				title={ __( 'Shape', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
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
					value={ getStyleValue( 'width', currentAtRule, 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'width', value, currentAtRule, 'svg' ) }
				/>

				<UnitControl
					id="height"
					label={ __( 'Height', 'generateblocks' ) }
					value={ getStyleValue( 'height', currentAtRule, 'svg' ) }
					onChange={ ( value ) => onStyleChange( 'height', value, currentAtRule, 'svg' ) }
				/>

				<ColorPickerControls
					items={ shapeColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
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
	'generateblocks/shapeOptions',
	ShapeOptions
);

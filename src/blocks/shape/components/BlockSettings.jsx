import { __ } from '@wordpress/i18n';

import ApplyFilters from '@components/apply-filters';
import { OpenPanel } from '@components/open-panel';
import { IconControl } from '@components/icon-control';
import { ColorPickerControls } from '@components/color-picker-group';
import { moreDesignOptions } from '@components/open-panel/utils';
import UnitControl from '@components/unit-control';
import { HtmlAttributes } from '@components/html-attributes';

export const shapeColorControls = [
	{
		label: 'Color',
		id: 'shape-color',
		items: [
			{
				tooltip: 'Color',
				value: 'color',
				selector: 'svg',
			},
		],
	},
];

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	currentAtRule,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
		html,
	} = attributes;

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
		</ApplyFilters>
	);
}

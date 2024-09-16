import { __ } from '@wordpress/i18n';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	IconControl,
	ColorPickerControls,
	UnitControl,
} from '@components/index.js';
import { moreDesignOptions } from '@utils';
import { useBlockStyles } from '@hooks/useBlockStyles';

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
	name,
	attributes,
	setAttributes,
} ) {
	const {
		html,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
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
				title={ __( 'Shape', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="shape"
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
				{ ...panelProps }
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
				panelId="design"
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
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="settings"
			/>
		</ApplyFilters>
	);
}

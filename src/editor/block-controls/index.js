import { __ } from '@wordpress/i18n';
import { ColorPicker } from '@edge22/components';
import DimensionsControl from '../../components/dimensions/index.js';
import { ColorPickerGroup } from '../../components/color-picker-group/ColorPickerGroup.jsx';
import './element.js';
import './image.js';
import './text.js';
import './shape.js';

export function Padding( { getStyleValue, onStyleChange, currentAtRule } ) {
	const paddingTop = getStyleValue( 'paddingTop', currentAtRule );
	const paddingRight = getStyleValue( 'paddingRight', currentAtRule );
	const paddingBottom = getStyleValue( 'paddingBottom', currentAtRule );
	const paddingLeft = getStyleValue( 'paddingLeft', currentAtRule );

	return (
		<DimensionsControl
			label={ __( 'Padding', 'generateblocks-pro' ) }
			attributeNames={ [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ] }
			values={ { paddingTop, paddingRight, paddingBottom, paddingLeft } }
			onChange={ ( values ) => Object.keys( values ).forEach( ( property ) => (
				onStyleChange( property, values[ property ], currentAtRule )
			) ) }
			placeholders={ {} }
		/>
	);
}

export const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel__styles-tab' )?.click(),
};

export function ColorPickerControls( { items, getStyleValue, onStyleChange, currentAtRule } ) {
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
									value={ getStyleValue( item.value, item.selector, currentAtRule ) }
									onChange={ ( value ) => onStyleChange( item.value, value, currentAtRule, item.selector ) }
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

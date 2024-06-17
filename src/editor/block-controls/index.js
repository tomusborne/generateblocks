import { __ } from '@wordpress/i18n';
import { ColorPicker } from '@edge22/components';
import DimensionsControl from '../../components/dimensions/index.js';
import { ColorPickerGroup } from '../../components/color-picker-group/ColorPickerGroup.jsx';
import './element.js';
import './image.js';
import './text.js';
import './shape.js';

export function Padding( { getStyleValue, onStyleChange } ) {
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

export const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel__styles-tab' )?.click(),
};

export function ColorPickerControls( { items, getStyleValue, onStyleChange } ) {
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

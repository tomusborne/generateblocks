import { ColorPickerGroup } from './ColorPickerGroup';
import { ColorPicker } from '@edge22/components';

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

import { BaseControl, useBaseControlProps } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { debounce } from '@wordpress/compose';
import { useCallback, useMemo, memo } from '@wordpress/element';

import { ColorPicker } from '@edge22/styles-builder';

import { getColorShortcuts } from './getColorShortcuts';
import './editor.scss';

export const ColorShortcuts = memo( function ColorShortcuts( {
	getStyleValue,
	currentAtRule,
	onStyleChange,
	attributes,
} ) {
	const { tagName, icon } = attributes;
	const colorShortcuts = useMemo( () => {
		return getColorShortcuts( { tagName, icon } );
	}, [ tagName, icon ] );

	const debouncedOnStyleChange = useCallback(
		debounce( ( property, value, atRule, nestedRule ) => {
			onStyleChange( property, value, atRule, nestedRule );
		}, 250 ),
		[ onStyleChange ]
	);

	const { baseControlProps } = useBaseControlProps( {
		label: __( 'Colors', 'generateblocks' ),
	} );

	return (
		<BaseControl { ...baseControlProps }>
			{ colorShortcuts.map( ( shortcut ) => {
				return (
					<div
						key={ shortcut.name }
						className="gb-color-shortcuts"
					>
						<div className="gb-color-shortcuts__label">
							{ shortcut.name }
						</div>
						{ shortcut.colors.map( ( color ) => {
							return (
								<ColorPicker
									key={ color.nestedRule }
									tooltip={ color.name }
									value={ getStyleValue( shortcut.property, currentAtRule, color.nestedRule ) }
									onChange={ ( value ) => {
										debouncedOnStyleChange( shortcut.property, value, currentAtRule, color.nestedRule );
									} }
								/>
							);
						} ) }
					</div>
				);
			} ) }
		</BaseControl>
	);
} );

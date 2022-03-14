/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ColorPicker from '../color-picker';
import './editor.scss';

export default function ColorGroup( props ) {
	const {
		setAttributes,
		attributes,
		colors,
	} = props;

	const colorItems = applyFilters(
		'generateblocks.editor.colorGroupItems',
		colors,
		props
	);

	return (
		<div className="gblocks-color-group">
			{
				colorItems.map( ( color, index ) => {
					return (
						<ColorPicker
							key={ index }
							label={ color.label }
							value={ attributes[ color.attribute ] }
							alpha={ color.alpha || false }
							valueOpacity={ attributes[ color.attribute + 'Opacity' ] }
							onChange={ ( nextBackgroundColor ) =>
								setAttributes( {
									[ color.attribute ]: nextBackgroundColor,
								} )
							}
							onOpacityChange={ ( value ) =>
								setAttributes( {
									[ color.attribute + 'Opacity' ]: value,
								} )
							}
						/>
					);
				} )
			}
		</div>
	);
}

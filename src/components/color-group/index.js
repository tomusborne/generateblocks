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
				colorItems.map( ( colorItem, index ) => {
					return (
						<div key={ index } className="gblocks-color-group__row">
							{ !! colorItem.label &&
								<span className="gblocks-color-group__row-label">{ colorItem.label }</span>
							}

							{ colorItem.items.map( ( color, colorIndex ) => {
								return (
									<ColorPicker
										key={ colorIndex }
										label={ color?.label }
										tooltip={ color?.tooltip }
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
							} ) }
						</div>
					);
				} )
			}
		</div>
	);
}

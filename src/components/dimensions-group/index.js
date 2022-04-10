/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import DimensionsControl from '../dimensions';

export default function DimensionsGroup( props ) {
	const {
		dimensions,
		deviceType,
	} = props;

	const dimensionItems = applyFilters(
		'generateblocks.editor.dimensionGroupItems',
		dimensions,
		props
	);

	return (
		<>
			{
				dimensionItems.map( ( item, index ) => {
					return (
						<DimensionsControl
							{ ...props }
							key={ index }
							device={ deviceType }
							type={ item.type }
							label={ item.label }
							units={ item.units }
							computedStyles={ item.computedStyles }
						/>
					);
				} )
			}
		</>
	);
}

/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import DimensionsControl from '../dimensions';
import useDeviceAttributes from '../../hooks/useDeviceAttributes';
import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';

export default function DimensionsGroup( props ) {
	const {
		dimensions,
		deviceType,
		computedStyles,
		attributes,
		setAttributes,
	} = props;

	const dimensionItems = applyFilters(
		'generateblocks.editor.dimensionGroupItems',
		dimensions,
		props
	);

	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );

	return (
		<>
			{
				dimensionItems.map( ( item, index ) => {
					return (
						<DimensionsControl
							key={ index }
							label={ item.label }
							units={ item.units }
							attributeNames={ item.attributes }
							values={ item.attributes.reduce( ( o, key ) => ( { ...o, [ key ]: deviceAttributes[ key ] } ), {} ) }
							placeholders={ item.attributes.reduce( ( o, key ) => (
								{ ...o, [ key ]: getResponsivePlaceholder( key, attributes, deviceType, key.includes( 'margin' ) ? computedStyles[ key ] : '' ) }
							), {} ) }
							onChange={ ( values ) => setDeviceAttributes( values ) }
						/>
					);
				} )
			}
		</>
	);
}

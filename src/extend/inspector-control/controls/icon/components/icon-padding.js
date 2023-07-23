import { __ } from '@wordpress/i18n';
import DimensionsControl from '../../../../../components/dimensions';
import getDeviceType from '../../../../../utils/get-device-type';
import useDeviceAttributes from '../../../../../hooks/useDeviceAttributes';
import getResponsivePlaceholder from '../../../../../utils/get-responsive-placeholder';

export default function IconPadding( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const attributeNames = [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ];

	return (
		<DimensionsControl
			label={ __( 'Padding', 'generateblocks' ) }
			attributeNames={ attributeNames }
			values={ deviceAttributes.iconStyles }
			placeholders={ attributeNames.reduce( ( o, key ) => (
				{ ...o, [ key ]: getResponsivePlaceholder( key, attributes.iconStyles, device, '' ) }
			), {} ) }
			onChange={ ( newAttributes ) => setDeviceAttributes( newAttributes, 'iconStyles' ) }
		/>
	);
}

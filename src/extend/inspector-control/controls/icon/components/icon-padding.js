import { __ } from '@wordpress/i18n';
import DimensionsControl from '../../../../../components/dimensions';
import getDeviceType from '../../../../../utils/get-device-type';
import useDeviceAttributes from '../../../../../hooks/useDeviceAttributes';
import getResponsivePlaceholder from '../../../../../utils/get-responsive-placeholder';

export default function IconPadding( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const attributeNames = [ 'iconPaddingTop', 'iconPaddingRight', 'iconPaddingBottom', 'iconPaddingLeft' ];

	return (
		<DimensionsControl
			label={ __( 'Padding', 'generateblocks' ) }
			attributeNames={ attributeNames }
			values={ attributeNames.reduce( ( o, key ) => ( { ...o, [ key ]: deviceAttributes[ key ] } ), {} ) }
			placeholders={ attributeNames.reduce( ( o, key ) => (
				{ ...o, [ key ]: getResponsivePlaceholder( key, attributes, device, '' ) }
			), {} ) }
			onChange={ ( values ) => setDeviceAttributes( values ) }
		/>
	);
}

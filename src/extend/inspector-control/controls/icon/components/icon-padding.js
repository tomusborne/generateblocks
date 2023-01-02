import { __ } from '@wordpress/i18n';
import DimensionsControl from '../../../../../components/dimensions';
import getDeviceType from '../../../../../utils/get-device-type';

export default function IconPadding( { attributes, setAttributes } ) {
	const device = getDeviceType();

	return (
		<DimensionsControl
			attributes={ attributes }
			setAttributes={ setAttributes }
			type={ 'iconPadding' }
			label={ __( 'Padding', 'generateblocks' ) }
			units={ [ 'px', 'em', '%' ] }
			device={ device }
		/>
	);
}

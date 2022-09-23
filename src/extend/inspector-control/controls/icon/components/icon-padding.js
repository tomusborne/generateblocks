import { __ } from '@wordpress/i18n';
import DimensionsControl from '../../../../../components/dimensions';
import { useDeviceType } from '../../../../../hooks';

export default function IconPadding( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();

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

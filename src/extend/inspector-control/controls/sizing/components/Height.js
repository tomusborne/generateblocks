import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Height( props ) {
	return (
		<UnitControl
			label={ __( 'Height', 'generateblocks' ) }
			id="gblocks-height"
			units={ [ 'px', '%', 'vw', 'rem' ] }
			{ ...props }
		/>
	);
}

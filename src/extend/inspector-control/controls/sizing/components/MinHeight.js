import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( props ) {
	return (
		<UnitControl
			label={ __( 'Min Height', 'generateblocks' ) }
			id="gblocks-min-height"
			units={ [ 'px', 'vh', 'vw' ] }
			{ ...props }
		/>
	);
}

import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinWidth( props ) {
	return (
		<UnitControl
			label={ __( 'Min Width', 'generateblocks' ) }
			id="gblocks-min-width"
			units={ [ 'px', 'vh', 'vw' ] }
			{ ...props }
		/>
	);
}

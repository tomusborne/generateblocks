import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Width( props ) {
	return (
		<UnitControl
			label={ __( 'Width', 'generateblocks' ) }
			id="gblocks-width"
			units={ [ 'px', '%', 'vw', 'rem' ] }
			{ ...props }
		/>
	);
}

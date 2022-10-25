import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( props ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
				units={ [ 'px', '%', 'vw', 'rem' ] }
				{ ...props }
			/>
		</>
	);
}

import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxHeight( props ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Height', 'generateblocks' ) }
				id="gblocks-max-height"
				units={ [ 'px', '%', 'vw', 'rem' ] }
				{ ...props }
			/>
		</>
	);
}

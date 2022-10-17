import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Width( props ) {
	const {
		value,
		desktopValue,
		tabletValue,
		onChange,
	} = props;

	return (
		<UnitControl
			label={ __( 'Width', 'generateblocks' ) }
			id="gblocks-width"
			units={ [ 'px', '%', 'vw', 'rem' ] }
			value={ value }
			desktopValue={ desktopValue }
			tabletValue={ tabletValue }
			onChange={ onChange }
		/>
	);
}

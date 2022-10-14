import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( { useGlobalContainerWidth, value, desktopValue, tabletValue, onChange, disabled } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
				units={ [ 'px', '%', 'vw', 'rem' ] }
				overrideValue={ !! useGlobalContainerWidth ? generateBlocksInfo.globalContainerWidth : null }
				disabled={ disabled }
				value={ value }
				desktopValue={ desktopValue }
				tabletValue={ tabletValue }
				onChange={ onChange }
			/>
		</>
	);
}

import PanelArea from '../../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import ColorGroup from '../../../../components/color-group';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';

export default function Colors( { attributes, setAttributes } ) {
	const { supports: { colors } } = useContext( ControlsContext );

	return (
		<PanelArea
			title={ __( 'Colors', 'generateblocks' ) }
			initialOpen={ true }
			icon={ getIcon( 'colors' ) }
			className="gblocks-panel-label"
			id="headlineColors"
		>
			<ColorGroup
				attributes={ attributes }
				setAttributes={ setAttributes }
				colors={ colors.elements }
			/>
		</PanelArea>
	);
}

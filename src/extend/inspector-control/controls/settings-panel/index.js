import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';

export default function SettingsPanel( { children } ) {
	const { id, supports: { settingsPanel } } = useContext( ControlsContext );

	return (
		<PanelArea
			title={ settingsPanel.label }
			initialOpen={ false }
			icon={ getIcon( settingsPanel.icon ) }
			className="gblocks-panel-label"
			id={ `${ id }Settings` }
		>
			{ children }
		</PanelArea>
	);
}

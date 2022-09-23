import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import DimensionsGroup from '../../../../components/dimensions-group';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import InlineWidth from './components/inline-width';

export default function Spacing( { attributes, setAttributes, computedStyles } ) {
	const [ device ] = useDeviceType();
	const { supports: { spacing } } = useContext( ControlsContext );
	const { inlineWidth, inlineWidthTablet, inlineWidthMobile } = attributes;

	return (
		<PanelArea
			title={ __( 'Spacing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className="gblocks-panel-label"
			id="headlineSpacing"
		>
			<DimensionsGroup
				deviceType={ device }
				attributes={ attributes }
				setAttributes={ setAttributes }
				computedStyles={ computedStyles }
				dimensions={ spacing.dimensions }
			/>

			{ 'Desktop' === device &&
				<InlineWidth
					checked={ !! inlineWidth }
					onChange={ ( checked ) => setAttributes( { inlineWidth: checked } ) }
				/>
			}

			{ 'Tablet' === device &&
				<InlineWidth
					checked={ !! inlineWidthTablet }
					onChange={ ( checked ) => setAttributes( { inlineWidthTablet: checked } ) }
				/>
			}

			{ 'Mobile' === device &&
				<InlineWidth
					checked={ !! inlineWidthMobile }
					onChange={ ( checked ) => setAttributes( { inlineWidthMobile: checked } ) }
				/>
			}
		</PanelArea>
	);
}

import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import FlexControls from './components/FlexControls';
import hasNumericValue from '../../../../utils/has-numeric-value';
import { TextControl } from '@wordpress/components';
import getDeviceType from '../../../../utils/get-device-type';

export default function FlexChild( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const { id, supports: { flexChildPanel } } = useContext( ControlsContext );

	const componentProps = {
		attributes,
		deviceType: device,
	};

	const {
		useInnerContainer,
		isGrid,
	} = attributes;

	return (
		<PanelArea
			title={ __( 'Flex Child', 'generateblocks' ) }
			initialOpen={ false }
			className="gblocks-panel-label"
			id={ `${ id }FlexChild` }
		>
			{ flexChildPanel.flex && ( ! useInnerContainer || ( useInnerContainer && isGrid ) ) &&
				<FlexControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}

			{ flexChildPanel.order && ( ! useInnerContainer || ( useInnerContainer && isGrid ) ) &&
				<TextControl
					type={ 'number' }
					label={ __( 'Order', 'generateblocks' ) }
					value={ hasNumericValue( getAttribute( 'order', componentProps ) ) ? getAttribute( 'order', componentProps ) : '' }
					placeholder={ getResponsivePlaceholder( 'order', attributes, device ) }
					onChange={ ( value ) => {
						setAttributes( {
							[ getAttribute( 'order', componentProps, true ) ]: parseFloat( value ),
						} );
					} }
				/>
			}
		</PanelArea>
	);
}

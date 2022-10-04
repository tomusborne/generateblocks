import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import GradientControl from '../../../../components/gradient';
import PanelArea from '../../../../components/panel-area';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';

export default function BackgroundGradient( { attributes, setAttributes } ) {
	const { id } = useContext( ControlsContext );

	return (
		<PanelArea
			title={ __( 'Background Gradient', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'gradients' ) }
			className={ 'gblocks-panel-label' }
			id={ `${ id }BackgroundGradient` }
		>
			<GradientControl
				attributes={ attributes }
				setAttributes={ setAttributes }
				attrGradient={ 'gradient' }
				attrGradientDirection={ 'gradientDirection' }
				attrGradientColorOne={ 'gradientColorOne' }
				attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
				attrGradientColorStopOne={ 'gradientColorStopOne' }
				attrGradientColorTwo={ 'gradientColorTwo' }
				attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
				attrGradientColorStopTwo={ 'gradientColorStopTwo' }
				defaultColorOne={ generateBlocksDefaults.button.gradientColorOne }
				defaultColorTwo={ generateBlocksDefaults.button.gradientColorTwo }
			/>
		</PanelArea>
	);
}

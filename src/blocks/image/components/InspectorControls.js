import { InspectorControls } from '@wordpress/block-editor';
import PanelArea from '../../../components/panel-area';
import DimensionsGroup from '../../../components/dimensions-group';
import ColorGroup from '../../../components/color-group';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import ImageSettingsControls from './inspector-controls/ImageSettingsControl';

export default function ImageInspectorControls( props ) {
	const {
		state,
		deviceType,
	} = props;

	return (
		<InspectorControls>
			<ImageSettingsControls { ...props } />

			<PanelArea
				{ ...props }
				title={ __( 'Spacing', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'spacing' ) }
				className={ 'gblocks-panel-label' }
				id={ 'imageSpacing' }
				state={ state }
			>
				<DimensionsGroup
					{ ...props }
					deviceType={ deviceType }
					dimensions={
						[
							{
								type: 'padding',
								label: __( 'Padding', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
							{
								type: 'margin',
								label: __( 'Margin', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
							{
								type: 'borderSize',
								label: __( 'Border Size', 'generateblocks' ),
								units: [ 'px' ],
							},
							{
								type: 'borderRadius',
								label: __( 'Border Radius', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
						]
					}
				/>
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Colors', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'colors' ) }
				className={ 'gblocks-panel-label' }
				id={ 'imageColors' }
				state={ state }
			>
				<ColorGroup
					{ ...props }
					colors={
						[
							{
								group: 'border',
								label: __( 'Border', 'generateblocks' ),
								items: [
									{
										attribute: 'borderColor',
										alpha: true,
									},
								],
							},
						]
					}
				/>
			</PanelArea>
		</InspectorControls>
	);
}

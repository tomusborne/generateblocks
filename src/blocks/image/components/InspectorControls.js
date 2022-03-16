import { InspectorControls } from '@wordpress/block-editor';
import MediaUploadControl from '../../../components/media-upload-control';
import PanelArea from '../../../components/panel-area';
import DimensionsGroup from '../../../components/dimensions-group';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';

export default function ImageInspectorControls( props ) {
	const {
		attributes,
		setAttributes,
		state,
		deviceType,
	} = props;

	return (
		<InspectorControls>
			<MediaUploadControl
				url={ attributes.url }
				id={ attributes.mediaId }
				onSelect={ ( media ) => {
					setAttributes( {
						mediaId: media?.id,
						url: media?.url,
					} );
				} }
				onChange={ ( newUrl ) => {
					setAttributes( { url: newUrl } );
				} }
				onClose={ () => {} }
			/>

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
		</InspectorControls>
	);
}

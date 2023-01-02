import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import DimensionsGroup from '../../../../components/dimensions-group';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import DeviceControls from './components/device-controls';
import getDeviceType from '../../../../utils/get-device-type';

export default function Spacing( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { id, supports: { spacing } } = useContext( ControlsContext );
	const {
		inlineWidth,
		inlineWidthTablet,
		inlineWidthMobile,
		stack,
		stackTablet,
		stackMobile,
		fillHorizontalSpace,
		fillHorizontalSpaceTablet,
		fillHorizontalSpaceMobile,
	} = attributes;

	return (
		<PanelArea
			title={ __( 'Spacing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className="gblocks-panel-label"
			id={ `${ id }Spacing` }
		>
			{ spacing.dimensions &&
				<DimensionsGroup
					deviceType={ device }
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
					dimensions={ spacing.dimensions }
				/>
			}

			{ 'Desktop' === device &&
				<>
					<DeviceControls
						inlineWidth={ !! inlineWidth }
						onChangeInlineWidth={ ( checked ) => setAttributes( { inlineWidth: checked } ) }
						stack={ !! stack }
						onChangeStack={ ( value ) => {
							setAttributes( {
								stack: value,
								stackTablet: !! value && ! stackTablet ? value : stackTablet,
								stackMobile: !! value && ! stackMobile ? value : stackMobile,
							} );
						} }
						fill={ !! fillHorizontalSpace }
						onFillChange={ ( value ) => {
							setAttributes( {
								fillHorizontalSpace: value,
								fillHorizontalSpaceTablet: !! value && ! fillHorizontalSpaceTablet ? value : fillHorizontalSpaceTablet,
								fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
							} );
						} }
					/>
				</>
			}

			{ 'Tablet' === device &&
				<>
					<DeviceControls
						inlineWidth={ !! inlineWidthTablet }
						onChangeInlineWidth={ ( checked ) => setAttributes( { inlineWidthTablet: checked } ) }
						stack={ !! stackTablet }
						onChangeStack={ ( value ) => {
							setAttributes( {
								stackTablet: value,
								stackMobile: !! value && ! stackMobile ? value : stackMobile,
							} );
						} }
						fill={ !! fillHorizontalSpaceTablet }
						onFillChange={ ( value ) => {
							setAttributes( {
								fillHorizontalSpaceTablet: value,
								fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
							} );
						} }
					/>
				</>
			}

			{ 'Mobile' === device &&
				<>
					<DeviceControls
						inlineWidth={ !! inlineWidthMobile }
						onChangeInlineWidth={ ( checked ) => setAttributes( { inlineWidthMobile: checked } ) }
						stack={ !! stackMobile }
						onChangeStack={ ( value ) => setAttributes( { stackMobile: value } ) }
						fill={ !! fillHorizontalSpaceMobile }
						onFillChange={ ( value ) => setAttributes( { fillHorizontalSpaceMobile: value } ) }
					/>
				</>
			}
		</PanelArea>
	);
}

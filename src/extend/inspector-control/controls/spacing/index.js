import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import DimensionsGroup from '../../../../components/dimensions-group';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import DeviceControls from './components/device-controls';
import MinimumHeight from './components/minimum-height';
import VerticalAlignment from './components/vertical-alignment';
import ZIndex from './components/z-index';

export default function Spacing( { attributes, setAttributes, computedStyles } ) {
	const [ device ] = useDeviceType();
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
		minHeight,
		minHeightUnit,
		verticalAlignment,
		minHeightTablet,
		minHeightUnitTablet,
		verticalAlignmentTablet,
		minHeightMobile,
		minHeightUnitMobile,
		verticalAlignmentMobile,
		zindex,
		innerZindex,
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

					{ spacing.minimumHeight &&
						<>
							<MinimumHeight
								value={ minHeight }
								onChange={ ( value ) => setAttributes( { minHeight: parseFloat( value ) } ) }
								unitValue={ minHeightUnit }
								onChangeUnit={ ( value ) => setAttributes( { minHeightUnit: value } ) }
							/>

							{ !! minHeight && spacing.verticalAlignment &&
								<VerticalAlignment
									value={ verticalAlignment }
									onChange={ ( value ) => setAttributes( { verticalAlignment: value } ) }
								/>
							}
						</>
					}

					{ spacing.zIndex &&
						<ZIndex
							label={ spacing.innerZIndex && __( 'Outer z-index', 'generateblocks' ) }
							value={ zindex }
							onChange={ ( value ) => setAttributes( { zindex: value } ) }
						/>
					}

					{ spacing.innerZIndex &&
						<ZIndex
							label={ __( 'Inner z-index', 'generateblocks' ) }
							value={ innerZindex }
							onChange={ ( value ) => setAttributes( { innerZindex: value } ) }
						/>
					}
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

					{ spacing.minimumHeight &&
						<>
							<MinimumHeight
								value={ minHeightTablet }
								onChange={ ( value ) => setAttributes( { minHeightTablet: parseFloat( value ) } ) }
								unitValue={ minHeightUnitTablet }
								onChangeUnit={ ( value ) => setAttributes( { minHeightUnitTablet: value } ) }
							/>

							{ ( !! minHeight || !! minHeightTablet ) && spacing.verticalAlignment &&
								<VerticalAlignment
									value={ verticalAlignmentTablet }
									onChange={ ( value ) => setAttributes( { verticalAlignmentTablet: value } ) }
								/>
							}
						</>
					}
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

					{ spacing.minimumHeight &&
						<>
							<MinimumHeight
								value={ minHeightMobile }
								onChange={ ( value ) => setAttributes( { minHeightMobile: parseFloat( value ) } ) }
								unitValue={ minHeightUnitMobile }
								onChangeUnit={ ( value ) => setAttributes( { minHeightUnitMobile: value } ) }
							/>

							{ ( !! minHeight || !! minHeightTablet || !! minHeightMobile ) && spacing.verticalAlignment &&
								<VerticalAlignment
									value={ verticalAlignmentMobile }
									onChange={ ( value ) => setAttributes( { verticalAlignmentMobile: value } ) }
								/>
							}
						</>
					}
				</>
			}
		</PanelArea>
	);
}

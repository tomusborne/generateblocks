import { __ } from '@wordpress/i18n';
import { useContext, useRef, useState, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import ControlsContext from '../../../../block-context';
import DeviceControls from './components/device-controls';
import getDeviceType from '../../../../utils/get-device-type';
import useDeviceAttributes from '../../../../hooks/useDeviceAttributes';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import DimensionsControl from '../../../../components/dimensions';
import { useStyleIndicator } from '../../../../hooks';
import { getContentAttribute } from '../../../../utils/get-content-attribute';

export default function Spacing( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { blockName, supports: { spacing } } = useContext( ControlsContext );
	const contentValue = getContentAttribute( attributes, blockName );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const panelRef = useRef( null );
	const panelControls = useState( {
		margin: false,
		padding: false,
	} );
	const {
		dispatchControlGlobalStyle,
		styleSources,
		hasGlobalStyle,
		contentWasUpdated,
	} = useStyleIndicator( computedStyles, panelControls, contentValue );

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

	const paddingAttributes = [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ];
	const marginAttributes = [ 'marginTop', 'marginLeft', 'marginRight', 'marginBottom' ];

	function getLabel( defaultLabel, property, value ) {
		return applyFilters(
			'generateblocks.editor.control.label',
			defaultLabel,
			property,
			value,
			styleSources,
			dispatchControlGlobalStyle,
			contentWasUpdated,
		);
	}

	const {
		marginTop = '',
		marginBottom = '',
		marginLeft = '',
		marginRight = '',
		paddingTop = '',
		paddingBottom = '',
		paddingLeft = '',
		paddingRight = '',
	} = deviceAttributes.spacing;

	const labels = {
		padding: getLabel(
			__( 'Padding', 'generateblocks' ),
			'padding',
			paddingTop,
		),
		margin: getLabel(
			__( 'Margin', 'generateblocks' ),
			'margin',
			marginTop,
		),
	};

	console.log( { styleSources } );

	return (
		<PanelArea
			title={ __( 'Spacing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className="gblocks-panel-label"
			id="spacing"
			ref={ panelRef }
			hasGlobalStyle={ hasGlobalStyle }
		>
			{ spacing.padding &&
				<DimensionsControl
					label={ labels.padding }
					attributeNames={ paddingAttributes }
					values={ deviceAttributes.spacing }
					placeholders={ paddingAttributes.reduce( ( o, key ) => (
						{ ...o, [ key ]: getResponsivePlaceholder( key, attributes.spacing, device, '' ) }
					), {} ) }
					onChange={ ( values ) => setDeviceAttributes( values, 'spacing' ) }
				/>
			}
			{ spacing.margin &&
				<DimensionsControl
					label={ __( 'Margin', 'generateblocks' ) }
					attributeNames={ marginAttributes }
					values={ deviceAttributes.spacing }
					placeholders={ marginAttributes.reduce( ( o, key ) => (
						{ ...o, [ key ]: getResponsivePlaceholder(
							key,
							attributes.spacing,
							device,
							parseInt( computedStyles[ key ] ) || ''
						) }
					), {} ) }
					onChange={ ( values ) => setDeviceAttributes( values, 'spacing' ) }
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

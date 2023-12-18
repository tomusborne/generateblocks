import { __ } from '@wordpress/i18n';
import { useContext, useRef } from '@wordpress/element';
import { Tooltip, Button } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import ControlsContext from '../../../../block-context';
import MinHeight from './components/MinHeight';
import getAttribute from '../../../../utils/get-attribute';
import Width from './components/Width';
import MaxWidth from './components/MaxWidth';
import Height from './components/Height';
import MinWidth from './components/MinWidth';
import MaxHeight from './components/MaxHeight';
import './editor.scss';
import getDeviceType from '../../../../utils/get-device-type';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import { useStyleIndicator, useDeviceAttributes } from '../../../../hooks';
import { getContentAttribute } from '../../../../utils/get-content-attribute';

export default function Sizing( { attributes, setAttributes, computedStyles } ) {
	const { id, blockName, supports: { sizingPanel } } = useContext( ControlsContext );
	const device = getDeviceType();
	const panelRef = useRef( null );
	const contentValue = getContentAttribute( attributes, blockName );
	const [ deviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const panelControls = {
		width: false,
		height: false,
		minWidth: false,
		minHeight: false,
		maxWidth: false,
		maxHeight: false,
	};
	const {
		dispatchControlGlobalStyle,
		styleSources,
		hasGlobalStyle,
		contentWasUpdated,
	} = useStyleIndicator( computedStyles, panelControls, contentValue, deviceAttributes );

	const {
		useGlobalMaxWidth = false,
		useInnerContainer = false,
		isGrid = false,
		sizing,
	} = attributes;

	function getValue( name ) {
		return sizing && sizing[ getAttribute( name, { attributes, deviceType: device }, true ) ]
			? sizing[ getAttribute( name, { attributes, deviceType: device }, true ) ]
			: '';
	}

	function getLabel( defaultLabel, rules ) {
		return applyFilters(
			'generateblocks.editor.control.label',
			defaultLabel,
			rules,
			styleSources,
			dispatchControlGlobalStyle,
			contentWasUpdated,
		);
	}

	const labels = {
		width: getLabel(
			__( 'Width', 'generateblocks' ),
			{
				width: getValue( 'width' ),
			},
		),
		height: getLabel(
			__( 'Height', 'generateblocks' ),
			{
				height: getValue( 'height' ),
			},
		),
		minWidth: getLabel(
			__( 'Min Width', 'generateblocks' ),
			{
				minWidth: getValue( 'minWidth' ),
			},
		),
		minHeight: getLabel(
			__( 'Min Height', 'generateblocks' ),
			{
				minHeight: getValue( 'minHeight' ),
			},
		),
		maxWidth: getLabel(
			__( 'Max Width', 'generateblocks' ),
			{
				maxWidth: getValue( 'maxWidth' ),
			},
		),
		maxHeight: getLabel(
			__( 'Max Height', 'generateblocks' ),
			{
				maxHeight: getValue( 'maxHeight' ),
			},
		),
	};

	return (
		<PanelArea
			title={ __( 'Sizing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'sizing' ) }
			className="gblocks-panel-label"
			id={ `${ id }Sizing` }
			ref={ panelRef }
			hasGlobalStyle={ hasGlobalStyle }
		>
			<div className="gblocks-sizing-fields">
				{ sizingPanel.width &&
					<Width
						label={ labels.width }
						value={ getValue( 'width' ) }
						placeholder={ getResponsivePlaceholder( 'width', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'width', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.height &&
					<Height
						label={ labels.height }
						value={ getValue( 'height' ) }
						placeholder={ getResponsivePlaceholder( 'height', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'height', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minWidth &&
					<MinWidth
						label={ labels.minWidth }
						value={ getValue( 'minWidth' ) }
						placeholder={ getResponsivePlaceholder( 'minWidth', attributes.sizing, device ) }
						disabled={ isGrid }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'minWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minHeight &&
					<MinHeight
						label={ labels.minHeight }
						value={ getValue( 'minHeight' ) }
						placeholder={ getResponsivePlaceholder( 'minHeight', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'minHeight', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.maxWidth &&
					<MaxWidth
						label={ labels.maxWidth }
						value={ getValue( 'maxWidth' ) }
						placeholder={ getResponsivePlaceholder( 'maxWidth', attributes.sizing, device ) }
						overrideValue={ !! useGlobalMaxWidth ? generateBlocksInfo.globalContainerWidth : null }
						disabled={ useInnerContainer || isGrid || ( useGlobalMaxWidth && 'Desktop' === device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'maxWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
						overrideAction={ () => {
							if ( ! sizingPanel.useGlobalMaxWidth || useInnerContainer || isGrid || 'Desktop' !== device || getValue( 'maxWidth' ) ) {
								return null;
							}

							return (
								<Tooltip text={ __( 'Use global max-width', 'generateblocks' ) }>
									<Button
										icon={ getIcon( 'globe' ) }
										variant={ !! useGlobalMaxWidth ? 'primary' : '' }
										onClick={ () => {
											setAttributes( {
												useGlobalMaxWidth: useGlobalMaxWidth ? false : true,
											} );
										} }
									/>
								</Tooltip>
							);
						} }
					/>
				}

				{ sizingPanel.maxHeight &&
					<MaxHeight
						label={ labels.maxHeight }
						value={ getValue( 'maxHeight' ) }
						placeholder={ getResponsivePlaceholder( 'maxHeight', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'maxHeight', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}
			</div>
		</PanelArea>
	);
}

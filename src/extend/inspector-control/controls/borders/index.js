import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext, useState } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import getDeviceType from '../../../../utils/get-device-type';
import useDeviceAttributes from '../../../../hooks/useDeviceAttributes';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import DimensionsControl from '../../../../components/dimensions';
import { BaseControl, Tooltip, Button } from '@wordpress/components';
import FlexControl from '../../../../components/flex-control';
import UnitControl from '../../../../components/unit-control';
import './editor.scss';
import ColorPicker from '../../../../components/color-picker';
import StyleDropdown from './components/style-dropdown';
import getAttribute from '../../../../utils/get-attribute';
import { link, linkOff } from '@wordpress/icons';

export default function Borders( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const { id, supports: { borders: bordersPanel } } = useContext( ControlsContext );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes.borders, setAttributes );
	const borderRadiusAttributes = [ 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius' ];
	const borderLabels = {
		borderTop: __( 'Top', 'generateblocks' ),
		borderRight: __( 'Right', 'generateblocks' ),
		borderBottom: __( 'Bottom', 'generateblocks' ),
		borderLeft: __( 'Left', 'generateblocks' ),
	};
	const [ borderAreas, setBorderAreas ] = useState( [ 'borderTop', 'borderRight', 'borderBottom', 'borderLeft' ] );
	const [ sync, setSync ] = useState( false );

	function getValue( name ) {
		return attributes.borders && attributes.borders[ getAttribute( name, { attributes: attributes.borders, deviceType: device }, true ) ]
			? attributes.borders[ getAttribute( name, { attributes: attributes.borders, deviceType: device }, true ) ]
			: '';
	}

	function getAttributeName( name ) {
		return getAttribute( name, { attributes: attributes.borders, deviceType: device }, true );
	}

	return (
		<PanelArea
			title={ __( 'Borders', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className="gblocks-panel-label"
			id={ `${ id }Borders` }
		>
			{ ( bordersPanel.borderTop || bordersPanel.borderRight || bordersPanel.borderBottom || bordersPanel.borderLeft ) &&
				<BaseControl
					label={ __( 'Border', 'generateblocks' ) }
					id={ 'gblocks-borderTop-width' }
					className="gblocks-border-row"
				>
					<Tooltip text={ !! sync ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) } >
						<Button
							className="components-gblocks-dimensions-control_sync"
							aria-label={ !! sync ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) }
							variant={ !! sync ? 'primary' : '' }
							aria-pressed={ !! sync }
							onClick={ () => {
								if ( ! sync ) {
									setBorderAreas( [ 'borderTop' ] );
									setSync( true );
								} else {
									setBorderAreas( [ 'borderTop', 'borderRight', 'borderBottom', 'borderLeft' ] );
									setSync( false );
								}
							} }
							isSmall
						>
							{ !! sync ? link : linkOff }
						</Button>
					</Tooltip>

					{ borderAreas.map( ( borderArea ) => {
						if ( ! bordersPanel[ borderArea ] ) {
							return null;
						}

						const iconBorderStyle = !! sync
							? 'borderAll'
							: borderArea;

						return (
							<FlexControl key={ borderArea }>
								<Tooltip text={ borderLabels[ borderArea ] }>
									<div className={ 'gblocks-border-icon ' + iconBorderStyle } style={ { 'border-style': attributes.borders[ borderArea + 'Style' ] } }></div>
								</Tooltip>

								<UnitControl
									id={ 'gblocks-' + borderArea + '-width' }
									value={ getValue( borderArea + 'Width' ) }
									placeholder={ getResponsivePlaceholder( borderArea + 'Width', attributes.borders, device ) }
									onChange={ ( value ) => {
										const newAttributes = {
											[ getAttributeName( borderArea + 'Width' ) ]: value,
										};

										if ( sync ) {
											newAttributes[ getAttributeName( 'borderRightWidth' ) ] = value;
											newAttributes[ getAttributeName( 'borderBottomWidth' ) ] = value;
											newAttributes[ getAttributeName( 'borderLeftWidth' ) ] = value;
										}

										if ( ! value ) {
											newAttributes[ getAttributeName( borderArea + 'Style' ) ] = '';

											if ( sync ) {
												newAttributes[ getAttributeName( 'borderRightStyle' ) ] = '';
												newAttributes[ getAttributeName( 'borderBottomStyle' ) ] = '';
												newAttributes[ getAttributeName( 'borderLeftStyle' ) ] = '';
											}
										} else if ( ! attributes.borders[ borderArea + 'Style' ] ) {
											newAttributes[ getAttributeName( borderArea + 'Style' ) ] = 'solid';

											if ( sync ) {
												newAttributes[ getAttributeName( 'borderRightStyle' ) ] = 'solid';
												newAttributes[ getAttributeName( 'borderBottomStyle' ) ] = 'solid';
												newAttributes[ getAttributeName( 'borderLeftStyle' ) ] = 'solid';
											}
										}

										setAttributes( {
											borders: {
												...attributes.borders,
												...newAttributes,
											},
										} );
									} }
								/>

								<StyleDropdown
									value={ getValue( borderArea + 'Style' ) || getResponsivePlaceholder( borderArea + 'Style', attributes.borders, device ) }
									onChange={ ( value ) => {
										const newAttributes = {
											[ getAttribute( borderArea + 'Style', { attributes, deviceType: device }, true ) ]: value,
										};

										if ( sync ) {
											newAttributes[ getAttributeName( 'borderRightStyle' ) ] = value;
											newAttributes[ getAttributeName( 'borderBottomStyle' ) ] = value;
											newAttributes[ getAttributeName( 'borderLeftStyle' ) ] = value;
										}

										setAttributes( {
											borders: {
												...attributes.borders,
												...newAttributes,
											},
										} );
									} }
								/>

								{ !! bordersPanel.borderColors.length && 'Desktop' === device && ! attributes.borderColor && ! attributes.borderColorHover && ! attributes.borderColorCurrent &&
									<div className="gblocks-border-colors">
										{ bordersPanel.borderColors.map( ( borderColor, index ) => {
											return (
												<ColorPicker
													key={ 'border' + index }
													tooltip={ borderColor?.tooltip }
													value={ attributes.borders[ borderArea + 'Color' + borderColor.state ] || '' }
													alpha={ borderColor.alpha || false }
													onChange={ ( nextBackgroundColor ) => {
														const newAttributes = {
															[ borderArea + 'Color' + borderColor.state ]: nextBackgroundColor,
														};

														if ( sync ) {
															newAttributes[ getAttributeName( 'borderRightColor' ) ] = nextBackgroundColor;
															newAttributes[ getAttributeName( 'borderBottomColor' ) ] = nextBackgroundColor;
															newAttributes[ getAttributeName( 'borderLeftColor' ) ] = nextBackgroundColor;
														}

														setAttributes( {
															borders: {
																...attributes.borders,
																...newAttributes,
															},
														} );
													} }
												/>
											);
										} ) }
									</div>
								}
							</FlexControl>
						);
					} ) }
				</BaseControl>
			}

			{ bordersPanel.borderRadius &&
				<DimensionsControl
					label={ __( 'Border Radius', 'generateblocks' ) }
					attributeNames={ borderRadiusAttributes }
					values={ deviceAttributes }
					placeholders={ borderRadiusAttributes.reduce( ( o, key ) => (
						{ ...o, [ key ]: getResponsivePlaceholder( key, attributes.borders, device, '' ) }
					), {} ) }
					onChange={ ( values ) => setDeviceAttributes( {
						borders: {
							...attributes.borders,
							...values,
						},
					} ) }
				/>
			}
		</PanelArea>
	);
}

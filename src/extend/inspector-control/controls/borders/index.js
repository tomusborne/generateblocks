import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext, useState, useEffect } from '@wordpress/element';
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
import { link, linkOff } from '@wordpress/icons';
import isNumeric from '../../../../utils/is-numeric';
import { isEqual, isEmpty } from 'lodash';

export default function Borders( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const { id, supports: { borders: bordersPanel } } = useContext( ControlsContext );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const borderRadiusAttributes = [ 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius' ];
	const borderAreas = [ 'borderTop', 'borderRight', 'borderBottom', 'borderLeft' ];
	const borderLabels = {
		borderTop: __( 'Top', 'generateblocks' ),
		borderRight: __( 'Right', 'generateblocks' ),
		borderBottom: __( 'Bottom', 'generateblocks' ),
		borderLeft: __( 'Left', 'generateblocks' ),
	};
	const [ sync, setSync ] = useState( false );

	useEffect( () => {
		const allValues = borderAreas.map( ( area ) => {
			return Object.entries( deviceAttributes.borders ).reduce( ( newObject, [ key, value ] ) => {
				if ( key.startsWith( area ) && value ) {
					const newKey = key.replace( area, '' );

					newObject = {
						...newObject,
						[ newKey ]: value,
					};
				}

				return newObject;
			}, {} );
		} );

		if (
			4 === allValues.length &&
			allValues.every( ( obj ) => ! isEmpty( obj ) && isEqual( obj, allValues[ 0 ] ) )
		) {
			setSync( true );
		}
	}, [] );

	function manualSync() {
		const areasWithWidth = borderAreas.filter( ( area ) => deviceAttributes.borders[ area + 'Width' ] || isNumeric( deviceAttributes.borders[ area + 'Width' ] ) );

		if ( ! areasWithWidth.length ) {
			return;
		}

		const firstArea = areasWithWidth[ 0 ];

		const valuesToSync = Object.entries( deviceAttributes.borders ).reduce( ( newObject, [ key, value ] ) => {
			if ( key.startsWith( firstArea ) ) {
				const newKey = key.replace( firstArea, '' );
				newObject[ newKey ] = value;
			}

			return newObject;
		}, {} );

		const newDeviceAttributes = Object.entries( valuesToSync ).reduce( ( newObject, [ key, value ] ) => {
			borderAreas.forEach( ( area ) => {
				newObject[ area + key ] = value;
			} );

			return newObject;
		}, {} );

		setDeviceAttributes( newDeviceAttributes, 'borders' );
	}

	return (
		<PanelArea
			title={ __( 'Borders', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'borders' ) }
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
								setSync( ! sync );

								if ( ! sync ) {
									manualSync();
								}
							} }
						>
							{ !! sync ? link : linkOff }
						</Button>
					</Tooltip>

					{ borderAreas.map( ( borderArea, areaIndex ) => {
						if ( ! bordersPanel[ borderArea ] ) {
							return null;
						}

						if ( sync && areaIndex > 0 ) {
							return null;
						}

						const iconBorderStyle = !! sync
							? 'borderAll'
							: borderArea;

						return (
							<FlexControl key={ borderArea }>
								<Tooltip text={ !! sync ? __( 'All sides', 'generateblocks' ) : borderLabels[ borderArea ] }>
									<div className={ 'gblocks-border-icon ' + iconBorderStyle } style={ { borderStyle: attributes.borders[ borderArea + 'Style' ] } }></div>
								</Tooltip>

								<UnitControl
									id={ 'gblocks-' + borderArea + '-width' }
									value={ deviceAttributes.borders[ borderArea + 'Width' ] || '' }
									placeholder={ getResponsivePlaceholder( borderArea + 'Width', attributes.borders, device ) }
									onChange={ ( value ) => {
										const newAttributes = {
											[ borderArea + 'Width' ]: value,
										};

										if ( sync ) {
											newAttributes.borderRightWidth = value;
											newAttributes.borderBottomWidth = value;
											newAttributes.borderLeftWidth = value;
										}

										if ( ! value ) {
											newAttributes[ borderArea + 'Style' ] = '';

											if ( sync ) {
												newAttributes.borderRightStyle = '';
												newAttributes.borderBottomStyle = '';
												newAttributes.borderLeftStyle = '';
											}
										} else if ( ! attributes.borders[ borderArea + 'Style' ] ) {
											newAttributes[ borderArea + 'Style' ] = 'solid';

											if ( sync ) {
												newAttributes.borderRightStyle = 'solid';
												newAttributes.borderBottomStyle = 'solid';
												newAttributes.borderLeftStyle = 'solid';
											}
										}

										setDeviceAttributes( newAttributes, 'borders' );
									} }
								/>

								<StyleDropdown
									value={ deviceAttributes.borders[ borderArea + 'Style' ] || getResponsivePlaceholder( borderArea + 'Style', attributes.borders, device ) }
									onChange={ ( value ) => {
										const newAttributes = {
											[ borderArea + 'Style' ]: value,
										};

										if ( sync ) {
											newAttributes.borderRightStyle = value;
											newAttributes.borderBottomStyle = value;
											newAttributes.borderLeftStyle = value;
										}

										setDeviceAttributes( newAttributes, 'borders' );
									} }
								/>

								{ !! bordersPanel.borderColors.length && 'Desktop' === device &&
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
															newAttributes[ 'borderRightColor' + borderColor.state ] = nextBackgroundColor;
															newAttributes[ 'borderBottomColor' + borderColor.state ] = nextBackgroundColor;
															newAttributes[ 'borderLeftColor' + borderColor.state ] = nextBackgroundColor;
														}

														setAttributes( {
															borders: {
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
					values={ deviceAttributes.borders }
					placeholders={ borderRadiusAttributes.reduce( ( o, key ) => (
						{ ...o, [ key ]: getResponsivePlaceholder( key, attributes.borders, device, '' ) }
					), {} ) }
					onChange={ ( values ) => setDeviceAttributes( values, 'borders' ) }
				/>
			}
		</PanelArea>
	);
}

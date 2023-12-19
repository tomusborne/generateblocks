import { __, sprintf } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { Fragment, useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import classnames from 'classnames';
import sanitizeSVG from '../../../../utils/sanitize-svg';
import {
	BaseControl,
	Button,
	Dropdown,
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl, ToggleControl,
	Tooltip,
} from '@wordpress/components';
import ColorPicker from '../../../../components/color-picker';
import UnitPicker from '../../../../components/unit-picker';
import getDeviceType from '../../../../utils/get-device-type';

export default function ShapesPanel( { attributes, setAttributes } ) {
	const { id } = useContext( ControlsContext );
	const deviceType = getDeviceType();
	const {
		backgroundColor,
		shapeDividers,
		position,
	} = attributes;

	const allShapes = [];

	Object.keys( generateBlocksInfo.svgShapes ).forEach( ( key ) => {
		const shapes = generateBlocksInfo.svgShapes[ key ].svgs;

		Object.keys( shapes ).forEach( ( shapeName ) => {
			allShapes[ shapeName ] = {
				label: shapes[ shapeName ].label,
				icon: shapes[ shapeName ].icon,
			};
		} );
	} );

	const handleAddShape = () => {
		const shapeDividersValues = [ ...shapeDividers ];

		shapeDividersValues.push( {
			shape: generateBlocksStyling.container.shapeDividers.shape,
			color: generateBlocksStyling.container.shapeDividers.color,
			colorOpacity: generateBlocksStyling.container.shapeDividers.colorOpacity,
			location: generateBlocksStyling.container.shapeDividers.location,
			height: generateBlocksStyling.container.shapeDividers.height,
			heightTablet: generateBlocksStyling.container.shapeDividers.heightTablet,
			heightMobile: generateBlocksStyling.container.shapeDividers.heightMobile,
			width: generateBlocksStyling.container.shapeDividers.width,
			widthTablet: generateBlocksStyling.container.shapeDividers.widthTablet,
			widthMobile: generateBlocksStyling.container.shapeDividers.widthMobile,
			flipHorizontally: generateBlocksStyling.container.shapeDividers.flipHorizontally,
			zindex: generateBlocksStyling.container.shapeDividers.zindex,
		} );

		setAttributes( {
			shapeDividers: shapeDividersValues,
			position: ! position ? 'relative' : position,
		} );
	};

	const handleRemoveShape = ( index ) => {
		const shapeDividersValues = [ ...shapeDividers ];

		shapeDividersValues.splice( index, 1 );
		setAttributes( { shapeDividers: shapeDividersValues } );
	};

	return (
		<PanelArea
			title={ __( 'Shapes', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'shapes' ) }
			className={ 'gblocks-panel-label' }
			id={ `${ id }Shapes` }
		>
			<BaseControl className="gb-icon-chooser gb-shape-chooser">
				{
					shapeDividers.map( ( location, index ) => {
						const shapeNumber = index + 1;

						return <Fragment key={ index }>
							<div className="gblocks-shape-container">
								<div
									className={ classnames( {
										'gblocks-shape-toggle-preview': true,
										[ `gblocks-shape-toggle-preview-${ shapeNumber }` ]: true,
									} ) }
									style={ { backgroundColor } }
								>
									{ 'undefined' !== typeof allShapes[ shapeDividers[ index ].shape ] &&
										<div
											className="gblocks-shape-divider-preview"
											style={ { color: shapeDividers[ index ].color } }
											dangerouslySetInnerHTML={ { __html: sanitizeSVG( allShapes[ shapeDividers[ index ].shape ].icon ) } }
										/>
									}
								</div>

								{
									/* translators: Shape number */
									sprintf( __( 'Shape %s', 'generateblocks' ), shapeNumber )
								}

								<Fragment>
									<Dropdown
										contentClassName="gblocks-shapes-dropdown"
										renderToggle={ ( { isOpen, onToggle } ) => (
											<Tooltip text={ __( 'Edit Shape', 'generateblocks' ) }>
												<Button
													className="gblocks-shape-dropdown"
													isSecondary={ isOpen ? undefined : true }
													isPrimary={ isOpen ? true : undefined }
													icon={ getIcon( 'wrench' ) }
													onClick={ onToggle }
													aria-expanded={ isOpen }
												/>
											</Tooltip>
										) }
										renderContent={ () => (
											<div className="gblocks-shape-controls">
												{ 'Desktop' === deviceType &&
													<Fragment>
														<BaseControl className="gb-icon-chooser">
															{
																Object.keys( generateBlocksInfo.svgShapes ).map( ( svg, i ) => {
																	const svgItems = generateBlocksInfo.svgShapes[ svg ].svgs;

																	return (
																		<PanelBody
																			title={ generateBlocksInfo.svgShapes[ svg ].group }
																			initialOpen={ svgItems.hasOwnProperty( shapeDividers[ index ].shape ) }
																			key={ i }
																		>
																			<PanelRow>
																				<BaseControl>
																					<ul className="gblocks-icon-chooser gblocks-shape-chooser">
																						{
																							Object.keys( svgItems ).map( ( svgItem, iconIndex ) => {
																								return (
																									<li key={ `editor-pblock-types-list-item-${ iconIndex }` }>
																										<Tooltip text={ ( svgItems[ svgItem ].label ) }>
																											<Button
																												className={ classnames( {
																													'editor-block-list-item-button': true,
																													'gblocks-shape-is-active': shapeDividers[ index ].shape === svgItem,
																												} ) }
																												onClick={ () => {
																													const shapes = [ ...shapeDividers ];

																													shapes[ index ] = {
																														...shapes[ index ],
																														shape: svgItem,
																													};

																													setAttributes( {
																														shapeDividers: shapes,
																													} );
																												} }
																											>
																												{ 'string' === typeof svgItems[ svgItem ].icon ? (
																													<Fragment>
																														<span
																															className="editor-block-types-list__item-icon"
																															dangerouslySetInnerHTML={ { __html: sanitizeSVG( svgItems[ svgItem ].icon ) } }
																														/>
																													</Fragment>
																												) : (
																													<Fragment>
																														<span className="editor-block-types-list__item-icon">
																															{ svgItems[ svgItem ].icon }
																														</span>
																													</Fragment>
																												) }
																											</Button>
																										</Tooltip>
																									</li>
																								);
																							} )
																						}
																					</ul>
																				</BaseControl>
																			</PanelRow>
																		</PanelBody>
																	);
																} )
															}
														</BaseControl>

														<BaseControl>
															<ColorPicker
																label={ __( 'Color', 'generateblocks' ) }
																value={ shapeDividers[ index ].color }
																alpha={ true }
																valueOpacity={ shapeDividers[ index ].colorOpacity }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		color: value,
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
																onOpacityChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		colorOpacity: value,
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>
														</BaseControl>

														<SelectControl
															label={ __( 'Location', 'generateblocks' ) }
															value={ shapeDividers[ index ].location }
															options={ [
																{ label: __( 'Top', 'generateblocks' ), value: 'top' },
																{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
															] }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	location: value,
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<UnitPicker
															label={ __( 'Height', 'generateblocks' ) }
															value={ 'px' }
															units={ [ 'px' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].height ? shapeDividers[ index ].height : '' }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	height: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<UnitPicker
															label={ __( 'Width', 'generateblocks' ) }
															value={ '%' }
															units={ [ '%' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].width ? shapeDividers[ index ].width : '' }
															min="100"
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	width: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<ToggleControl
															label={ __( 'Flip Horizontally', 'generateblocks' ) }
															checked={ !! shapeDividers[ index ].flipHorizontally }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	flipHorizontally: value,
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<TextControl
															label={ __( 'z-index', 'generateblocks' ) }
															type={ 'number' }
															min="0"
															value={ shapeDividers[ index ].zindex || 0 === shapeDividers[ index ].zindex ? shapeDividers[ index ].zindex : '' }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	zindex: value,
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
															onBlur={ () => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	zindex: parseFloat( shapeDividers[ index ].zindex ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
															onClick={ ( e ) => {
																// Make sure onBlur fires in Firefox.
																e.currentTarget.focus();
															} }
														/>
													</Fragment>
												}

												{ 'Tablet' === deviceType &&
													<Fragment>
														<UnitPicker
															label={ __( 'Height', 'generateblocks' ) }
															value={ 'px' }
															units={ [ 'px' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].heightTablet ? shapeDividers[ index ].heightTablet : '' }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	heightTablet: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<UnitPicker
															label={ __( 'Width', 'generateblocks' ) }
															value={ '%' }
															units={ [ '%' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].widthTablet ? shapeDividers[ index ].widthTablet : '' }
															min="100"
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	widthTablet: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>
													</Fragment>
												}

												{ 'Mobile' === deviceType &&
													<Fragment>
														<UnitPicker
															label={ __( 'Height', 'generateblocks' ) }
															value={ 'px' }
															units={ [ 'px' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].heightMobile ? shapeDividers[ index ].heightMobile : '' }
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	heightMobile: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>

														<UnitPicker
															label={ __( 'Width', 'generateblocks' ) }
															value={ '%' }
															units={ [ '%' ] }
															onClick={ () => {
																return false;
															} }
														/>

														<TextControl
															type={ 'number' }
															value={ shapeDividers[ index ].widthMobile ? shapeDividers[ index ].widthMobile : '' }
															min="100"
															onChange={ ( value ) => {
																const shapes = [ ...shapeDividers ];

																shapes[ index ] = {
																	...shapes[ index ],
																	widthMobile: parseFloat( value ),
																};

																setAttributes( {
																	shapeDividers: shapes,
																} );
															} }
														/>
													</Fragment>
												}
											</div>
										) }
									/>
								</Fragment>

								{ 'Desktop' === deviceType &&
									<Tooltip text={ __( 'Delete Shape', 'generateblocks' ) }>
										<Button
											className="gblocks-remove-shape"
											onClick={ () => {
												// eslint-disable-next-line
												if ( window.confirm( __( 'This will permanently delete this shape.', 'generateblocks' ) ) ) {
													handleRemoveShape( index );
												}
											} }
											icon={ getIcon( 'x' ) }
										/>
									</Tooltip>
								}
							</div>
						</Fragment>;
					} )
				}

				{ 'Desktop' === deviceType &&
					<div className="gblocks-add-new-shape">
						<Button
							isSecondary
							onClick={ handleAddShape }
						>
							{ __( 'Add Shape', 'generateblocks' ) }
						</Button>
					</div>
				}
			</BaseControl>
		</PanelArea>
	);
}

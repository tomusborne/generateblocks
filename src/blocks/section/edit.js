/**
 * Block: Section
 */

import Section from './section-tag';
import ColorPicker from '../../components/color-picker';
import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	ResponsiveWrapper,
	ToggleControl,
	SelectControl,
	TextControl,
	Notice,
	TabPanel,
	Tooltip,
	Icon,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	MediaUpload,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateSection extends Component {
	componentDidMount() {
		var instanceId = this.props.instanceId + 1;

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		} else if ( this.props.attributes.uniqueId && this.props.attributes.uniqueId !== instanceId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId,
			hasChildBlocks,
			clientId,
			isSelected,
		} = this.props;

		const onSelectBgImage = ( media ) => {
			setAttributes( {
				bgImage: {
					id: media.id,
					image: media.sizes.large || media.sizes.full,
				}
			} )
		}

		const onRemoveBgImage = () => {
			setAttributes( {
				bgImage: null
			} )
		}

		const onClearBackgroundColor = () => {
			setAttributes( {
				backgroundColor: null
			} )
		}

		const {
			uniqueId,
			tagName,
			elementId,
			cssClasses,
			isGrid,
			width,
			mobileWidth,
			outerContainer,
			innerContainer,
			containerWidth,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			backgroundColor,
			textColor,
			linkColor,
			linkColorHover,
			bgImage,
			bgOptions,
			verticalAlignment,
			zindex,
		} = attributes;

		var backgroundImageValue;

		if ( bgImage ) {
			backgroundImageValue = 'url(' + bgImage.image.url + ')';

			if ( bgOptions.overlay ) {
				backgroundImageValue = 'linear-gradient(0deg, ' + backgroundColor + ', ' + backgroundColor + '), url(' + bgImage.image.url + ')';
			}
		}

		var outerContainerWidth = '';
		var innerContainerWidth = '';

		if ( 'full' === outerContainer ) {
			outerContainerWidth = 'none';
		} else {
			outerContainerWidth = containerWidth + 'px';
		}

		if ( 'full' === innerContainer ) {
			innerContainerWidth = 'none';
		} else {
			innerContainerWidth = 'max-width:' + containerWidth + 'px;margin-left: auto;margin-right:auto;';
		}

		const css = `
			.section-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
		  		background-image: ` + backgroundImageValue + `;
		  		background-size: ` + bgOptions.size + `;
		  		background-position: ` + bgOptions.position + `;
				background-repeat: ` + bgOptions.repeat + `;
				background-attachment: ` + bgOptions.attachment + `;
			}

			.section-` + uniqueId + ` a, .section-` + uniqueId + ` a:visited {
			  color: ` + linkColor + `;
			}

			.section-` + uniqueId + ` a:hover {
			  color: ` + linkColorHover + `;
			}

			.section-` + uniqueId + ` .inside-section {
			  padding-top: ` + paddingTop + `px;
			  padding-right: ` + paddingRight + `px;
			  padding-bottom: ` + paddingBottom + `px;
			  padding-left: ` + paddingLeft + `px;
			  ` + innerContainerWidth + `;
			}

			.gp-grid-wrapper #block-` + clientId + ` {
				width: ` + width + `%;
				align-self: ` + verticalAlignment + `;
			}

			.editor-block-list__layout > #block-` + clientId + ` {
				max-width: ` + outerContainerWidth + `;
			}
		`

		const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

		return (
			<Fragment>
				<InspectorControls>
					{ ! isGrid ? (
						<PanelBody>
							<Fragment>
								<SelectControl
									label={ __( 'Container', 'gp-premium' ) }
									value={ outerContainer }
									options={ [
										{ label: __( 'Full width', 'gp-premium' ), value: 'full' },
										{ label: __( 'Contained', 'gp-premium' ), value: 'contained' },
									] }
									onChange={ ( outerContainer ) => { setAttributes( { outerContainer } ) } }
								/>

								<SelectControl
									label={ __( 'Inner Container', 'gp-premium' ) }
									value={ innerContainer }
									options={ [
										{ label: __( 'Full width', 'gp-premium' ), value: 'full' },
										{ label: __( 'Contained', 'gp-premium' ), value: 'contained' },
									] }
									onChange={ ( innerContainer ) => { setAttributes( { innerContainer } ) } }
								/>

								<TextControl
									label={ __( 'Container Width', 'gp-premium' ) }
									value={ containerWidth }
									type={ 'number' }
									onChange={ ( containerWidth ) => { setAttributes( { containerWidth } ) } }
								/>
							</Fragment>
						</PanelBody>
					) : '' }

					{ isGrid ? (
						<PanelBody className="section-grid-panel">
							<Fragment>
								<SelectControl
									label={ __( 'Vertical Alignment', 'gp-premium' ) }
									value={ verticalAlignment }
									options={ [
										{ label: __( 'Default', 'gp-premium' ), value: '' },
										{ label: __( 'Top', 'gp-premium' ), value: 'flex-start' },
										{ label: __( 'Center', 'gp-premium' ), value: 'center' },
										{ label: __( 'Bottom', 'gp-premium' ), value: 'flex-end' },
									] }
									onChange={ ( verticalAlignment ) => { setAttributes( { verticalAlignment } ) } }
								/>
							</Fragment>

							<TabPanel className="grid-tab-panel generatepress-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'grid-desktop',
										title: __( 'Desktop', 'gp-premium' ),
										className: 'grid-desktop',
									},
									{
										name: 'grid-mobile',
										title: __( 'Mobile', 'gp-premium' ),
										className: 'grid-mobile',
									},
								] }>
								{
									( tab ) => {
										const isDesktop = tab.name === 'grid-desktop';

										return (
											<div>
												{ isDesktop ? (
													<Fragment>
														<ButtonGroup className={ 'widthButtons' }>
															<Button isLarge isPrimary={ width === 25 } onClick={ () => { setAttributes( { width: 25 } ); } }>25%</Button>
															<Button isLarge isPrimary={ width === 33.33 } onClick={ () => { setAttributes( { width: 33.33 } ); } }>33%</Button>
															<Button isLarge isPrimary={ width === 50 } onClick={ () => { setAttributes( { width: 50 } ); } }>50%</Button>
															<Button isLarge isPrimary={ width === 66.66 } onClick={ () => { setAttributes( { width: 66.66 } ); } }>66%</Button>
															<Button isLarge isPrimary={ width === 75 } onClick={ () => { setAttributes( { width: 75 } ); } }>75%</Button>
														</ButtonGroup>

														<RangeControl
															className={ 'gp-column-width-control' }
															value={ parseFloat( width ) }
															onChange={ ( value ) => {
																setAttributes( {
																	width: value
																} );
															} }
															min={ 10.00 }
															max={ 100.00 }
															step={ 0.01 }
															allowReset={ true }
														/>
													</Fragment>

												) : (

													<Fragment>
														<ButtonGroup className={ 'widthButtons' }>
															<Button isLarge isPrimary={ mobileWidth === 25 } onClick={ () => { setAttributes( { mobileWidth: 25 } ); } }>25%</Button>
															<Button isLarge isPrimary={ mobileWidth === 33.33 } onClick={ () => { setAttributes( { mobileWidth: 33.33 } ); } }>33%</Button>
															<Button isLarge isPrimary={ mobileWidth === 50 } onClick={ () => { setAttributes( { mobileWidth: 50 } ); } }>50%</Button>
															<Button isLarge isPrimary={ mobileWidth === 66.66 } onClick={ () => { setAttributes( { mobileWidth: 66.66 } ); } }>66%</Button>
															<Button isLarge isPrimary={ mobileWidth === 100 } onClick={ () => { setAttributes( { mobileWidth: 100 } ); } }>100%</Button>
														</ButtonGroup>

														<RangeControl
															className={ 'gp-column-width-control' }
															value={ parseFloat( mobileWidth ) }
															onChange={ ( value ) => {
																setAttributes( {
																	mobileWidth: value
																} );
															} }
															min={ 10.00 }
															max={ 100.00 }
															step={ 0.01 }
															allowReset={ true }
														/>
													</Fragment>
												) }
											</div>
										);
									}
								}
							</TabPanel>
						</PanelBody>
					) : '' }

					<PanelBody
						title={ __( 'Padding', 'gp-premium' ) }
						initialOpen={ false }
					>

						<TabPanel className="layout-tab-panel generatepress-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'layout-desktop',
									title: __( 'Desktop', 'gp-premium' ),
									className: 'layout-desktop',
								},
								{
									name: 'layout-mobile',
									title: __( 'Mobile', 'gp-premium' ),
									className: 'layout-mobile',
								},
							] }>
							{
								( tab ) => {
									const isDesktop = tab.name === 'layout-desktop';

									return (
										<div>
											{ isDesktop ? (
												<Fragment>
													<RangeControl
														label={ __( 'Top Padding', 'gp-premium' ) }
														value={ paddingTop }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTop: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'gp-premium' ) }
														value={ paddingRight }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRight: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'gp-premium' ) }
														value={ paddingBottom }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottom: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'gp-premium' ) }
														value={ paddingLeft }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeft: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>
												</Fragment>

											) : (

												<Fragment>
													<RangeControl
														label={ __( 'Top Padding', 'gp-premium' ) }
														value={ paddingTopMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTopMobile: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'gp-premium' ) }
														value={ paddingRightMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRightMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'gp-premium' ) }
														value={ paddingBottomMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottomMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'gp-premium' ) }
														value={ paddingLeftMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeftMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>

					</PanelBody>

					<PanelBody
						title={ __( 'Margin', 'gp-premium' ) }
						initialOpen={ false }
					>

						<TabPanel className="margin-tab-panel generatepress-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'margin-desktop',
									title: __( 'Desktop', 'gp-premium' ),
									className: 'margin-desktop',
								},
								{
									name: 'margin-mobile',
									title: __( 'Mobile', 'gp-premium' ),
									className: 'margin-mobile',
								},
							] }>
							{
								( tab ) => {
									const isDesktop = tab.name === 'margin-desktop';

									return (
										<div>
											{ isDesktop ? (
												<Fragment>
													<RangeControl
														label={ __( 'Top Margin', 'gp-premium' ) }
														value={ marginTop }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginTop: nextSpacing
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Right Margin', 'gp-premium' ) }
														value={ marginRight }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginRight: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Bottom Margin', 'gp-premium' ) }
														value={ marginBottom }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginBottom: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Left Margin', 'gp-premium' ) }
														value={ marginLeft }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginLeft: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>
												</Fragment>

											) : (

												<Fragment>
													<RangeControl
														label={ __( 'Top Margin', 'gp-premium' ) }
														value={ marginTopMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginTopMobile: nextSpacing
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Right Margin', 'gp-premium' ) }
														value={ marginRightMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginRightMobile: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Bottom Margin', 'gp-premium' ) }
														value={ marginBottomMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginBottomMobile: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Left Margin', 'gp-premium' ) }
														value={ marginLeftMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																marginLeftMobile: nextSpacing,
															} );
														} }
														min={ -200 }
														max={ 200 }
														step={ 10 }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>

					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'gp-premium' ) }
						initialOpen={ false }
					>

						<Fragment>
							<ColorPicker
								label={ __( 'Background Color', 'gp-premium' ) }
								value={ backgroundColor }
								onChange={ ( nextBackgroundColor ) =>
									setAttributes( {
										backgroundColor: nextBackgroundColor
									} )
								}
								alpha={ true }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Text Color', 'gp-premium' ) }
								value={ textColor }
								onChange={ ( nextTextColor ) =>
									setAttributes( {
										textColor: nextTextColor
									} )
								}
								alpha={ false }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Link Color', 'gp-premium' ) }
								value={ linkColor }
								onChange={ ( nextLinkColor ) =>
									setAttributes( {
										linkColor: nextLinkColor
									} )
								}
								alpha={ false }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Link Color Hover', 'gp-premium' ) }
								value={ linkColorHover }
								onChange={ ( nextLinkColorHover ) =>
									setAttributes( {
										linkColorHover: nextLinkColorHover
									} )
								}
								alpha={ false }
							/>
						</Fragment>
					</PanelBody>

					<PanelBody
						title={ __( 'Background image' ) }
						initialOpen={ false }
					>
						{ ! bgImage &&
							<div>
								<MediaUpload
									title={ __('Set background image') }
									onSelect={ onSelectBgImage }
									allowedTypes={["image"]}
									modalClass="editor-post-featured-image__media-modal"
									render={ ( { open } ) => (
										<Button className="editor-post-featured-image__toggle" onClick={ open }>
											{ __( 'Set background image' ) }
										</Button>
									) }
								/>
							</div>
						}
						{ !! bgImage && <MediaUpload
							title={ __( 'Set background image' ) }
							onSelect={ onSelectBgImage }
							allowedTypes={["image"]}
							value={ bgImage.id }
							modalClass="editor-post-featured-image__media-modal"
							render={ ( { open } ) => (
								<div className="editor-bg-image">
									<Button className="editor-post-featured-image__preview" onClick={ open }>
										<ResponsiveWrapper
											naturalWidth={ bgImage.image.width }
											naturalHeight={ bgImage.image.height }
										>
											<img src={ bgImage.image.url } alt={ __( 'BG Image' ) } />
										</ResponsiveWrapper>
									</Button>
									<div className={ 'edit-bg-buttons' }>
										<Button onClick={ open } isDefault isLarge>
											{ __( 'Replace image' ) }
										</Button>
										<Button onClick={ onRemoveBgImage } isLink isDestructive>
											{ __('Remove background image') }
										</Button>
									</div>
								</div>
							) }
						/>
						}
						{ !! bgImage && <div className="section-bg-settings">
							<ToggleControl
								label={ __( 'Background Color Overlay', 'gp-premium' ) }
								checked={ !! bgOptions.overlay }
								onChange={ ( nextOverlay ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											overlay: nextOverlay,
										},
									} );
								} }
							/>

							<TextControl
								label={ __( 'Size', 'gp-premium' ) }
								value={ bgOptions.size }
								onChange={ ( nextSize ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											size: nextSize,
										},
									} );
								} }
							/>

							<TextControl
								label={ __( 'Position', 'gp-premium' ) }
								value={ bgOptions.position }
								onChange={ ( nextPosition ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											position: nextPosition,
										},
									} );
								} }
							/>

							<SelectControl
								label={ __( 'Repeat', 'gp-premium' ) }
								value={ bgOptions.repeat }
								options={ [
									{ label: 'no-repeat', value: 'no-repeat' },
									{ label: 'repeat', value: 'repeat' },
									{ label: 'repeat-x', value: 'repeat-x' },
									{ label: 'repeat-y', value: 'repeat-y' },
								] }
								onChange={ ( nextRepeat ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											repeat: nextRepeat,
										},
									} );
								} }
							/>

							<SelectControl
								label={ __( 'Attachment', 'gp-premium' ) }
								value={ bgOptions.attachment }
								options={ [
									{ label: 'scroll', value: '' },
									{ label: 'fixed', value: 'fixed' },
									{ label: 'local', value: 'local' },
								] }
								onChange={ ( nextAttachment ) => {
									setAttributes( {
										bgOptions: {
											...bgOptions,
											attachment: nextAttachment,
										},
									} );
								} }
							/>
						</div>}
					</PanelBody>
				</InspectorControls>
				<InspectorAdvancedControls>
					<SelectControl
						label={ __( 'Element Tag', 'gp-premium' ) }
						value={ tagName }
						options={ [
							{ label: 'section', value: 'section' },
							{ label: 'header', value: 'header' },
							{ label: 'footer', value: 'footer' },
							{ label: 'div', value: 'div' },
						] }
						onChange={ ( tagName ) => { setAttributes( { tagName } ) } }
					/>

					<TextControl
						label={ __( 'Element ID', 'gp-premium' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'gp-premium' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>

					<RangeControl
						label={ __( 'z-index', 'gp-premium' ) }
						value={ zindex }
						onChange={ ( nextSpacing ) => {
							setAttributes( {
								zindex: nextSpacing
							} );
						} }
						min={ -200 }
						max={ 200 }
						step={ 10 }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<ConditionalWrap
					condition={ isGrid }
					wrap={ children => <div className={ classnames( {
						'gp-grid-column': true,
						[`grid-column-${ uniqueId }`]: true
					} ) }>{ children }</div>}
				>
					<Section
						tagName={ tagName }
						id={ elementId }
						className={ classnames( {
							'generate-section': true,
							[`section-${ uniqueId }`]: true,
							[`${ cssClasses }`]: '' !== cssClasses
						} ) }
					>
						<div
							className={ classnames( {
							'inside-section': true
							} ) }
						>
							{ ! isSelected ? (
								<div className="gp-section-button-select">
									<Tooltip text={ __( 'Select Column', 'gp-premium' ) }>
										<Icon icon="screenoptions" />
									</Tooltip>
								</div>
							) : '' }
							<InnerBlocks
								templateLock={ false }
								renderAppender={ (
									hasChildBlocks ?
										undefined :
										() => <InnerBlocks.ButtonBlockAppender />
								) }
							/>
						</div>
					</Section>
				</ConditionalWrap>
			</Fragment>
		);
	}
}

export default ( GenerateSection );

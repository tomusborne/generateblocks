/**
 * Internal dependencies
 */
import './editor.scss';
import socialSvgs from './svgs-social';
import generalSvgs from './svgs-general';
import sanitizeSVG from '../../utils/sanitize-svg';

/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;

const {
	Component,
	Fragment,
	renderToString,
} = wp.element;

const {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Tooltip,
	Button,
	PanelBody,
	PanelRow,
} = wp.components;

/**
 * Typography Component
 */
class IconPicker extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showIcons: false,
			showGeneralIcons: false,
			showSocialIcons: false,
		};
	}

	render() {
		const {
			attributes,
			setAttributes,
			attrIcon,
			attrIconLocation,
			locationOptions,
			attrRemoveText,
		} = this.props;

		return (
			<Fragment>
				<BaseControl className="gb-svg-html">
					<TextControl
						label={ __( 'Icon SVG HTML', 'generateblocks' ) }
						value={ attributes[ attrIcon ] }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrIcon' ] ]: sanitizeSVG( value ), // eslint-disable-line dot-notation
							} );

							if ( '' !== value ) {
								setAttributes( {
									'hasIcon': true, // eslint-disable-line quote-props
								} );
							} else {
								setAttributes( {
									'hasIcon': false, // eslint-disable-line quote-props
								} );
							}
						} }
					/>

					<div className="gb-icon-preview">
						<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( attributes[ attrIcon ] ) } } />

						<Button
							isSmall
							className="reset-icon is-secondary"
							onClick={ () => {
								setAttributes( {
									[ this.props[ 'attrIcon' ] ]: '', // eslint-disable-line dot-notation
									'hasIcon': false, // eslint-disable-line quote-props
								} );
							} }
						>
							<span className="editor-block-types-list__item-icon">
								{ __( 'Clear', 'generateblocks' ) }
							</span>
						</Button>
					</div>
				</BaseControl>

				<BaseControl className="gb-icon-chooser">
					<PanelBody title={ __( 'General Icons', 'generateblocks' ) } initialOpen={ false }>
						<PanelRow>
							<BaseControl>
								<ul className="gblocks-icon-chooser">
									{
										Object.keys( generalSvgs ).map( ( svg, i ) => {
											return (
												<li key={ `editor-pblock-types-list-item-${ i }` }>
													<Tooltip text={ ( generalSvgs[ svg ].label ) }>
														<Button
															isLarge
															className="editor-block-list-item-button"
															onClick={ () => {
																setAttributes( {
																	[ this.props[ 'attrIcon' ] ]: renderToString( generalSvgs[ svg ][ 'icon' ] ), // eslint-disable-line dot-notation
																	'hasIcon': true, // eslint-disable-line quote-props
																} );
															} }
														>
															<span className="editor-block-types-list__item-icon">
																{ generalSvgs[ svg ].icon }
															</span>
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

					<PanelBody title={ __( 'Social Icons', 'generateblocks' ) } initialOpen={ false }>
						<PanelRow>
							<BaseControl>
								<ul className="gblocks-icon-chooser">
									{
										Object.keys( socialSvgs ).map( ( svg, i ) => {
											return (
												<li key={ `editor-pblock-types-list-item-${ i }` }>
													<Tooltip text={ ( socialSvgs[ svg ].label ) }>
														<Button
															isLarge
															className="editor-block-list-item-button"
															onClick={ () => {
																setAttributes( {
																	[ this.props[ 'attrIcon' ] ]: renderToString( socialSvgs[ svg ][ 'icon' ] ), // eslint-disable-line dot-notation
																	'hasIcon': true, // eslint-disable-line quote-props
																} );
															} }
														>
															<span className="editor-block-types-list__item-icon">
																{ socialSvgs[ svg ].icon }
															</span>
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
				</BaseControl>

				{ ( typeof attributes[ attrIconLocation ] !== 'undefined' && ! attributes[ attrRemoveText ] && !! attributes[ attrIcon ] ) &&
					<SelectControl
						label={ __( 'Icon Location', 'generateblocks' ) }
						value={ attributes[ attrIconLocation ] }
						options={ locationOptions }
						onChange={ ( value ) => {
							const leftPadding 		= attributes.iconPaddingLeft,
								rightPadding 		= attributes.iconPaddingRight,
								rightPaddingTablet 	= attributes.iconPaddingRightTablet,
								leftPaddingTablet 	= attributes.iconPaddingLeftTablet,
								rightPaddingMobile 	= attributes.iconPaddingRightMobile,
								leftPaddingMobile 	= attributes.iconPaddingLeftMobile;

							if ( 'right' === value ) {
								if ( ! leftPadding && rightPadding ) {
									setAttributes( {
										iconPaddingLeft: rightPadding,
										iconPaddingRight: '',
									} );
								}

								if ( ! leftPaddingTablet && rightPaddingTablet ) {
									setAttributes( {
										iconPaddingLeftTablet: rightPaddingTablet,
										iconPaddingRightTablet: '',
									} );
								}

								if ( ! leftPaddingMobile && rightPaddingMobile ) {
									setAttributes( {
										iconPaddingLeftMobile: rightPaddingMobile,
										iconPaddingRightMobile: '',
									} );
								}
							}

							if ( 'left' === value ) {
								if ( ! rightPadding && leftPadding ) {
									setAttributes( {
										iconPaddingRight: leftPadding,
										iconPaddingLeft: '',
									} );
								}

								if ( ! rightPaddingTablet && leftPaddingTablet ) {
									setAttributes( {
										iconPaddingRightTablet: leftPaddingTablet,
										iconPaddingLeftTablet: '',
									} );
								}

								if ( ! rightPaddingMobile && leftPaddingMobile ) {
									setAttributes( {
										iconPaddingRightMobile: leftPaddingMobile,
										iconPaddingLeftMobile: '',
									} );
								}
							}

							setAttributes( {
								[ this.props[ 'attrIconLocation' ] ]: value, // eslint-disable-line dot-notation
							} );
						} }
					/>
				}

				{ ( typeof attributes[ attrRemoveText ] !== 'undefined' && !! attributes[ attrIcon ] ) &&
					<ToggleControl
						label={ __( 'Remove Text', 'generateblocks' ) }
						checked={ !! attributes[ attrRemoveText ] }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrRemoveText' ] ]: value, // eslint-disable-line dot-notation
							} );
						} }
					/>
				}
			</Fragment>
		);
	}
}

export default IconPicker;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import socialSvgs from './svgs-social';
import generalSvgs from './svgs-general';

/**
 * WordPress dependencies
 */
const {
	__
} = wp.i18n;

const {
	Component,
	Fragment,
	renderToString
} = wp.element;

const {
	compose
} = wp.compose;

const {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Tooltip,
	Button,
} = wp.components;

/**
 * Typography Component
 */
class IconPicker extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
            showIcons: false,
        };
	}

	render() {
		const {
			attributes,
			className,
			setAttributes,
			attrIcon,
			attrIconLocation,
			locationOptions,
			attrRemoveText,
			attrAriaLabel,
		} = this.props;

		const {
            showIcons,
        } = this.state;

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

		return (
			<Fragment>
				<Tooltip text={ __( 'Choose Icon', 'generateblocks' ) }>
					<button
						type="button"
						aria-expanded={ showIcons }
						className="components-icon-picker-item"
						onClick={ () => {
							this.setState( {
								showIcons: ! showIcons,
							} );
						} }
						aria-label={ __( 'Icon picker', 'generateblocks' ) }
					>
						<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( attributes[ attrIcon ] ) } } />
					</button>
				</Tooltip>

				<BaseControl className="advanced-icon-controls">
					<Button
						isLarge
						className="reset-icon is-secondary"
						onClick={ () => {
							setAttributes( {
								[ this.props[ 'attrIcon' ] ]: ''
							} );
						} }
					>
						<span className="editor-block-types-list__item-icon">
							{ __( 'Clear', 'generateblocks' ) }
						</span>
					</Button>
				</BaseControl>

				{ showIcons &&
					<div className="icon-chooser-container">
						<BaseControl className="gb-svg-html">
							<TextControl
								label={ __( 'Icon SVG HTML', 'generateblocks' ) }
								value={ attributes[ attrIcon ] }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrIcon' ] ]: sanitizeSVG( value )
									} );
								} }
							/>
						</BaseControl>

						<BaseControl label={ __( 'General', 'generateblocks' ) }>
							<ul className="gblocks-icon-chooser">
							{
								Object.keys( generalSvgs ).map( ( svg, i ) => {
									return (
										<li key={ `editor-pblock-types-list-item-${ i }` }>
											<Tooltip text={ ( generalSvgs[ svg ]['label'] ) }>
												<Button
													isLarge
													className="editor-block-list-item-button"
													onClick={ () => {
														setAttributes( {
															[ this.props[ 'attrIcon' ] ]: renderToString( generalSvgs[ svg ]['icon'] )
														} );
													} }
												>
													<span className="editor-block-types-list__item-icon">
														{ generalSvgs[ svg ]['icon'] }
													</span>
												</Button>
											</Tooltip>
										</li>
									);
								} )
							}
							</ul>
						</BaseControl>

						<BaseControl label={ __( 'Social', 'generateblocks' ) }>
							<ul className="gblocks-icon-chooser">
							{
								Object.keys( socialSvgs ).map( ( svg, i ) => {
									return (
										<li key={ `editor-pblock-types-list-item-${ i }` }>
											<Tooltip text={ ( socialSvgs[ svg ]['label'] ) }>
												<Button
													isLarge
													className="editor-block-list-item-button"
													onClick={ () => {
														setAttributes( {
															[ this.props[ 'attrIcon' ] ]: renderToString( socialSvgs[ svg ]['icon'] )
														} );
													} }
												>
													<span className="editor-block-types-list__item-icon">
														{ socialSvgs[ svg ]['icon'] }
													</span>
												</Button>
											</Tooltip>
										</li>
									);
								} )
							}
							</ul>
						</BaseControl>
					</div>
				}

				{ ( typeof attributes[ attrIconLocation ] !== 'undefined' && ! attributes[ attrRemoveText ] ) &&
					<SelectControl
						label={ __( 'Icon Location', 'generateblocks' ) }
						value={ attributes[ attrIconLocation ] }
						options={ locationOptions }
						onChange={ ( value ) => {
							let leftPadding 		= attributes.iconPaddingLeft,
								rightPadding 		= attributes.iconPaddingRight,
								rightPaddingTablet 	= attributes.iconPaddingRightTablet,
								leftPaddingTablet 	= attributes.iconPaddingLeftTablet,
								rightPaddingMobile 	= attributes.iconPaddingRightMobile,
								leftPaddingMobile 	= attributes.iconPaddingLeftMobile;

							if ( 'right' === value ) {
								if ( ! leftPadding && rightPadding ) {
									setAttributes( {
										'iconPaddingLeft': rightPadding,
										'iconPaddingRight': '',
									} );
								}

								if ( ! leftPaddingTablet && rightPaddingTablet ) {
									setAttributes( {
										'iconPaddingLeftTablet': rightPaddingTablet,
										'iconPaddingRightTablet': '',
									} );
								}

								if ( ! leftPaddingMobile && rightPaddingMobile ) {
									setAttributes( {
										'iconPaddingLeftMobile': rightPaddingMobile,
										'iconPaddingRightMobile': '',
									} );
								}
							}

							if ( 'left' === value ) {
								if ( ! rightPadding && leftPadding ) {
									setAttributes( {
										'iconPaddingRight': leftPadding,
										'iconPaddingLeft': '',
									} );
								}

								if ( ! rightPaddingTablet && leftPaddingTablet ) {
									setAttributes( {
										'iconPaddingRightTablet': leftPaddingTablet,
										'iconPaddingLeftTablet': '',
									} );
								}

								if ( ! rightPaddingMobile && leftPaddingMobile ) {
									setAttributes( {
										'iconPaddingRightMobile': leftPaddingMobile,
										'iconPaddingLeftMobile': '',
									} );
								}
							}

							setAttributes( {
								[ this.props[ 'attrIconLocation' ] ]: value
							} );
						} }
					/>
				}

				{ ( typeof attributes[ attrRemoveText ] !== 'undefined' ) &&
					<ToggleControl
						label={ __( 'Remove Text', 'generateblocks' ) }
						checked={ !! attributes[ attrRemoveText ] }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrRemoveText' ] ]: value
							} );
						} }
					/>
				}

				{ typeof attributes[ attrAriaLabel ] !== 'undefined' && !! attributes[ attrRemoveText ] &&
					<TextControl
						label={ __( 'ARIA Label', 'generateblocks' ) }
						help={ __( 'Helpful to people using screen readers.', 'generateblocks' ) }
						value={ attributes[ attrAriaLabel ] }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrAriaLabel' ] ]: value
							} );
						} }
					/>
				}
			</Fragment>
		);
	}
}

export default IconPicker;

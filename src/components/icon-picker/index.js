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
import {
	__,
} from '@wordpress/i18n';

import {
	Component,
	Fragment,
	renderToString,
} from '@wordpress/element';

import {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Tooltip,
	Button,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

import {
	applyFilters,
} from '@wordpress/hooks';

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
			id,
		} = this.props;

		let iconSVGSets = {
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
		};

		iconSVGSets = applyFilters( 'generateblocks.editor.iconSVGSets', iconSVGSets, { attributes } );

		const flexAttributes = {};

		if ( ! attributes.display.includes( 'flex' ) ) {
			flexAttributes.display = 'headline' === id ? 'flex' : 'inline-flex';
		}

		if ( ! attributes.alignItems ) {
			flexAttributes.alignItems = 'center';
		}

		if ( ! attributes.columnGap ) {
			flexAttributes.columnGap = '0.5em';
		}

		const styleAttributes = {};

		if ( ! attributes.iconStyles.height ) {
			styleAttributes.height = '1em';
		}

		if ( ! attributes.iconStyles.width ) {
			styleAttributes.width = '1em';
		}

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
									hasIcon: true,
									...flexAttributes,
									iconStyles: {
										...styleAttributes,
									},
								} );
							} else {
								setAttributes( {
									hasIcon: false,
								} );
							}
						} }
					/>

					<div className="gb-icon-preview">
						<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( attributes[ attrIcon ] ) } } />

						<Button
							size="small"
							className="reset-icon is-secondary"
							onClick={ () => {
								setAttributes( {
									[ this.props[ 'attrIcon' ] ]: '', // eslint-disable-line dot-notation
									hasIcon: false,
									[ this.props[ 'attrRemoveText' ] ]: false, // eslint-disable-line dot-notation
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
					{
						Object.keys( iconSVGSets ).map( ( svg, i ) => {
							const svgItems = iconSVGSets[ svg ].svgs;

							return (
								<PanelBody className="gblocks-panel-label gblocks-icon-panel" title={ iconSVGSets[ svg ].group } initialOpen={ false } key={ i }>
									<PanelRow>
										<BaseControl>
											<ul className="gblocks-icon-chooser">
												{
													Object.keys( svgItems ).map( ( svgItem, index ) => {
														return (
															<li key={ `editor-pblock-types-list-item-${ index }` }>
																<Tooltip text={ ( svgItems[ svgItem ].label ) }>
																	<Button
																		className="editor-block-list-item-button"
																		onClick={ () => {
																			let iconValue = svgItems[ svgItem ].icon;

																			if ( 'string' !== typeof iconValue ) {
																				iconValue = renderToString( iconValue );
																			}

																			setAttributes( {
																				[ this.props.attrIcon ]: iconValue,
																				hasIcon: true,
																				...flexAttributes,
																				iconStyles: {
																					...styleAttributes,
																				},
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

				{ ( typeof attributes[ attrIconLocation ] !== 'undefined' && ! attributes[ attrRemoveText ] && !! attributes[ attrIcon ] ) &&
					<SelectControl
						label={ __( 'Icon Location', 'generateblocks' ) }
						value={ attributes[ attrIconLocation ] }
						options={ locationOptions }
						onChange={ ( value ) => {
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

/**
 * Internal dependencies
 */
import './editor.scss';
import googleFonts from './google-fonts.json';
import UnitPicker from '../unit-picker';
import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';

/**
 * WordPress dependencies
 */
import {
	__,
} from '@wordpress/i18n';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

/**
 * Typography Component
 */
class TypographyControls extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showAdvancedTypography: 'true' === localStorage.getItem( 'generateblocksShowAdvancedTypography' ) || false,
		};
	}

	render() {
		const {
			setAttributes,
			attributes,
			device = '',
			showFontSize = false,
			showFontFamily = false,
			showFontWeight = false,
			showTextTransform = false,
			showLineHeight = false,
			showLetterSpacing = false,
			disableAdvancedToggle = false,
			fontSizePlaceholder = '17',
		} = this.props;

		const fonts = [
			{ value: '', label: __( 'Select font', 'generateblocks' ) },
			{ value: 'Arial', label: 'Arial' },
			{ value: 'Helvetica', label: 'Helvetica' },
			{ value: 'Times New Roman', label: 'Times New Roman' },
			{ value: 'Georgia', label: 'Georgia' },
		];

		Object.keys( googleFonts ).slice( 0, 20 ).forEach( ( k ) => {
			fonts.push(
				{ value: k, label: k }
			);
		} );

		fonts.push(
			{ value: 'other', label: __( 'Other', 'generateblocks' ) }
		);

		let weight = [
			{ value: '', 		label: __( 'Default', 'generateblocks' ) },
			{ value: 'normal', 	label: __( 'Normal', 'generateblocks' ) },
			{ value: 'bold', 	label: __( 'Bold', 'generateblocks' ) },
			{ value: '100', 	label: '100' },
			{ value: '200', 	label: '200' },
			{ value: '300', 	label: '300' },
			{ value: '400', 	label: '400' },
			{ value: '500', 	label: '500' },
			{ value: '600', 	label: '600' },
			{ value: '700', 	label: '700' },
			{ value: '800', 	label: '800' },
			{ value: '900', 	label: '900' },
		];

		const transform = [
			{ value: '', 			label: __( 'Default', 'generateblocks' ) },
			{ value: 'uppercase', 	label: __( 'Uppercase', 'generateblocks' ) },
			{ value: 'lowercase', 	label: __( 'Lowercase', 'generateblocks' ) },
			{ value: 'capitalize', 	label: __( 'Capitalize', 'generateblocks' ) },
			{ value: 'initial', 	label: __( 'Normal', 'generateblocks' ) },
		];

		if ( typeof googleFonts[ attributes.fontFamily ] !== 'undefined' && typeof googleFonts[ attributes.fontFamily ].weight !== 'undefined' ) {
			weight = [
				{ value: '', label: __( 'Default', 'generateblocks' ) },
				{ value: 'normal', label: __( 'Normal', 'generateblocks' ) },
				{ value: 'bold', label: __( 'Bold', 'generateblocks' ) },
			];

			googleFonts[ attributes.fontFamily ].weight.filter( function( k ) {
				const hasLetters = k.match( /[a-z]/g );
				const hasNumbers = k.match( /[0-9]/g );

				if ( ( hasLetters && hasNumbers ) || 'italic' === k || 'regular' === k ) {
					return false;
				}

				return true;
			} ).forEach( ( k ) => {
				weight.push(
					{ value: k, label: k }
				);
			} );
		}

		const onFontChange = ( value ) => {
			if ( 'other' === value ) {
				value = '';
			}

			let fontWeight = attributes.fontWeight; // eslint-disable-line no-unused-vars

			setAttributes( { fontFamily: value } );

			if ( attributes.fontWeight && Object.values( weight ).indexOf( attributes.fontWeight ) < 0 ) {
				fontWeight = ''; // eslint-disable-line no-unused-vars
			}

			if ( typeof googleFonts[ value ] !== 'undefined' ) {
				setAttributes( {
					'googleFont': true, // eslint-disable-line quote-props
					'fontFamilyFallback': googleFonts[ value ].fallback, // eslint-disable-line quote-props
					'googleFontVariants': googleFonts[ value ].weight.join( ', ' ), // eslint-disable-line quote-props
				} );
			} else {
				setAttributes( {
					'googleFont': false, // eslint-disable-line quote-props
					'fontFamilyFallback': '', // eslint-disable-line quote-props
					'googleFontVariants': '', // eslint-disable-line quote-props
				} );
			}
		};

		const onFontShortcut = ( event ) => {
			setAttributes( { 'fontFamily': event.target.value } ); // eslint-disable-line quote-props
			onFontChange( event.target.value );
		};

		const getValue = ( value, setDevice ) => {
			const valueName = value + setDevice;

			return attributes[ valueName ];
		};

		const getAttributeName = ( name, setDevice ) => {
			const attributeName = name + setDevice;

			return attributeName;
		};

		let showAdvancedToggle = this.state.showAdvancedTypography;

		if ( disableAdvancedToggle ) {
			showAdvancedToggle = true;
		}

		return (
			<Fragment>
				<div className={ 'components-gblocks-typography-weight-transform' }>
					{ showFontWeight &&
						<SelectControl
							label={ __( 'Weight', 'generateblocks' ) }
							value={ attributes.fontWeight }
							options={ weight }
							onChange={ ( value ) => {
								setAttributes( {
									'fontWeight': value, // eslint-disable-line quote-props
								} );
							} }
							className="components-base-control"
						/>
					}

					{ showTextTransform &&
						<SelectControl
							label={ __( 'Transform', 'generateblocks' ) }
							value={ attributes.textTransform }
							options={ transform }
							onChange={ ( value ) => {
								setAttributes( {
									'textTransform': value, // eslint-disable-line quote-props
								} );
							} }
							className="components-base-control"
						/>
					}
				</div>

				{ ! disableAdvancedToggle &&
					<ToggleControl
						label={ __( 'Show Advanced Typography', 'generateblocks' ) }
						checked={ !! this.state.showAdvancedTypography }
						onChange={ ( value ) => {
							localStorage.setItem( 'generateblocksShowAdvancedTypography', value );

							this.setState( {
								showAdvancedTypography: value,
							} );
						} }
					/>
				}

				{ showFontFamily && showAdvancedToggle &&
					<BaseControl className={ 'gblocks-font-family-shortcuts' }>
						<span className="components-base-control__label">{ __( 'Font Family', 'generateblocks' ) }</span>

						<select
							className="components-select-control__input components-select-control__input--gblocks-fontfamily"
							onChange={ onFontShortcut }
							onBlur={ onFontShortcut }
						>
							{ fonts.map( ( option, index ) =>
								<option
									key={ `${ option.label }-${ option.value }-${ index }` }
									value={ option.value }
								>
									{ option.label }
								</option>
							) }
						</select>
					</BaseControl>
				}

				{ showFontFamily && showAdvancedToggle &&
					<TextControl
						value={ attributes.fontFamily }
						placeholder={ __( 'Enter font name', 'generateblocks' ) }
						onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
					/>
				}

				{ showFontFamily && '' !== attributes.fontFamily && showAdvancedToggle &&
					<Fragment>
						<ToggleControl
							label={ __( 'Google Font', 'generateblocks' ) }
							checked={ !! attributes.googleFont }
							onChange={ ( value ) => {
								setAttributes( {
									'googleFont': value, // eslint-disable-line quote-props
								} );

								if ( value ) {
									if ( typeof googleFonts[ attributes.fontFamily ] !== 'undefined' ) {
										setAttributes( {
											'fontFamilyFallback': googleFonts[ attributes.fontFamily ].fallback, // eslint-disable-line quote-props
											'googleFontVariants': googleFonts[ attributes.fontFamily ].weight.join( ', ' ), // eslint-disable-line quote-props
										} );
									}
								}
							} }
						/>

						{ !! attributes.googleFont &&
							<TextControl
								label={ __( 'Variants', 'generateblocks' ) }
								value={ attributes.googleFontVariants }
								placeholder={ __( '300, 400, 400i', 'generateblocks' ) }
								onChange={ ( value ) => {
									setAttributes( {
										'googleFontVariants': value, // eslint-disable-line quote-props
									} );
								} }
							/>
						}
					</Fragment>
				}

				{ showFontFamily && showAdvancedToggle &&
					<TextControl
						label={ __( 'Font Family Fallback', 'generateblocks' ) }
						value={ attributes.fontFamilyFallback }
						placeholder={ __( 'sans-serif', 'generateblocks' ) }
						onChange={ ( value ) => {
							setAttributes( {
								'fontFamilyFallback': value, // eslint-disable-line quote-props
							} );
						} }
					/>
				}

				{ showFontSize && showAdvancedToggle &&
					<BaseControl>
						<UnitPicker
							label={ __( 'Font Size', 'generateblocks' ) }
							value={ attributes.fontSizeUnit }
							units={ [ 'px', 'em', '%' ] }
							onClick={ ( value ) => {
								setAttributes( {
									fontSizeUnit: value,
								} );
							} }
						/>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'fontSize', device ) || '' }
								placeholder={ getResponsivePlaceholder( 'fontSize', attributes, device, fontSizePlaceholder ) }
								onChange={ ( value ) => {
									const name = getAttributeName( 'fontSize', device );

									setAttributes( {
										[ name ]: value,
									} );
								} }
								onBlur={ () => {
									const name = getAttributeName( 'fontSize', device );

									if ( '' !== getValue( 'fontSize', device ) ) {
										setAttributes( {
											[ name ]: parseFloat( getValue( 'fontSize', device ) ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
								min={ 1 }
								autoComplete="off"
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									const name = getAttributeName( 'fontSize', device );

									setAttributes( {
										[ name ]: this.props.defaultFontSize,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</BaseControl>
				}

				{ showLineHeight && showAdvancedToggle &&
					<BaseControl>
						<UnitPicker
							label={ __( 'Line Height', 'generateblocks' ) }
							value={ attributes.lineHeightUnit }
							units={ [ 'px', 'em', '%' ] }
							onClick={ ( value ) => {
								setAttributes( {
									lineHeightUnit: value,
								} );
							} }
						/>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'lineHeight', device ) || 0 === getValue( 'lineHeight', device ) ? getValue( 'lineHeight', device ) : '' }
								placeholder={ getResponsivePlaceholder( 'lineHeight', attributes, device, '' ) }
								onChange={ ( value ) => {
									const name = getAttributeName( 'lineHeight', device );

									setAttributes( {
										[ name ]: value,
									} );
								} }
								onBlur={ () => {
									const name = getAttributeName( 'lineHeight', device );

									if ( '' !== getValue( 'lineHeight', device ) ) {
										setAttributes( {
											[ name ]: parseFloat( getValue( 'lineHeight', device ) ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
								min={ 0 }
								step={ .1 }
								autoComplete="off"
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									const name = getAttributeName( 'lineHeight', device );

									setAttributes( {
										[ name ]: this.props.defaultLineHeight,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</BaseControl>
				}

				{ showLetterSpacing && showAdvancedToggle &&
					<BaseControl>
						<UnitPicker
							label={ __( 'Letter Spacing', 'generateblocks' ) }
							value={ 'em' }
							units={ [ 'em' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'letterSpacing', device ) || '' }
								placeholder={ getResponsivePlaceholder( 'letterSpacing', attributes, device, '0.01' ) }
								onChange={ ( value ) => {
									const name = getAttributeName( 'letterSpacing', device );

									setAttributes( {
										[ name ]: value,
									} );
								} }
								onBlur={ () => {
									const name = getAttributeName( 'letterSpacing', device );

									if ( '' !== getValue( 'letterSpacing', device ) ) {
										setAttributes( {
											[ name ]: parseFloat( getValue( 'letterSpacing', device ) ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
								min={ -1 }
								step={ .01 }
								autoComplete="off"
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									const name = getAttributeName( 'letterSpacing', device );

									setAttributes( {
										[ name ]: this.props.defaultLetterSpacing,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</BaseControl>
				}
			</Fragment>
		);
	}
}

export default TypographyControls;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import googleFonts from './google-fonts';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;

const {
	BaseControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	ButtonGroup,
	Tooltip,
	Button,
} = wp.components;

/**
 * Typography Component
 */
class TypographyControls extends Component {

	constructor( props ) {
		super( ...arguments );
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
			defaultFontSize,
			defaultFontSizeUnit,
			defaultLineHeight,
			defaultLineHeightUnit,
			defaultLetterSpacing,
			fontSizePlaceholder = '17',
		} = this.props;

		const fonts = [
			{ value: '', label: __( 'Select font...' ) },
			{ value: 'Arial', label: 'Arial' },
			{ value: 'Helvetica', label: 'Helvetica' },
			{ value: 'Times New Roman', label: 'Times New Roman' },
			{ value: 'Georgia', label: 'Georgia' },
		];

		Object.keys( googleFonts ).slice( 0, 20 ).map( ( k ) => {
			fonts.push(
				{ value: k, label: k }
			);
		} );

		fonts.push(
			{ value: 'other', label: __( 'Other', 'generateblocks' ) }
		);

		var weight = [
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

				if ( ( hasLetters && hasNumbers ) || 'italic' === k ) {
					return false;
				}

				return true;
			} ).map( ( k ) => {
				weight.push(
					{ value: k, label: k }
				);
			} );
		}

		const onFontChange = ( value ) => {
			if ( 'other' === value ) {
				value = '';
			}

			let fontWeight = attributes.fontWeight;

			setAttributes( { 'fontFamily': value } );

			if ( attributes.fontWeight && Object.values( weight ).indexOf( attributes.fontWeight ) < 0 ) {
				fontWeight = '';
			}

			if ( typeof googleFonts[ value ] !== 'undefined' ) {
				setAttributes( {
					'googleFont': true,
					'fontFamilyFallback': googleFonts[ value ].fallback,
					'googleFontVariants': googleFonts[ value ].weight.join( ', ' ),
				} );
			} else {
				setAttributes( {
					'googleFont': false,
					'fontFamilyFallback': '',
					'googleFontVariants': '',
				} );
			}
		};

		const onFontShortcut = ( event ) => {
			setAttributes( { 'fontFamily': event.target.value } );
			onFontChange( event.target.value );
		};

		let unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'em',
			},
			{
				name: _x( 'Percentage', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: '%',
			},
		];

		const getValue = ( value, device ) => {
			const valueName = value + device;

			return attributes[ valueName ];
		};

		const getAttributeName = ( name, device ) => {
			const attributeName = name + device;

			return attributeName;
		};

		let showAdvancedToggle = attributes.showAdvancedTypography;

		if ( disableAdvancedToggle ) {
			showAdvancedToggle = true;
		}

		let responsiveFontSizePlaceholder = fontSizePlaceholder;

		if ( 'Tablet' === device && attributes.fontSize ) {
			responsiveFontSizePlaceholder = attributes.fontSize;
		}

		if ( 'Mobile' === device ) {
			if ( attributes.fontSizeTablet ) {
				responsiveFontSizePlaceholder = attributes.fontSizeTablet;
			} else if ( attributes.fontSize ) {
				responsiveFontSizePlaceholder = attributes.fontSize;
			}
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
									'fontWeight': value
								} );

								isValidGoogleURL( attributes.fontFamily, value );
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
									'textTransform': value
								} );
							} }
							className="components-base-control"
						/>
					}
				</div>

				{ ! disableAdvancedToggle &&
					<ToggleControl
						label={ __( 'Show Advanced Typography', 'generateblocks' ) }
						checked={ !! attributes.showAdvancedTypography }
						onChange={ ( value ) => {
							setAttributes( {
								'showAdvancedTypography': value,
							} );
						} }
					/>
				}

				{ showFontFamily && showAdvancedToggle &&
					<BaseControl className={ 'gblocks-font-family-shortcuts' } label={ __( 'Font Family', 'generateblocks' ) }>
						<select
							className="components-select-control__input components-select-control__input--gblocks-fontfamily"
							onChange={ onFontShortcut }
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
						placeholder={ __( 'Enter font name...', 'generateblocks' ) }
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
									'googleFont': value,
								} );

								if ( value ) {
									if ( typeof googleFonts[ attributes.fontFamily ] !== 'undefined' ) {
										setAttributes( {
											'fontFamilyFallback': googleFonts[ attributes.fontFamily ].fallback,
											'googleFontVariants': googleFonts[ attributes.fontFamily ].weight.join( ', ' ),
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
										'googleFontVariants': value,
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
								'fontFamilyFallback': value,
							} );
						} }
					/>
				}

				{ showFontSize && showAdvancedToggle &&
					<Fragment>
						<div className="components-gblocks-typography-control__header">
							<div className="components-gblocks-typography-control__label components-base-control__label">
								{ __( 'Font Size', 'generateblocks' ) }
							</div>

							<div className="components-gblocks-control__units">
								<ButtonGroup className="components-gblocks-typography-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
									{ unitSizes.map( ( unit, i ) =>
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
											<Button
												key={ unit.unitValue }
												className={ 'components-gblocks-typography-control__units--' + unit.name }
												isSmall
												isPrimary={ attributes.fontSizeUnit === unit.unitValue }
												aria-pressed={ attributes.fontSizeUnit === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
												onClick={ () => setAttributes( { 'fontSizeUnit': unit.unitValue } ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div>
						</div>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'fontSize', device ) || '' }
								placeholder={ responsiveFontSizePlaceholder }
								onChange={ ( value ) => {
									const name = getAttributeName( 'fontSize', device );

									setAttributes( {
										[ name ]: parseFloat( value )
									} );
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
										[ name ]: this.props.defaultFontSize
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</Fragment>
				}

				{ showLineHeight && showAdvancedToggle &&
					<Fragment>
						<div className="components-gblocks-typography-control__header">
							<div className="components-gblocks-typography-control__label components-base-control__label">
								{ __( 'Line Height', 'generateblocks' ) }
							</div>

							<div className="components-gblocks-control__units">
								<ButtonGroup className="components-gblocks-typography-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
									{ unitSizes.map( ( unit, i ) =>
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
											<Button
												key={ unit.unitValue }
												className={ 'components-gblocks-typography-control__units--' + unit.name }
												isSmall
												isPrimary={ attributes.lineHeightUnit === unit.unitValue }
												aria-pressed={ attributes.lineHeightUnit === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
												onClick={ () => setAttributes( { 'lineHeightUnit': unit.unitValue } ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div>
						</div>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'lineHeight', device ) || '' }
								placeholder="1.5"
								onChange={ ( value ) => {
									const name = getAttributeName( 'lineHeight', device );

									setAttributes( {
										[ name ]: value
									} );
								} }
								onBlur={ () => {
									const name = getAttributeName( 'lineHeight', device );

									setAttributes( {
										[ name ]: parseFloat( getValue( 'lineHeight', device ) )
									} );
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus()
								} }
								min={ 0 }
								autoComplete="off"
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									const name = getAttributeName( 'lineHeight', device );

									setAttributes( {
										[ name ]: this.props.defaultLineHeight
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</Fragment>
				}

				{ showLetterSpacing && showAdvancedToggle &&
					<Fragment>
						<div className="components-gblocks-typography-control__header">
							<div className="components-gblocks-control__label">
								{ __( 'Letter Spacing', 'generateblocks' ) }
							</div>

							<div className="components-gblocks-control__units">
								<Tooltip text={ __( 'Em Units' ) } key={ 'letter-spacing-unit' }>
									<Button
										key={ 'letter-spacing-unit' }
										isSmall
										isPrimary={ true }
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										aria-label={ __( 'Em Units' ) }
									>
										em
									</Button>
								</Tooltip>
							</div>
						</div>

						<div className="components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ getValue( 'letterSpacing', device ) || '' }
								placeholder="0.01"
								onChange={ ( value ) => {
									const name = getAttributeName( 'letterSpacing', device );

									setAttributes( {
										[ name ]: value
									} );
								} }
								onBlur={ () => {
									const name = getAttributeName( 'letterSpacing', device );

									setAttributes( {
										[ name ]: parseFloat( getValue( 'letterSpacing', device ) )
									} );
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus()
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
										[ name ]: this.props.defaultLetterSpacing
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default TypographyControls;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import googleFonts from './fonts';

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
			className,
			setAttributes,
			valueFontFamily,
			attrFontFamily,
			valueGoogleFont,
			attrGoogleFont,
			valueShowAdvancedTypography,
			attrShowAdvancedTypography,
			valueFontFamilyFallback,
			attrFontFamilyFallback,
			valueFontWeight,
			attrFontWeight,
			valueTextTransform,
			attrTextTransform,
			valueFontSize,
			attrFontSize,
			valueFontSizeUnit,
			attrFontSizeUnit,
			valueLineHeight,
			attrLineHeight,
			valueLineHeightUnit,
			attrLineHeightUnit,
			valueLetterSpacing,
			attrLetterSpacing,
			valueLetterSpacingUnit,
			attrLetterSpacingUnit,
			defaultFontSize,
			defaultFontSizeUnit,
			defaultLineHeight,
			defaultLineHeightUnit,
			defaultLetterSpacing,
			uniqueId,
		} = this.props;

		const fonts = [
			{ value: '', label: __( 'Select font...' ) },
			{ value: 'Arial', label: 'Arial' },
			{ value: 'Helvetica', label: 'Helvetica' },
			{ value: 'Times New Roman', label: 'Times New Roman' },
			{ value: 'Georgia', label: 'Georgia' },
		];

		//Add Google Fonts
		Object.keys( googleFonts ).map( ( k ) => {
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

		if ( typeof googleFonts[ this.props['valueFontFamily'] ] !== 'undefined' && typeof googleFonts[ this.props['valueFontFamily'] ].weight !== 'undefined' ) {
			weight = [
				{ value: '', label: __( 'Default', 'generateblocks' ) },
				{ value: 'normal', label: __( 'Normal', 'generateblocks' ) },
				{ value: 'bold', label: __( 'Bold', 'generateblocks' ) },
			];

			googleFonts[ this.props['valueFontFamily'] ].weight.map( ( k ) => {
				weight.push(
					{ value: k, label: k }
				);
			} );
		}

		const onFontChange = ( value ) => {
			if ( 'other' === value ) {
				value = '';
			}

			let isGoogle,
				fontWeight = this.props['valueFontWeight'];

			setAttributes( { [ this.props['attrFontFamily'] ]: value } );

			if ( this.props['valueFontWeight'] && Object.values( weight ).indexOf( this.props['valueFontWeight'] ) < 0 ) {
				fontWeight = '';
			}

			if ( typeof googleFonts[ value ] !== 'undefined' ) {
				setAttributes( {
					[ this.props['attrGoogleFont'] ]: true,
					[ this.props['attrFontFamilyFallback'] ]: googleFonts[ value ].fallback,
				} );
				isGoogle = true;
			} else {
				setAttributes( {
					[ this.props['attrGoogleFont'] ]: false,
					[ this.props['attrFontFamilyFallback'] ]: '',
				} );
				isGoogle = false;
			}
		};

		const onFontShortcut = ( event ) => {
			setAttributes( { [ this.props['attrFontFamily'] ]: event.target.value } );
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

		return (
			<Fragment>
				<div className={ 'components-gblocks-typography-weight-transform' }>
					{ ( typeof valueFontWeight !== 'undefined' ) &&
						<SelectControl
							label={ __( 'Weight', 'generateblocks' ) }
							value={ valueFontWeight }
							options={ weight }
							onChange={ ( value ) => {
								setAttributes( {
									[ this.props[ 'attrFontWeight' ] ]: value
								} );
							} }
							className="components-base-control"
						/>
					}

					{ ( typeof valueTextTransform !== 'undefined' ) &&
						<SelectControl
							label={ __( 'Transform', 'generateblocks' ) }
							value={ valueTextTransform }
							options={ transform }
							onChange={ ( nextTextTransform ) => {
								setAttributes( {
									[ this.props[ 'attrTextTransform' ] ]: nextTextTransform
								} )
							} }
							className="components-base-control"
						/>
					}
				</div>

				<ToggleControl
					label={ __( 'Show Advanced Typography', 'generateblocks' ) }
					checked={ !! valueShowAdvancedTypography }
					onChange={ ( value ) => {
						setAttributes( {
							[ this.props[ 'attrShowAdvancedTypography' ] ]: value,
						} );
					} }
				/>

				{ ( typeof valueFontFamily !== 'undefined' && valueShowAdvancedTypography ) &&
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

				{ ( typeof valueFontFamily !== 'undefined' && valueShowAdvancedTypography ) &&
					<TextControl
						value={ valueFontFamily }
						placeholder={ __( 'Enter font name...', 'generateblocks' ) }
						onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
					/>
				}

				{ ( typeof valueFontFamily !== 'undefined' && '' !== valueFontFamily && valueShowAdvancedTypography ) &&
					<ToggleControl
						label={ __( 'Google Font', 'generateblocks' ) }
						checked={ !! valueGoogleFont }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrGoogleFont' ] ]: value,
							} );
						} }
					/>
				}

				{ ( typeof valueFontFamilyFallback !== 'undefined' && valueShowAdvancedTypography ) && (
					<TextControl
						label={ __( 'Font Family Fallback', 'generateblocks' ) }
						value={ valueFontFamilyFallback }
						placeholder={ __( 'sans-serif', 'generateblocks' ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrFontFamilyFallback' ] ]: value,
							} );
						} }
					/>
				) }

				{ valueShowAdvancedTypography &&
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
												isPrimary={ valueFontSizeUnit === unit.unitValue }
												aria-pressed={ valueFontSizeUnit === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
												onClick={ () => setAttributes( { [ this.props[ 'attrFontSizeUnit' ] ]: unit.unitValue } ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div>
						</div>

						<div className="components-gblocks-typography-control__inputs">
							<RangeControl
								value={ parseFloat( valueFontSize ) || '' }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrFontSize' ] ]: value
									} );
								} }
								min={ 1 }
								max={ 200 }
								step={ 1 }
								initialPosition={ this.props.defaultFontSize ? this.props.defaultFontSize : 17 }
								allowReset={ true }
							/>
						</div>
					</Fragment>
				}

				{ 'disable' !== this.props[ 'attrLineHeight'] && valueShowAdvancedTypography &&
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
												isPrimary={ valueLineHeightUnit === unit.unitValue }
												aria-pressed={ valueLineHeightUnit === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
												onClick={ () => setAttributes( { [ this.props[ 'attrLineHeightUnit' ] ]: unit.unitValue } ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div>
						</div>

						<div className="components-gblocks-typography-control__inputs">
							<RangeControl
								value={ parseFloat( valueLineHeight ) || '' }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrLineHeight' ] ]: value
									} );
								} }
								min={ 0 }
								max={ 3 }
								step={ 0.01 }
								initialPosition={ this.props.defaultLineHeight ? this.props.defaultLineHeight : 1 }
								allowReset={ true }
							/>
						</div>
					</Fragment>
				}

				{ 'disable' !== this.props[ 'attrLineHeight'] && valueShowAdvancedTypography &&
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
							<RangeControl
								value={ parseFloat( valueLetterSpacing ) || '' }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrLetterSpacing' ] ]: value
									} );
								} }
								min={ -1 }
								max={ 3 }
								step={ .01 }
								initialPosition={ this.props.defaultLetterSpacing ? this.props.defaultLetterSpacing : 0.02 }
								allowReset={ true }
							/>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default TypographyControls;

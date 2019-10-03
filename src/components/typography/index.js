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
const { BaseControl, RangeControl, SelectControl, ToggleControl, TextControl, ButtonGroup, Tooltip, Button } = wp.components;

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
			valueFontWeight,
			attrFontWeight,
			valueTextTransform,
			attrTextTransform,
			valueFontSize,
			attrFontSize,
			valueFontSizeUnit,
			attrFontSizeUnit,
			initialFontSize,
			valueLineHeight,
			attrLineHeight,
			valueLineHeightUnit,
			attrLineHeightUnit,
			initialLineHeight,
			valueLetterSpacing,
			attrLetterSpacing,
			valueLetterSpacingUnit,
			attrLetterSpacingUnit,
			initialLetterSpacing,
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
			{ value: 'other', label: __( 'Other', 'flexblocks' ) }
		);

		var weight = [
			{ value: '', 		label: __( 'Default' ) },
			{ value: 'normal', 	label: __( 'Normal' ) },
			{ value: 'bold', 	label: __( 'Bold' ) },
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
			{ value: '', 			label: __( 'Default' ) },
			{ value: 'uppercase', 	label: __( 'Uppercase' ) },
			{ value: 'lowercase', 	label: __( 'Lowercase' ) },
			{ value: 'capitalize', 	label: __( 'Capitalize' ) },
			{ value: 'initial', 	label: __( 'Normal' ) },
		];

		if ( typeof googleFonts[ this.props['valueFontFamily'] ] !== 'undefined' && typeof googleFonts[ this.props['valueFontFamily'] ].weight !== 'undefined' ) {
			weight = [
				{ value: '', label: __( 'Default' ) },
				{ value: 'normal', label: __( 'Normal' ) },
				{ value: 'bold', label: __( 'Bold' ) },
			];

			googleFonts[ this.props['valueFontFamily'] ].weight.map( ( k ) => {
				weight.push(
					{ value: k, label: k }
				);
			} );
		}

		const addGoogleStyle = ( value, isGoogle ) => {
			if ( ! isGoogle ) {
				return;
			}

			let ba = '';
			const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
			const link = document.createElement( 'link' );
			link.rel = 'stylesheet';

			if ( ba.length > 0 ) {
				//Load fonts on the header
				if ( ! ba.includes( value ) ) {
					link.href = 'https://fonts.googleapis.com/css?family=' + value.replace( / /g, '+' ) + googleFontsAttr;
					document.head.appendChild( link );
				}

				ba = ba.replace( ',' + value, '' );
				ba = ba + ',' + value;
			} else {
				link.href = 'https://fonts.googleapis.com/css?family=' + value.replace( / /g, '+' ) + googleFontsAttr;
				document.head.appendChild( link );

				ba = value;
			}
		};

		const saveGoogleMeta = ( value, weight, isGoogle ) => {
			const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
			const id = 'block_id_' + uniqueId;

			let googleFontMeta = {};

			const fontMeta = {
				name: value,
				variants: weight,
			};

			if ( 'bold' === weight || 'normal' === weight || '' === weight ) {
				delete fontMeta['variants'];
			}

			if ( typeof meta._flexblocks_google_fonts === 'undefined' || ( typeof meta._flexblocks_google_fonts !== 'undefined' && meta._flexblocks_google_fonts === '' ) ) {
				googleFontMeta = {};
			} else {
				googleFontMeta = JSON.parse( meta._flexblocks_google_fonts );
			}

			if ( typeof googleFontMeta[ id ] === 'undefined' ) {
				googleFontMeta[ id ] = {};
			}

			googleFontMeta[ id ] = fontMeta;

			if ( ! isGoogle ) {
				delete googleFontMeta[ id ];
			}

			console.log(JSON.stringify( googleFontMeta ));

			wp.data.dispatch( 'core/editor' ).editPost( {
				meta: {
					_flexblocks_google_fonts: JSON.stringify( googleFontMeta ),
				},
			} );

			addGoogleStyle( value, isGoogle );
		};

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
				setAttributes( { [ this.props['attrGoogleFont'] ]: true } );
				isGoogle = true;
			} else {
				setAttributes( { [ this.props['attrGoogleFont'] ]: false } );
				isGoogle = false;
			}

			saveGoogleMeta( value, fontWeight, isGoogle );
		};

		const onFontShortcut = ( event ) => {
			setAttributes( { [ this.props['attrFontFamily'] ]: event.target.value } );
			onFontChange( event.target.value );
		};

		let unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup' ),
				unitValue: 'em',
			},
			{
				name: _x( 'Percentage', 'A size unit for CSS markup' ),
				unitValue: '%',
			},
		];

		return (
			<Fragment>
				{ ( typeof valueFontFamily !== 'undefined' ) ?
					<BaseControl className={ 'fx-font-family-shortcuts' } label={ __( 'Font Family', 'flexblocks' ) }>
						<select
							className="components-select-control__input components-select-control__input--flexblocks-fontfamily"
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
					</BaseControl> : null
				}

				{ ( typeof valueFontFamily !== 'undefined' ) ?
					<TextControl
						value={ valueFontFamily }
						placeholder={ __( 'Enter font name...', 'flexblocks' ) }
						onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
					/> : null
				}

				{ ( typeof valueFontFamily !== 'undefined' && '' !== valueFontFamily ) ?
					<ToggleControl
						label={ __( 'Google Font', 'flexblocks' ) }
						checked={ !! valueGoogleFont }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrGoogleFont' ] ]: value,
							} );

							saveGoogleMeta( valueFontFamily, valueFontWeight, value );
						} }
					/> : null
				}

				{ ( typeof valueFontWeight !== 'undefined' ) ?
					<SelectControl
						label={ __( 'Weight' ) }
						value={ valueFontWeight }
						options={ weight }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrFontWeight' ] ]: value
							} );

							saveGoogleMeta( valueFontFamily, value, valueGoogleFont );
						} }
						className="components-base-control"
					/> : null
				}

				{ ( typeof valueTextTransform !== 'undefined' ) ?
					<SelectControl
						label={ __( 'Transform' ) }
						value={ valueTextTransform }
						options={ transform }
						onChange={ ( nextTextTransform ) => setAttributes( { [ this.props[ 'attrTextTransform' ] ]: nextTextTransform } ) }
						className="components-base-control"
					/> : null
				}

				{ ( typeof valueFontSize !== 'undefined' ) &&
					<Fragment>
						<div className="components-fx-typography-control__header">
							<div className="components-fx-typography-control__label components-base-control__label">
								{ __( 'Font Size', 'flexblocks' ) }
							</div>

							{ ( typeof valueFontSizeUnit !== 'undefined' ) ?
								<div className="components-fx-typography-control__units">
									<ButtonGroup className="components-fx-typography-control__units" aria-label={ __( 'Select Units' ) }>
										{ unitSizes.map( ( unit, i ) =>
											/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
											<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) }>
												<Button
													key={ unit.unitValue + '-' + i }
													className={ 'components-fx-typography-control__units--' + unit.name }
													isSmall
													isPrimary={ valueFontSizeUnit === unit.unitValue }
													aria-pressed={ valueFontSizeUnit === unit.unitValue }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ sprintf( __( '%s Units' ), unit.name ) }
													onClick={ () => setAttributes( { [ this.props[ 'attrFontSizeUnit' ] ]: unit.unitValue } ) }
												>
													{ unit.unitValue }
												</Button>
											</Tooltip>
										) }
									</ButtonGroup>
								</div> : null
							}
						</div>

						<div className="components-fx-typography-control__inputs">
							<RangeControl
								value={ parseFloat( valueFontSize ) || '' }
								onChange={ ( nextFontSize ) => setAttributes( { [ this.props[ 'attrFontSize' ] ]: nextFontSize } ) }
								min={ 1 }
								max={ 200 }
								step={ 1 }
								allowReset={ true }
								initialPosition={ [ this.props[ 'initialFontSize' ] ] }
							/>
						</div>
					</Fragment>
				}

				{ ( null !== valueLineHeight ) &&
					<Fragment>
						<div className="components-fx-typography-control__header">
							<div className="components-fx-typography-control__label components-base-control__label">
								{ __( 'Line Height', 'flexblocks' ) }
							</div>

							{ ( typeof valueFontSizeUnit !== 'undefined' ) ?
								<div className="components-fx-typography-control__units">
									<ButtonGroup className="components-fx-typography-control__units" aria-label={ __( 'Select Units' ) }>
										{ unitSizes.map( ( unit, i ) =>
											/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
											<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) }>
												<Button
													key={ unit.unitValue + '-' + i }
													className={ 'components-fx-typography-control__units--' + unit.name }
													isSmall
													isPrimary={ valueLineHeightUnit === unit.unitValue }
													aria-pressed={ valueLineHeightUnit === unit.unitValue }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ sprintf( __( '%s Units' ), unit.name ) }
													onClick={ () => setAttributes( { [ this.props[ 'attrLineHeightUnit' ] ]: unit.unitValue } ) }
												>
													{ unit.unitValue }
												</Button>
											</Tooltip>
										) }
									</ButtonGroup>
								</div> : null
							}
						</div>

						<div className="components-fx-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ valueLineHeight }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrLineHeight' ] ]: value
									} );
								} }
							/>
							<Button
								key={ uniqueId + '-reset-line-height' }
								isSmall
								onClick={ () => {
									setAttributes( {
										[ this.props[ 'attrLineHeight' ] ]: flexBlocksDefaults.headline.lineHeight,
										[ this.props[ 'attrLineHeightUnit' ] ]: flexBlocksDefaults.headline.lineHeightUnit
									} )
								} }
							>
								{ __( 'Reset', 'flexblocks' ) }
							</Button>
						</div>
					</Fragment>
				}

				{ ( null !== valueLetterSpacing ) &&
					<Fragment>
						<div className="components-fx-typography-control__header">
							<div className="components-fx-typography-control__label components-base-control__label">
								{ __( 'Letter Spacing', 'flexblocks' ) }
							</div>
						</div>

						<div className="components-fx-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ valueLetterSpacing }
								onChange={ ( value ) => {
									setAttributes( {
										[ this.props[ 'attrLetterSpacing' ] ]: value
									} );
								} }
							/>
							<Button
								key={ uniqueId + '-reset-letter-spacing' }
								isSmall
								onClick={ () => {
									setAttributes( {
										[ this.props[ 'attrLetterSpacing' ] ]: flexBlocksDefaults.headline.letterSpacing
									} )
								} }
							>
								{ __( 'Reset', 'flexblocks' ) }
							</Button>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default TypographyControls;

/**
 * Internal dependencies
 */
import './editor.scss';
import ColorPicker from '../color-picker';
import hasNumericValue from '../../utils/has-numeric-value';

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
	ToggleControl,
	TextControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Typography Component
 */
class GradientControl extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			attrGradient,
			attrGradientDirection,
			attrGradientColorOne,
			attrGradientColorOneOpacity,
			attrGradientColorStopOne,
			attrGradientColorTwo,
			attrGradientColorTwoOpacity,
			attrGradientColorStopTwo,
			defaultColorOne,
			defaultColorTwo,
		} = this.props;

		const {
			gradientSelector,
			innerZindex,
			useInnerContainer,
			position,
		} = attributes;

		const selectorHelp = 'element' === gradientSelector ? __( 'Displays behind the background image.', 'generateblocks' ) : __( 'Displays in front of the background image.', 'generateblocks' );

		return (
			<Fragment>
				<ToggleControl
					label={ __( 'Use Gradient', 'generateblocks' ) }
					checked={ !! attributes[ attrGradient ] }
					onChange={ ( value ) => {
						const props = this.props;
						let gradientDirection = attributes[ attrGradientDirection ],
							gradientColorOne = attributes[ attrGradientColorOne ],
							gradientColorTwo = attributes[ attrGradientColorTwo ];

						if ( value ) {
							gradientDirection = gradientDirection || 90;
							gradientColorOne = gradientColorOne || 'rgba(255, 255, 255, 0.1)';
							gradientColorTwo = gradientColorTwo || 'rgba(0, 0, 0, 0.30)';
						}

						setAttributes( {
							[ props[ 'attrGradient' ] ]: value, // eslint-disable-line dot-notation
							[ props[ 'attrGradientDirection' ] ]: gradientDirection, // eslint-disable-line dot-notation
							[ props[ 'attrGradientColorOne' ] ]: gradientColorOne, // eslint-disable-line dot-notation
							[ props[ 'attrGradientColorTwo' ] ]: gradientColorTwo, // eslint-disable-line dot-notation
						} );
					} }
				/>

				{ !! attributes[ attrGradient ] && (
					<Fragment>
						{ 'undefined' !== typeof gradientSelector &&
							<SelectControl
								label={ __( 'Selector', 'generateblocks' ) }
								help={ selectorHelp }
								value={ gradientSelector }
								options={ [
									{ label: __( 'Element', 'generateblocks' ), value: 'element' },
									{ label: __( 'Pseudo Element', 'generateblocks' ), value: 'pseudo-element' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										gradientSelector: value,
									} );

									if ( useInnerContainer && ! hasNumericValue( innerZindex ) && 'pseudo-element' === value ) {
										setAttributes( {
											innerZindex: 1,
										} );
									}

									if ( ! useInnerContainer && 'pseudo-element' === value && ! position ) {
										setAttributes( { position: 'relative' } );
									}
								} }
							/>
						}

						<BaseControl>
							<span className="components-base-control__label">{ __( 'Direction', 'generateblocks' ) }</span>

							<RangeControl
								value={ attributes[ attrGradientDirection ] ? attributes[ attrGradientDirection ] : 0 }
								onChange={ ( value ) => {
									setAttributes( {
										[ attrGradientDirection ]: value,
									} );
								} }
								min={ 0 }
								max={ 360 }
								step={ 1 }
								initialPosition={ 90 }
							/>
						</BaseControl>

						<BaseControl>
							<span className="components-base-control__label">{ __( 'Color One', 'generateblocks' ) }</span>

							<div className="gblocks-component-gradient-control">
								<ColorPicker
									value={ attributes[ attrGradientColorOne ] }
									alpha={ true }
									valueOpacity={ attributes[ attrGradientColorOneOpacity ] || 0 === attributes[ attrGradientColorOneOpacity ] ? attributes[ attrGradientColorOneOpacity ] : 1 }
									attrOpacity={ 'gradientColorOneOpacity' }
									onChange={ ( value ) =>
										setAttributes( {
											[ attrGradientColorOne ]: value,
										} )
									}
									onOpacityChange={ ( value ) =>
										setAttributes( {
											[ attrGradientColorOneOpacity ]: value,
										} )
									}
									onClear={ () =>
										setAttributes( {
											[ attrGradientColorOne ]: defaultColorOne,
										} )
									}
								/>

								<TextControl
									className={ 'gblocks-component-gradient-stop-value' }
									type={ 'text' }
									value={ attributes[ attrGradientColorStopOne ] || 0 === attributes[ attrGradientColorStopOne ] ? attributes[ attrGradientColorStopOne ] : '' }
									placeholder={ __( 'Stop position (%)', 'generateblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ attrGradientColorStopOne ]: value,
										} );
									} }
									onBlur={ () => {
										if ( attributes[ attrGradientColorStopOne ] || 0 === attributes[ attrGradientColorStopOne ] ) {
											setAttributes( {
												[ attrGradientColorStopOne ]: parseFloat( attributes[ attrGradientColorStopOne ] ),
											} );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>
							</div>
						</BaseControl>

						<BaseControl>
							<span className="components-base-control__label">{ __( 'Color Two', 'generateblocks' ) }</span>
							<div className="gblocks-component-gradient-control">
								<ColorPicker
									value={ attributes[ attrGradientColorTwo ] }
									alpha={ true }
									valueOpacity={ attributes[ attrGradientColorTwoOpacity ] || 0 === attributes[ attrGradientColorTwoOpacity ] ? attributes[ attrGradientColorTwoOpacity ] : 1 }
									attrOpacity={ 'gradientColorTwoOpacity' }
									onChange={ ( value ) =>
										setAttributes( {
											[ attrGradientColorTwo ]: value,
										} )
									}
									onOpacityChange={ ( value ) =>
										setAttributes( {
											[ attrGradientColorTwoOpacity ]: value,
										} )
									}
									onClear={ () =>
										setAttributes( {
											[ attrGradientColorTwo ]: defaultColorTwo,
										} )
									}
								/>

								<TextControl
									className={ 'gblocks-component-gradient-stop-value' }
									type={ 'text' }
									value={ attributes[ attrGradientColorStopTwo ] || 0 === attributes[ attrGradientColorStopTwo ] ? attributes[ attrGradientColorStopTwo ] : '' }
									placeholder={ __( 'Stop position (%)', 'generateblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ attrGradientColorStopTwo ]: value,
										} );
									} }
									onBlur={ () => {
										if ( attributes[ attrGradientColorStopTwo ] || 0 === attributes[ attrGradientColorStopTwo ] ) {
											setAttributes( {
												[ attrGradientColorStopTwo ]: parseFloat( attributes[ attrGradientColorStopTwo ] ),
											} );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>
							</div>
						</BaseControl>
					</Fragment>
				) }
			</Fragment>
		);
	}
}

export default GradientControl;

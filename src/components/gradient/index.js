/**
 * Internal dependencies
 */
import './editor.scss';
import ColorPicker from '../color-picker';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const {
	BaseControl,
	ToggleControl,
	TextControl,
	RangeControl,
} = wp.components;

/**
 * Typography Component
 */
class GradientControl extends Component {

	constructor( props ) {
		super( ...arguments );
	}

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

		return (
			<Fragment>
				<ToggleControl
					label={ __( 'Use Gradient', 'generateblocks' ) }
					checked={ !! attributes[ attrGradient ] }
					onChange={ ( value ) => {
						setAttributes( {
							[ this.props[ 'attrGradient' ] ]: value,
						} );
					} }
				/>

				{ !! attributes[ attrGradient ] && (
					<Fragment>
						<BaseControl
							label={ __( 'Direction', 'generateblocks' ) }
						>
							<RangeControl
								value={ attributes[ attrGradientDirection ] ? attributes[ attrGradientDirection ] : 1 }
								onChange={ ( value ) => {
									setAttributes( {
										[ attrGradientDirection ]: value,
									} );
								} }
								min={0 }
								max={ 360 }
								step={ 1 }
								initialPosition={ 90 }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Color One', 'generateblocks' ) }>
							<div className="gblocks-component-gradient-control">
								<ColorPicker
									value={ attributes[ attrGradientColorOne ] }
									alpha={ true }
									valueOpacity={ attributes[ attrGradientColorOneOpacity ] }
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
									value={ attributes[ attrGradientColorStopOne ] ? parseFloat( attributes[ attrGradientColorStopOne ] ) : '' }
									placeholder={ __( 'Stop position (%)', 'generateblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ attrGradientColorStopOne ]: parseFloat( value )
										} );
									} }
								/>
							</div>
						</BaseControl>

						<BaseControl label={ __( 'Color Two', 'generateblocks' ) }>
							<div className="gblocks-component-gradient-control">
								<ColorPicker
									value={ attributes[ attrGradientColorTwo ] }
									alpha={ true }
									valueOpacity={ attributes[ attrGradientColorTwoOpacity ] }
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
									value={ attributes[ attrGradientColorStopTwo ] ? parseFloat( attributes[ attrGradientColorStopTwo ] ) : '' }
									placeholder={ __( 'Stop position (%)', 'generateblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ attrGradientColorStopTwo ]: parseFloat( value )
										} );
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

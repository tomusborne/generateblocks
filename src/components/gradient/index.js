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
			className,
			setAttributes,
			valueGradient,
			valueGradientDirection,
			valueGradientColorOne,
			valueGradientColorOneOpacity,
			valueGradientColorStopOne,
			valueGradientColorTwo,
			valueGradientColorTwoOpacity,
			valueGradientColorStopTwo,
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
			uniqueId,
		} = this.props;

		return (
			<Fragment>
				<ToggleControl
					label={ __( 'Use Gradient', 'flexblocks' ) }
					checked={ !! valueGradient }
					onChange={ ( value ) => {
						setAttributes( {
							[ this.props[ 'attrGradient' ] ]: value,
						} );
					} }
				/>

				{ !! valueGradient && (
					<Fragment>
						<TextControl
							type={ 'text' }
							label={ __( 'Direction', 'flexblocks' ) }
							value={ valueGradientDirection }
							onChange={ ( value ) => {
								setAttributes( {
									[ this.props[ 'attrGradientDirection' ] ]: value,
								} );
							} }
						/>

						<BaseControl label={ __( 'Color One', 'flexblocks' ) }>
							<div className="fx-component-gradient-control">
								<ColorPicker
									value={ valueGradientColorOne }
									onChange={ ( value ) =>
										setAttributes( {
											[ this.props[ 'attrGradientColorOne' ] ]: value,
										} )
									}
									onClear={ () =>
										setAttributes( {
											[ this.props[ 'attrGradientColorOne' ] ]: this.props.defaultColorOne,
										} )
									}
									alpha={ true }
									valueOpacity={ valueGradientColorOneOpacity }
									attrOpacity={ 'valueGradientColorOneOpacity' }
									onOpacityChange={ ( value ) =>
										setAttributes( {
											[ this.props[ 'attrGradientColorOneOpacity' ] ]: value,
										} )
									}
								/>

								<TextControl
									className={ 'fx-component-gradient-stop-value' }
									type={ 'text' }
									value={ valueGradientColorStopOne ? parseFloat( valueGradientColorStopOne ) : '' }
									placeholder={ __( 'Stop position (%)', 'flexblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ this.props[ 'attrGradientColorStopOne' ] ]: parseFloat( value )
										} );
									} }
								/>
							</div>
						</BaseControl>

						<BaseControl label={ __( 'Color Two', 'flexblocks' ) }>
							<div className="fx-component-gradient-control">
								<ColorPicker
									value={ valueGradientColorTwo }
									onChange={ ( value ) =>
										setAttributes( {
											[ this.props[ 'attrGradientColorTwo' ] ]: value,
										} )
									}
									onClear={ () =>
										setAttributes( {
											[ this.props[ 'attrGradientColorTwo' ] ]: this.props.defaultColorTwo,
										} )
									}
									alpha={ true }
									valueOpacity={ valueGradientColorTwoOpacity }
									attrOpacity={ 'valueGradientColorTwoOpacity' }
									onOpacityChange={ ( value ) =>
										setAttributes( {
											[ this.props[ 'attrGradientColorTwoOpacity' ] ]: value,
										} )
									}
								/>

								<TextControl
									className={ 'fx-component-gradient-stop-value' }
									type={ 'text' }
									value={ valueGradientColorStopTwo ? parseFloat( valueGradientColorStopTwo ) : '' }
									placeholder={ __( 'Stop position (%)', 'flexblocks' ) }
									onChange={ ( value ) => {
										setAttributes( {
											[ this.props[ 'attrGradientColorStopTwo' ] ]: parseFloat( value )
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

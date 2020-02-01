import classnames from 'classnames';
import hexToRGBA from './hex-to-rgba';
import getIcon from '../../utils/get-icon';

// Import CSS
import './editor.scss';

const { Component } = wp.element;

const { __ } = wp.i18n;

const {
	Tooltip,
	BaseControl,
	Button,
	TextControl,
	ColorPicker,
	RangeControl,
} = wp.components;

const {
    ColorPalette,
} = wp.blockEditor;

export default class GenerateBlocksColorPicker extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
            showPicker: false,
			altPicker: false,
        };
	}

	render() {
		const {
			value,
			onChange,
			onOpacityChange,
			setAttributes,
			label,
			alpha = false,
			valueOpacity,
			attrOpacity,
		} = this.props;

		const {
            showPicker,
			altPicker,
        } = this.state;

		return (
			<BaseControl className={
				classnames( {
					'gblocks-color-picker-container' : true,
					'gblocks-color-picker-is-open': showPicker
				} )
			}>
				<BaseControl
					className="gblocks-component-color-picker-wrapper"
				>
					<span
						className="components-base-control__label"
						onClick={ () => {
							this.setState( {
								showPicker: ! showPicker,
							} );
						} }
					>{ label }</span>
					<div className={ classnames( 'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color' ) }>
						<Tooltip text={ __( 'Choose Color', 'generateblocks' ) }>
							<button
								type="button"
								aria-expanded={ showPicker }
								className="components-color-palette__item components-circular-option-picker__option"
								onClick={ () => {
		                            this.setState( {
		                                showPicker: ! showPicker,
		                            } );
		                        } }
								aria-label={ __( 'Custom color picker', 'generateblocks' ) }
								style={ { color: value ? hexToRGBA( value, valueOpacity ) : 'transparent' } }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					</div>
				</BaseControl>

				{ showPicker &&
					<div
						className={ classnames( {
							'gblocks-component-color-picker': true
						} ) }
					>
						{ ! altPicker ? (
							<BaseControl key="gblocks-primary-picker">
								<ColorPicker
									color={ value ? value : '' }
									onChangeComplete={ ( color ) => {
										onChange( color.hex );
									} }
									disableAlpha
								/>
							</BaseControl>
						) : (
							<BaseControl key="gblocks-alt-picker">
								<ColorPicker
									color={ value ? value : '' }
									onChangeComplete={ ( color ) => {
										onChange( color.hex );
									} }
									disableAlpha
								/>
							</BaseControl>
						) }

						{ alpha &&
							<div className="gblocks-component-color-opacity">
								<Tooltip text={ __( 'Opacity', 'generateblocks' ) }>
									{ getIcon( 'gradient' ) }
								</Tooltip>

								<RangeControl
									value={ valueOpacity ? valueOpacity : 0 }
									onChange={ ( value ) => onOpacityChange( value ) }
									min={ 0 }
									max={ 1 }
									step={ 0.01 }
									initialPosition={ 1 }
								/>
							</div>
						}

						<BaseControl
							label={ __( 'Color Palette', 'generateblocks' ) }
							className="gblocks-component-color-picker-palette"
						>
							<ColorPalette
								value={ value }
								onChange={ ( color ) => {
									if ( altPicker ) {
										this.setState( {
			                                altPicker: false,
			                            } );
									} else {
										this.setState( {
			                                altPicker: true,
			                            } );
									}

									onChange( color );
								} }
								disableCustomColors={ true }
							/>
						</BaseControl>
					</div>
				}
			</BaseControl>
		);
	}
}

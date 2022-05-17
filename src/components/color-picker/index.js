import hexToRGBA from '../../utils/hex-to-rgba';
import getIcon from '../../utils/get-icon';

// Import CSS
import './editor.scss';

import {
	Component,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

import {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	Button,
	TextControl,
} from '@wordpress/components';

import {
	ColorPalette,
} from '@wordpress/block-editor';

export default class GenerateBlocksColorPicker extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			colorKey: false,
		};

		this.timer = null;
	}

	componentWillUnmount() {
		clearTimeout( this.timer );
	}

	render() {
		const {
			value,
			onChange,
			onOpacityChange,
			label,
			alpha = false,
			valueOpacity,
		} = this.props;

		const {
			colorKey,
		} = this.state;

		const toggleVisible = () => {
			this.setState( { isVisible: true } );
		};

		const toggleClose = () => {
			if ( this.state.isVisible === true ) {
				this.setState( { isVisible: false } );
			}
		};

		const isHex = ( hex ) => {
			return /^([0-9A-F]{3}){1,2}$/i.test( hex );
		};

		const getPaletteValue = ( colorValue ) => {
			if ( String( colorValue ).startsWith( 'var(' ) ) {
				const variableName = colorValue.match( /\(([^)]+)\)/ );

				if ( variableName ) {
					const variableValue = getComputedStyle( document.documentElement ).getPropertyValue( variableName[ 1 ] );

					if ( variableValue ) {
						colorValue = variableValue;
					}
				}
			}

			return colorValue;
		};

		return (
			<BaseControl
				className="gblocks-component-color-picker-wrapper"
			>
				{ !! label &&
					<div className="gblocks-color-component-label">
						<span>{ label }</span>
					</div>
				}

				<div className="gblocks-color-picker-area">
					{ ! this.state.isVisible &&
						<div className="components-circular-option-picker__option-wrapper">
							<Tooltip text={ __( 'Choose Color', 'generateblocks' ) }>
								<button
									type="button"
									aria-expanded={ this.state.isVisible }
									className="components-color-palette__item components-circular-option-picker__option"
									onClick={ toggleVisible }
									aria-label={ __( 'Custom color picker', 'generateblocks' ) }
									style={ { color: value ? hexToRGBA( value, valueOpacity ) : 'transparent' } }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					}

					{ this.state.isVisible &&
						<div className="components-circular-option-picker__option-wrapper">
							<Tooltip text={ __( 'Choose Color', 'generateblocks' ) }>
								<button
									type="button"
									aria-expanded={ this.state.isVisible }
									className="components-color-palette__item components-circular-option-picker__option"
									onClick={ toggleClose }
									aria-label={ __( 'Custom color picker', 'generateblocks' ) }
									style={ { color: value ? hexToRGBA( value, valueOpacity ) : 'transparent' } }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					}

					{ this.state.isVisible &&
						<Popover position="top left" className="gblocks-component-color-picker" onClose={ toggleClose }>
							<BaseControl key={ colorKey }>
								<ColorPicker
									key={ colorKey }
									color={ getPaletteValue( value ) || '' }
									onChangeComplete={ ( color ) => {
										let colorString;

										if ( 'undefined' === typeof color.rgb || color.rgb.a === 1 ) {
											colorString = color.hex;
										} else {
											const { r, g, b, a } = color.rgb;
											colorString = `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
										}

										onChange( colorString );
									} }
									disableAlpha={ ! alpha || 1 !== valueOpacity }
								/>

								<div className="gblocks-color-input-wrapper">
									<TextControl
										className="gblocks-color-input"
										type={ 'text' }
										value={ value || '' }
										onChange={ ( color ) => {
											if ( ! color.startsWith( '#' ) && isHex( color ) ) {
												color = '#' + color;
											}

											onChange( color );

											clearTimeout( this.timer );

											this.timer = setTimeout( () => {
												this.setState( {
													colorKey: color,
												} );

												const input = document.querySelector( '.gblocks-color-input-wrapper input' );

												if ( input ) {
													input.focus();
												}
											}, 350 );
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-color-clear-color"
										onClick={ () => {
											onChange( '' );

											if ( alpha && 1 !== valueOpacity ) {
												onOpacityChange( 1 );
											}

											this.setState( {
												colorKey: false,
											} );

											setTimeout( function() {
												document.querySelector( '.gblocks-color-input-wrapper input' ).focus();
											}, 10 );
										} }
									>
										{ __( 'Clear Color', 'generateblocks' ) }
									</Button>
								</div>
							</BaseControl>

							{ alpha && 1 !== valueOpacity &&
								<div className="gblocks-component-color-opacity">
									<Tooltip text={ __( 'Opacity', 'generateblocks' ) }>
										{ getIcon( 'gradient' ) }
									</Tooltip>

									<RangeControl
										value={ valueOpacity ? valueOpacity : 0 }
										onChange={ ( opacityValue ) => onOpacityChange( opacityValue ) }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ 1 }
									/>
								</div>
							}

							<BaseControl
								className="gblocks-component-color-picker-palette"
							>
								<ColorPalette
									value={ value ? value : '' }
									onChange={ ( color ) => {
										onChange( color );

										this.setState( {
											colorKey: color,
										} );

										setTimeout( function() {
											document.querySelector( '.gblocks-color-input-wrapper input' ).focus();
										}, 10 );
									} }
									disableCustomColors={ true }
									clearable={ false }
								/>
							</BaseControl>
						</Popover>
					}
				</div>
			</BaseControl>
		);
	}
}

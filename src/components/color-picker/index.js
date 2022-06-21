/**
 * External dependencies
 */
import { RgbStringColorPicker, RgbaStringColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { ColorPalette } from '@wordpress/block-editor';
import { useState, useEffect, useMemo } from '@wordpress/element';
import {
	Tooltip,
	BaseControl,
	RangeControl,
	Dropdown,
	Button,
	TextControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import hexToRGBA from '../../utils/hex-to-rgba';
import getIcon from '../../utils/get-icon';
import './editor.scss';

export default function ColorPicker( props ) {
	const {
		value,
		onChange,
		onOpacityChange,
		label,
		alpha = false,
		valueOpacity = 1,
		tooltip,
	} = props;

	const [ isManualInput, setManualInput ] = useState( false );

	const Component = alpha && 1 === valueOpacity
		? RgbaStringColorPicker
		: RgbStringColorPicker;

	useEffect( () => {
		if ( ! isManualInput ) {
			return;
		}

		const timeout = setTimeout( () => {
			const colorInput = document.querySelector( '.gblocks-color-input-wrapper input' );

			if ( colorInput ) {
				colorInput.focus();
			}
		}, 350 );

		return () => {
			clearTimeout( timeout );
			setManualInput( false );
		};
	}, [ value ] );

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

		return colord( colorValue ).toRgbString();
	};

	const rgbColor = useMemo( () => getPaletteValue( value ), [ value ] );
	const debouncedSetColor = useDebounce( onChange );

	return (
		<div className="gblocks-color-component">
			{ !! label &&
				<span className="gblocks-color-component__label">{ label }</span>
			}

			<Dropdown
				className="gblocks-color-component__toggle"
				contentClassName="gblocks-color-component-content"
				position="top left"
				renderToggle={ ( { isOpen, onToggle } ) => {
					const button = <Button
						className="gblocks-color-component__toggle-button"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						<span
							className="gblocks-color-component__toggle-indicator"
							style={ { background: value ? hexToRGBA( value, valueOpacity ) : null } }
						/>
					</Button>;

					return (
						<>
							{ !! tooltip
								? <Tooltip text={ tooltip }>{ button }</Tooltip>
								: button
							}
						</>
					);
				} }
				renderContent={ () =>
					<>
						<Component
							color={ rgbColor }
							onChange={ ( nextColor ) => {
								if ( colord( nextColor ).isValid() ) {
									const alphaValue = colord( nextColor ).alpha();
									nextColor = 1 === alphaValue ? colord( nextColor ).toHex() : nextColor;
								}

								debouncedSetColor( nextColor );
							} }
						/>

						<div className="gblocks-color-component-content__input-wrapper">
							<TextControl
								className="gblocks-color-input"
								type={ 'text' }
								value={ value || '' }
								onChange={ ( nextColor ) => {
									if ( ! nextColor.startsWith( '#' ) && isHex( nextColor ) ) {
										nextColor = '#' + nextColor;
									}

									debouncedSetColor( nextColor );
									setManualInput( true );
								} }
								onBlur={ () => {
									if ( colord( value ).isValid() ) {
										const alphaValue = colord( value ).alpha();

										if ( 1 === alphaValue ) {
											debouncedSetColor( colord( value ).toHex() );
										}
									}
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="gblocks-color-input-clear"
								onClick={ () => {
									onChange( '' );

									if ( alpha && 1 !== valueOpacity ) {
										onOpacityChange( 1 );
									}

									setTimeout( function() {
										document.querySelector( '.gblocks-color-component-content__input-wrapper input' ).focus();
									}, 10 );
								} }
							>
								{ __( 'Clear', 'generateblocks' ) }
							</Button>
						</div>

						{ alpha && 1 !== valueOpacity &&
							<div className="gblocks-color-component-content__opacity">
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
							className="gblocks-color-component-content__palette"
						>
							<ColorPalette
								value={ value ? value : '' }
								onChange={ ( color ) => {
									onChange( color );

									setTimeout( function() {
										document.querySelector( '.gblocks-color-component-content__input-wrapper input' ).focus();
									}, 10 );
								} }
								disableCustomColors={ true }
								clearable={ false }
							/>
						</BaseControl>
					</>
				}
			/>
		</div>
	);
}

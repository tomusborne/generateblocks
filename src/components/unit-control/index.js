/**
 * External dependencies
 */
import { useEffect, useState, useRef, Fragment } from '@wordpress/element';
import { TextControl, BaseControl, ButtonGroup, Button, SlotFillProvider, Popover } from '@wordpress/components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */

import './editor.scss';
import getDeviceType from '../../utils/get-device-type';

export default function UnitControl( props ) {
	const {
		label,
		units = [ 'px', 'em', '%', 'rem' ],
		min = 0,
		max,
		step,
		id,
		disabled = false,
		overrideValue = null,
		overrideAction = () => null,
		onChange,
		value,
		desktopValue,
		tabletValue,
		presets = [],
		help = '',
	} = props;

	const device = getDeviceType();
	const [ unitValue, setUnitValue ] = useState( '' );
	const [ numericValue, setNumericValue ] = useState( '' );
	const [ placeholderValue, setPlaceholderValue ] = useState( '' );
	const [ showPresets, setShowPresets ] = useState( false );
	const isMounted = useRef( false );
	const wrapperRef = useRef( false );
	const inputRef = useRef( false );

	const splitValues = ( values ) => {
		const unitRegex = units.join( '|' );
		const splitRegex = new RegExp( `(${ unitRegex })` );

		return values
			? values.split( splitRegex ).filter( ( singleValue ) => '' !== singleValue )
			: [];
	};

	const getNumericValue = ( values ) => values.length > 0 ? values[ 0 ] : '';
	const getUnitValue = ( values ) => values.length > 1 ? values[ 1 ] : units[ 0 ];
	const startsWithNumber = ( number ) => /^\d/.test( number );
	const desktopValues = splitValues( desktopValue );
	const tabletValues = splitValues( tabletValue );

	const setPlaceholders = () => {
		if ( ! value ) {
			// Set desktop value as placeholder.
			if ( ! tabletValue ) {
				if (
					'Tablet' === device ||
					(
						'Mobile' === device &&
						( desktopValue || overrideValue )
					)
				) {
					const overridePlaceholder = splitValues( overrideValue );
					setPlaceholderValue( getNumericValue( desktopValues.length ? desktopValues : overridePlaceholder ) );
					setUnitValue( getUnitValue( desktopValues.length ? desktopValues : overridePlaceholder ) );
				}
			}

			// Set tablet value as placeholder.
			if (
				'Mobile' === device &&
				tabletValue
			) {
				setPlaceholderValue( getNumericValue( tabletValues ) );
				setUnitValue( getUnitValue( tabletValues ) );
			}
		}
	};

	// Split the number and unit into two values.
	useEffect( () => {
		const newValue = overrideValue && disabled ? overrideValue : value;

		// Split our values if we're starting with a number.
		if ( startsWithNumber( newValue ) ) {
			const values = splitValues( newValue );

			setNumericValue( getNumericValue( values ) );
			setUnitValue( getUnitValue( values ) );
		} else {
			setNumericValue( newValue );
			setUnitValue( '' );
		}

		// Set the device placeholders and switch the units to match
		// their parent device value if no device-specific value exists.
		setPlaceholders();
	}, [ device, value, overrideValue ] );

	useEffect( () => {
		// Don't run this on first render.
		if ( ! isMounted.current ) {
			isMounted.current = true;
			return;
		}

		const hasOverride = !! overrideValue && !! disabled;

		const fullValue = startsWithNumber( numericValue )
			? numericValue + unitValue
			: numericValue;

		// Clear the placeholder if the units don't match.
		if ( ! fullValue ) {
			const deviceValues = {
				Tablet: desktopValues,
				Mobile: tabletValues,
			};

			if ( device in deviceValues ) {
				if ( unitValue !== getUnitValue( deviceValues[ device ] ) ) {
					setPlaceholderValue( '' );
				} else {
					setPlaceholders();
				}
			}
		}

		if ( ! hasOverride && fullValue !== value ) {
			onChange( fullValue );
		}
	}, [ numericValue, unitValue ] );

	const useOutsideClick = ( ref, callback ) => {
		useEffect( () => {
			const handleClickOutside = ( evt ) => {
				if ( ref.current && ! ref.current.contains( evt.target ) ) {
					callback(); //Do what you want to handle in the callback
				}
			};

			document.addEventListener( 'mousedown', handleClickOutside );

			return () => {
				document.removeEventListener( 'mousedown', handleClickOutside );
			};
		} );
	};

	useOutsideClick( wrapperRef, () => setShowPresets( false ) );

	const doesPresetUnitMatch = Object.keys( presets ).some( ( k ) => {
		return presets[ k ]?.value.includes( unitValue );
	} );

	return (
		<SlotFillProvider>
			<BaseControl
				label={ label }
				help={ help }
				id={ id }
				className={ classnames( {
					'gblocks-unit-control': true,
					'gblocks-unit-control__disabled': !! disabled,
				} ) }
			>
				<div className="gblocks-unit-control__input" ref={ wrapperRef }>
					<TextControl
						type="text"
						value={ numericValue }
						placeholder={ placeholderValue }
						id={ id }
						min={ min }
						max={ max }
						step={ step }
						autoComplete="off"
						disabled={ disabled }
						onChange={ ( newValue ) => setNumericValue( newValue ) }
						onFocus={ () => setShowPresets( true ) }
						ref={ inputRef }
					/>

					{ !! overrideAction && <div className="gblocks-unit-control__override-action">{ overrideAction() } </div> }

					{ (
						startsWithNumber( numericValue ) ||
						(
							! numericValue &&
							( ! placeholderValue || startsWithNumber( placeholderValue ) )
						)
					) &&
						<span className="gblocks-unit-control__unit-select">
							<select
								value={ unitValue }
								disabled={ disabled || 1 === units.length }
								onChange={ ( e ) => setUnitValue( e.target.value ) }
							>
								{ units.map( ( unitOption ) => <option key={ unitOption } value={ unitOption }>{ unitOption }</option> ) }
							</select>
						</span>
					}

					{ !! presets.length && !! showPresets && doesPresetUnitMatch &&
						<Popover focusOnMount={ false } className="gblocks-unit-control__popover">
							<ButtonGroup className="gblocks-flex-button-group">
								{
									Object.values( presets ).map( ( preset, index ) => {
										return (
											<Fragment key={ 'sizing-preset-' + index }>
												<Button
													isPrimary={ preset.value === value }
													onClick={ () => {
														onChange( preset.value );
														inputRef.current.focus();
													} }
												>
													{ preset.label }
												</Button>
											</Fragment>
										);
									} )
								}
							</ButtonGroup>
						</Popover>
					}

					<Popover.Slot />
				</div>
			</BaseControl>
		</SlotFillProvider>
	);
}

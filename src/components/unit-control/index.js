/**
 * External dependencies
 */
import { useEffect, useState, useRef } from '@wordpress/element';
import { TextControl, BaseControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import hasNumericValue from '../../utils/has-numeric-value';
import './editor.scss';

export default function UnitControl( props ) {
	const {
		label,
		attributeName,
		attributes,
		setAttributes,
		units = [ 'px', 'em', '%', 'rem' ],
		device,
		min = 0,
		max,
		step,
		id = attributeName,
	} = props;

	const [ unitValue, setUnitValue ] = useState( '' );
	const [ numericValue, setNumericValue ] = useState( '' );
	const [ placeholderValue, setPlaceholderValue ] = useState( '' );
	const isMounted = useRef( false );

	const attribute = device && 'Desktop' !== device
		? attributeName + device
		: attributeName;

	const splitValues = ( value ) => {
		return value
			? value.split( /(\d+)/ ).filter( ( singleValue ) => '' !== singleValue )
			: [];
	};

	const getNumericValue = ( values ) => values.length > 0 ? values[ 0 ] : '';
	const getUnitValue = ( values ) => values.length > 1 ? values[ 1 ] : 'px';
	const desktopValues = splitValues( attributes[ attributeName ] );
	const tabletValues = splitValues( attributes[ attributeName + 'Tablet' ] );

	const setPlaceholders = () => {
		if ( ! attributes[ attribute ] ) {
			// Set desktop value as placeholder.
			if ( ! attributes[ attributeName + 'Tablet' ] ) {
				if (
					'Tablet' === device ||
					(
						'Mobile' === device &&
						attributes[ attributeName ]
					)
				) {
					setPlaceholderValue( getNumericValue( desktopValues ) );
					setUnitValue( getUnitValue( desktopValues ) );
				}
			}

			// Set tablet value as placeholder.
			if (
				'Mobile' === device &&
				attributes[ attributeName + 'Tablet' ]
			) {
				setPlaceholderValue( getNumericValue( tabletValues ) );
				setUnitValue( getUnitValue( tabletValues ) );
			}
		}
	};

	// Split the number and unit into two values.
	useEffect( () => {
		const values = splitValues( attributes[ attribute ] );

		setNumericValue( getNumericValue( values ) );
		setUnitValue( getUnitValue( values ) );

		// Set the device placeholders and switch the units to match
		// their parent device value if no device-specific value exists.
		setPlaceholders();
	}, [ device, attributes[ attribute ] ] );

	useEffect( () => {
		// Don't run this on first render.
		if ( ! isMounted.current ) {
			isMounted.current = true;
			return;
		}

		const fullValue = hasNumericValue( numericValue )
			? numericValue + unitValue
			: '';

		const deviceValues = {
			Tablet: desktopValues,
			Mobile: tabletValues,
		};

		// Clear the placeholder if the units don't match.
		if ( ! fullValue ) {
			if ( device in deviceValues ) {
				if ( unitValue !== getUnitValue( deviceValues[ device ] ) ) {
					setPlaceholderValue( '' );
				} else {
					setPlaceholders();
				}
			}
		}

		if ( fullValue !== attributes[ attribute ] ) {
			setAttributes( {
				[ attribute ]: fullValue,
			} );
		}
	}, [ numericValue, unitValue ] );

	return (
		<BaseControl
			label={ label }
			id={ id }
			className="gblocks-unit-control"
		>
			<div className="gblocks-unit-control__input">
				<TextControl
					type="number"
					value={ numericValue }
					placeholder={ placeholderValue }
					id={ id }
					min={ min }
					max={ max }
					step={ step }
					autoComplete="off"
					onChange={ ( value ) => {
						if ( min >= 0 ) {
							// No hyphens allowed here.
							value = value.toString().replace( /-/g, '' );
						}

						setNumericValue( value );
					} }
				/>

				<span className="gblocks-unit-control__unit-select">
					<select
						value={ unitValue }
						onChange={ ( e ) => {
							setUnitValue( e.target.value );
						} }
					>
						{ units.map( ( unitOption ) => <option key={ unitOption } value={ unitOption }>{ unitOption }</option> ) }
					</select>
				</span>
			</div>
		</BaseControl>
	);
}

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';
import UnitControl from '../unit-control';
import { labels } from './labels';
import isNumeric from '../../utils/is-numeric';

export default function Dimensions( props ) {
	const {
		label = __( 'Padding', 'generateblocks' ),
		units = [],
		attributeNames = [],
		values,
		placeholders,
		onChange,
	} = props;

	// values can have other attributes not related to this component.
	// This builds an object of values related to this component.
	const attributes = attributeNames.reduce( ( o, k ) => {
		o[ k ] = values[ k ];

		return o;
	}, {} );

	const [ sync, setSync ] = useState( false );
	const [ lastFocused, setLastFocused ] = useState( '' );

	useEffect( () => {
		const areAllValuesEqual = ( arr ) => arr.length === attributeNames.length && arr.every( ( value ) => value === arr[ 0 ] );
		const attributeValues = Object.values( attributes ).filter( ( n ) => n );
		setSync( areAllValuesEqual( attributeValues ) );
	}, [ JSON.stringify( attributes ) ] );

	const syncUnits = () => {
		const sides = [ ...attributeNames ].reverse();

		const firstValue = sides.reduce( ( result, key ) => {
			return attributes[ key ] || isNumeric( attributes[ key ] ) ? attributes[ key ] : result;
		}, '' );

		if ( ! firstValue ) {
			setSync( ! sync );

			return;
		}

		const syncValue = lastFocused
			? attributes[ lastFocused ]
			: firstValue;

		const newAttributes = attributeNames.reduce( ( o, key ) => ( { ...o, [ key ]: syncValue } ), {} );
		onChange( newAttributes );
		setSync( ! sync );
	};

	const style = attributeNames.find( ( name ) => name.includes( 'Radius' ) )
		? 'corners'
		: 'circle';

	return (
		<BaseControl className="components-gblocks-dimensions-control" label={ label } id={ attributeNames[ 0 ] }>
			<Tooltip text={ !! sync ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) } >
				<Button
					className="components-gblocks-dimensions-control_sync"
					aria-label={ !! sync ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) }
					variant={ !! sync ? 'primary' : '' }
					aria-pressed={ !! sync }
					onClick={ () => syncUnits() }
				>
					{ !! sync ? link : linkOff }
				</Button>
			</Tooltip>

			<div
				className={ 'components-gblocks-dimensions-control__inputs style-' + style }
				style={ { display: !! sync ? 'block' : '' } }
			>
				{ attributeNames.map( ( attributeName, index ) => {
					if ( sync && index > 0 ) {
						return null;
					}

					return (
						<div key={ attributeName }>
							<UnitControl
								id={ attributeName }
								value={ attributes[ attributeName ] || '' }
								placeholder={ placeholders[ attributeName ] || '' }
								units={ units }
								onChange={ ( value ) => {
									let newAttributes = {};

									if ( sync ) {
										newAttributes = attributeNames.reduce( ( o, key ) => ( { ...o, [ key ]: value } ), {} );
									} else {
										newAttributes[ attributeName ] = value;
									}

									onChange( newAttributes );
								} }
								onFocus={ () => setLastFocused( attributeName ) }
							/>

							{ ! sync &&
								<label htmlFor={ attributeName } className="gblocks-dimensions-control__label">
									{
										attributeName.includes( 'Radius' )
											? labels.borderRadius[ index ]
											: labels.default[ index ]
									}
								</label>
							}
						</div>
					);
				} ) }
			</div>
		</BaseControl>
	);
}

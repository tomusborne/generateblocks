/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';
import { useState } from '@wordpress/element';

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
		units = [ 'px', 'em', '%', 'rem', 'vw', 'vh', 'ch' ],
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
					isSmall
				>
					{ !! sync ? link : linkOff }
				</Button>
			</Tooltip>

			<div className={ 'components-gblocks-dimensions-control__inputs style-' + style }>
				{ attributeNames.map( ( attributeName, index ) => {
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

							<label htmlFor={ attributeName } className="gblocks-dimensions-control__label">
								{
									attributeName.includes( 'borderRadius' )
										? labels.borderRadius[ index ]
										: labels.default[ index ]
								}
							</label>
						</div>
					);
				} ) }
			</div>
		</BaseControl>
	);
}

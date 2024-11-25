import { __ } from '@wordpress/i18n';
import { useState, useCallback } from '@wordpress/element';
import { BaseControl, ToggleControl } from '@wordpress/components';

import { Stack } from '@edge22/components';

import { DateTimeControl } from './DateTimeControl';

export function DateQueryControl( { id, value, onChange } ) {
	const [ dateQuery, setDateQuery ] = useState( value );
	const { before = '', after = '' } = dateQuery;
	// Default to include before if both are unset
	const [ includeBefore, setIncludeBefore ] = useState( ( ! before && ! after ) ? true : !! before );
	const [ includeAfter, setIncludeAfter ] = useState( !! after );
	const beforeDateTimeStamp = new Date(
		'string' === typeof before
			? before
			: `${ before.month }/${ before.day }/${ before.year } ${ before.hour }:${ before.minute }:${ before.second }`
	);
	const afterDateTimeStamp = new Date(
		'string' === typeof after
			? after
			: `${ after.month }/${ after.day }/${ after.year } ${ after.hour }:${ after.minute }:${ after.second }`
	);

	const onBeforeChange = useCallback( function onBeforeChange( newValue ) {
		const newDateQuery = {
			...dateQuery,
		};

		if ( newValue ) {
			newDateQuery.before = newValue;
		} else {
			delete newDateQuery.before;
		}

		setDateQuery( newDateQuery );

		if ( onChange ) {
			onChange( newDateQuery );
		}
	}, [ setDateQuery, onChange ] );

	const onAfterChange = useCallback( function onAfterChange( newValue ) {
		const newDateQuery = {
			...dateQuery,
		};

		if ( newValue ) {
			newDateQuery.after = newValue;
		} else {
			delete newDateQuery.after;
		}

		setDateQuery( newDateQuery );

		if ( onChange ) {
			onChange( newDateQuery );
		}
	}, [ setDateQuery, onChange ] );

	return (
		<BaseControl
			id="gblocks-date-query"
			label={ __( 'Date Query', 'generateblocks' ) }
			className="gb-date-query"
			__nextHasNoMarginBottom
		>
			<Stack gap="12px" className="gb-date-query__inner">
				<ToggleControl
					label={ __( 'Before', 'generateblocks' ) }
					onChange={ () => {
						const newIncludeBefore = ! includeBefore;
						setIncludeBefore( newIncludeBefore );

						// If the new value is false, clear the before value.
						onBeforeChange( newIncludeBefore ? new Date() : '' );
					} }
					checked={ includeBefore }
				/>
				{ includeBefore && (
					<DateTimeControl
						id={ `${ id }-before` }
						label={ __( 'Before', 'generateblocks' ) }
						help={ __( 'Limit response to posts published before a given date.', 'generateblocks' ) }
						value={ beforeDateTimeStamp }
						onChange={ onBeforeChange }
					/>
				) }
				<ToggleControl
					label={ __( 'After', 'generateblocks' ) }
					onChange={ () => {
						const newIncludeAfter = ! includeAfter;
						setIncludeAfter( newIncludeAfter );

						// If the new value is false, clear the after value.
						onAfterChange( newIncludeAfter ? new Date() : '' );
					} }
					checked={ includeAfter }
				/>
				{ includeAfter && (
					<DateTimeControl
						id={ `${ id }-after` }
						label={ __( 'After', 'generateblocks' ) }
						help={ __( 'Limit response to posts published after a given date.', 'generateblocks' ) }
						value={ afterDateTimeStamp }
						onChange={ onAfterChange }
					/>
				) }
			</Stack>
		</BaseControl>
	);
}

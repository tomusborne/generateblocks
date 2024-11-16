import { BaseControl, DateTimePicker, TimePicker } from '@wordpress/components';

import clsx from 'clsx';
import { isValid } from 'date-fns';

import './editor.scss';

export function DateTimeControl( { id, label, help, value, onChange, className = '', calendar = false } ) {
	const currentDate = !! value ? new Date( value ) : '';

	return (
		<BaseControl
			id={ id }
			label={ label }
			help={ help }
			className={ clsx( 'gb-datetime-control', className ) }
		>
			{ calendar ? (
				<DateTimePicker
					currentDate={ isValid( currentDate ) ? currentDate : '' }
					onChange={ onChange }
					is12Hour={ true }
				/>
			) : (
				<TimePicker
					is12Hour={ true }
					currentTime={ isValid( value ) ? value : '' }
					onChange={ onChange }
				/>
			) }
		</BaseControl>
	);
}

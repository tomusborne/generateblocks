import { BaseControl, DateTimePicker } from '@wordpress/components';
import clsx from 'clsx';
import './editor.scss';

export function DateTimeControl( { id, label, help, value, onChange, className = '' } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<BaseControl
			id={ id }
			label={ label }
			help={ help }
			className={ clsx( 'gb-datetime-control', className ) }
		>
			<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
		</BaseControl>
	);
}

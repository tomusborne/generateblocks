import { BaseControl, DateTimePicker } from '@wordpress/components';

import './editor.scss';

export function DateTimeControl( { id, label, help, value, onChange } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<BaseControl
			id={ id }
			label={ label }
			help={ help }
			className="gb-datetime-control"
		>
			<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
		</BaseControl>
	);
}

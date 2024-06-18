import { BaseControl, DateTimePicker } from '@wordpress/components';

import './editor.scss';

export default function DateTimePickerControl( { id, label, help, value, onChange } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<div style={ { marginBottom: '24px' } }>
			<BaseControl
				id={ id }
				label={ label }
				help={ help }
				className="gb-datetime-control"
			>
				<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
			</BaseControl>
		</div>
	);
}

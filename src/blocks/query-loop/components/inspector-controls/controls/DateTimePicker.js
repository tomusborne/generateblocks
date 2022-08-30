import { BaseControl, DateTimePicker } from '@wordpress/components';

export default function DateTimePickerControl( { label, help, value, onChange } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<div style={ { marginBottom: '24px' } }>
			<BaseControl label={ label } help={ help }>
				<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
			</BaseControl>
		</div>
	);
}

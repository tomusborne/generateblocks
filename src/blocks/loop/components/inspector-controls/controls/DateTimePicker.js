import { BaseControl, DateTimePicker } from '@wordpress/components';

export default function DateTimePickerControl( { id, label, help, value, onChange } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<div style={ { marginBottom: '24px' } }>
			<BaseControl id={ id } label={ label } help={ help }>
				<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
			</BaseControl>
		</div>
	);
}

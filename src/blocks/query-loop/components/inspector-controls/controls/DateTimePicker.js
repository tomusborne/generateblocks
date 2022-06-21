import { DateTimePicker } from '@wordpress/components';
import LabelAndHelpWrapper from '../../../../../components/LabelAndHelpWrapper';

export default function DateTimePickerControl( { label, help, value, onChange } ) {
	const currentDate = !! value ? new Date( value ) : new Date();

	return (
		<div style={ { marginBottom: '24px' } }>
			<LabelAndHelpWrapper label={ label } help={ help }>
				<DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
			</LabelAndHelpWrapper>
		</div>
	);
}

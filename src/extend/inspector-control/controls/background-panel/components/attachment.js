import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Attachment( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Attachment', 'generateblocks' ) }
			value={ value }
			options={ [
				{ label: 'scroll', value: '' },
				{ label: 'fixed', value: 'fixed' },
				{ label: 'local', value: 'local' },
			] }
			onChange={ onChange }
		/>
	);
}

import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function ZIndex( { value, onChange, label } ) {
	return (
		<TextControl
			label={ label || __( 'z-index', 'generateblocks' ) }
			type={ 'number' }
			value={ value || 0 === value ? value : '' }
			onChange={ onChange }
			onBlur={ ( newValue ) => onChange( parseFloat( newValue ) ) }
			onClick={ ( e ) => {
				// Make sure onBlur fires in Firefox.
				e.currentTarget.focus();
			} }
		/>
	);
}

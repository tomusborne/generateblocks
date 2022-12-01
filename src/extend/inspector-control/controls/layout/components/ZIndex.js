import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function ZIndex( { value, onChange, label, placeholder } ) {
	return (
		<TextControl
			label={ label || __( 'z-index', 'generateblocks' ) }
			type={ 'number' }
			value={ value || 0 === value ? value : '' }
			placeholder={ placeholder }
			onChange={ onChange }
			onBlur={ () => {
				if ( value || 0 === value ) {
					onChange( parseFloat( value ) );
				}
			} }
			onClick={ ( e ) => {
				// Make sure onBlur fires in Firefox.
				e.currentTarget.focus();
			} }
		/>
	);
}

import { TextControl } from '@wordpress/components';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from '@wordpress/element';

export default function DebouncedTextControl( props ) {
	const [ value, setValue ] = useState( props?.value );
	const [ debouncedValue ] = useDebounce( value, 800 );

	useEffect( () => {
		props.onChange( debouncedValue );
	}, [ debouncedValue ] );

	return (
		<TextControl
			{ ...props }
			value={ value }
			onChange={ ( newValue ) => {
				setValue( newValue );
			} }
		/>
	);
}

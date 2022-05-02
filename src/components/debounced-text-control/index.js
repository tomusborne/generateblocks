import { TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import useDebounceState from '../../hooks/useDebounceState';

export default function DebouncedTextControl( props ) {
	const [ debounceValue, setValue, value ] = useDebounceState( props?.value, 800 );

	useEffect( () => {
		props.onChange( debounceValue );
	}, [ debounceValue ] );

	return (
		<TextControl
			{ ...props }
			value={ value }
			onChange={ setValue }
		/>
	);
}

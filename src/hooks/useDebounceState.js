import { useState } from '@wordpress/element';
import { useDebounce } from 'use-debounce';

export default function useDebounceState( initialState, delay = 800 ) {
	const [ state, setState ] = useState( initialState );
	const [ debouncedState ] = useDebounce( state, delay );

	return [ debouncedState, setState, state ];
}

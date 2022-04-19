import { useState } from '@wordpress/element';
import { useDebounce } from 'use-debounce';

/**
 * Wrapper around useState to debounce the state value.
 *
 * @param initialState The initial state.
 * @param delay The delay to debounce.
 *
 * @return {[debouncedState, setState, state]} The debounced state, the state, and the setState callback.
 */
export default function useDebounceState( initialState, delay = 800 ) {
	const [ state, setState ] = useState( initialState );
	const [ debouncedState ] = useDebounce( state, delay );

	return [ debouncedState, setState, state ];
}

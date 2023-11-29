import { SearchControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { useLibrary } from './library-provider';

export default function PatternSearch( { onChange } ) {
	const { setSearch } = useLibrary();
	const [ searchInput, setSearchInput ] = useState( '' );
	const setDebouncedInput = useDebounce( setSearch, 500 );

	useEffect( () => {
		setDebouncedInput( searchInput );
	}, [ searchInput ] );

	return (
		<SearchControl
			value={ searchInput }
			onChange={ ( value ) => {
				onChange( value );
				setSearchInput( value );
			} }
		/>
	);
}

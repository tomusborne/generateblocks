import { SearchControl } from '@wordpress/components';
import { useDebounce } from '@wordpress/compose';
import { useLibrary } from './library-provider';
import { useEffect, useState } from '@wordpress/element';

export default function PatternSearch() {
	const { search, setSearch } = useLibrary();
	const [ searchInput, setSearchInput ] = useState( search );
	const setDebouncedInput = useDebounce( setSearch, 500 );

	useEffect( () => {
		setDebouncedInput( searchInput );
	}, [ searchInput ] );

	return (
		<SearchControl
			value={ searchInput }
			onChange={ setSearchInput }
		/>
	);
}

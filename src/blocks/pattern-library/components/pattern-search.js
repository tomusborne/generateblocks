import { SearchControl } from '@wordpress/components';
import { useLibrary } from './library-provider';

export default function PatternSearch() {
	const { search, setSearch } = useLibrary();

	return (
		<SearchControl
			value={ search }
			onChange={ setSearch }
		/>
	);
}

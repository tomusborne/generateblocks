import { SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function PatternSearch( { onChange } ) {
	const [ searchInput, setSearchInput ] = useState( '' );

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

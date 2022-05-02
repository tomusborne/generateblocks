import AdvancedSelect from '../advanced-select';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useAuthors from '../../hooks/useAuthors';

export default function AuthorsSelect( { label, onChange, value, help } ) {
	const authors = useAuthors();

	const authorOptions = useMemo( () => {
		return authors
			.reduce( ( result, author ) => {
				result.push( { value: author.id, label: author.name } );
				return result;
			}, [] );
	}, [ authors ] );

	const selectedValues = authorOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select authors', 'generateblocks' ) }
			help={ help }
			placeholder={ label || __( 'Select authors', 'generateblocks' ) }
			options={ authorOptions }
			isMulti
			isSearchable
			value={ selectedValues }
			onChange={ onChange }
			isLoading={ authorOptions.length === 0 }
		/>
	);
}

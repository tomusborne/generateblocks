import AdvancedSelect from '../advanced-select';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useAuthors from '../../hooks/useAuthors';
import { applyFilters } from '@wordpress/hooks';

export default function AuthorsSelect( props ) {
	const {
		label,
		onChange,
		value,
		help,
		filterName = 'generateblocks.editor.authors-select',
	} = props;
	const authors = useAuthors();

	const authorOptions = useMemo( () => {
		const options = authors
			.reduce( ( result, author ) => {
				result.push( { value: author.id, label: author.name } );
				return result;
			}, [] );

		return applyFilters( filterName, options );
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

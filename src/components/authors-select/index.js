import AdvancedSelect from '../advanced-select';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { usePersistentAuthors } from '../../hooks/useAuthors';
import { applyFilters } from '@wordpress/hooks';
import useDebounceState from '../../hooks/useDebounceState';

export default function AuthorsSelect( props ) {
	const {
		label,
		onChange,
		value,
		help,
		placeholder,
		filterName = 'generateblocks.editor.authors-select',
	} = props;

	const [ search, setSearch ] = useDebounceState( '', 400 );
	const [ loadValues, setLoadValues ] = useState( value.length > 0 );

	const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
	const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;

	const { records, isLoading } = usePersistentAuthors( {
		per_page: !! search ? 100 : 10,
		search: !! search && ! isSearchById ? search : undefined,
		include: loadValues ? value : includeSearchId,
	} );

	useEffect( () => {
		if ( loadValues && records.some( ( author ) => ( value.includes( author.id ) ) ) ) {
			setLoadValues( false );
		}
	}, [ JSON.stringify( records ), JSON.stringify( value ) ] );

	const authorOptions = useMemo( () => {
		const options = records
			.reduce( ( result, author ) => {
				result.push( { value: author.id, label: author.name } );
				return result;
			}, [] );

		return applyFilters( filterName, options );
	}, [ records ] );

	const selectedValues = authorOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select authors', 'generateblocks' ) }
			help={ help }
			placeholder={ placeholder || __( 'Search authors…', 'generateblocks' ) }
			options={ authorOptions }
			isMulti
			isSearchable
			value={ selectedValues }
			onChange={ onChange }
			isLoading={ isLoading }
			onInputChange={ ( inputValue, { action } ) => {
				if ( 'input-change' === action ) {
					setSearch( inputValue );
				}
			} }
		/>
	);
}

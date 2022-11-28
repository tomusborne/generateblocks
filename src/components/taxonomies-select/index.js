import { useMemo, useState, useEffect } from '@wordpress/element';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import { usePersistentTaxonomyRecords } from '../../hooks/useTaxonomyRecords';
import { applyFilters } from '@wordpress/hooks';
import useDebounceState from '../../hooks/useDebounceState';

export default function TaxonomiesSelect( props ) {
	const {
		taxonomy,
		label,
		onChange,
		value = [],
		help,
		placeholder,
		filterName = 'generateblocks.editor.taxonomies-select',
	} = props;

	const [ loadValues, setLoadValues ] = useState( value.length > 0 );
	const [ search, setSearch ] = useDebounceState( '', 500 );
	const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
	const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;
	const { records, isLoading } = usePersistentTaxonomyRecords( taxonomy, {
		per_page: !! search ? 100 : 10,
		search: !! search && ! isSearchById ? search : undefined,
		include: loadValues ? value : includeSearchId,
	} );

	useEffect( () => {
		if ( loadValues && records.some( ( tax ) => ( value.includes( tax.id ) ) ) ) {
			setLoadValues( false );
		}
	}, [ JSON.stringify( records ), JSON.stringify( value ) ] );

	const taxonomiesOptions = useMemo( () => {
		const filteredTaxonomies = records
			.reduce( ( result, tax ) => {
				result.push( { value: tax.id, label: '#' + tax.id + ': ' + tax.name } );
				return result;
			}, [] );

		return applyFilters( filterName, filteredTaxonomies );
	}, [ JSON.stringify( records ) ] );

	const selectedValues = taxonomiesOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select terms', 'generateblocks' ) }
			help={ help }
			placeholder={ placeholder || __( 'Search authors…', 'generateblocks' ) }
			options={ taxonomiesOptions }
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

export function CategoriesSelect( props ) {
	return (
		<TaxonomiesSelect { ...props } taxonomy={ 'category' } />
	);
}

export function TagsSelect( props ) {
	return (
		<TaxonomiesSelect { ...props } taxonomy={ 'post_tag' } />
	);
}

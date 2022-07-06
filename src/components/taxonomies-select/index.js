import { useMemo } from '@wordpress/element';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import useTaxonomyRecords from '../../hooks/useTaxonomyRecords';
import { applyFilters } from '@wordpress/hooks';

export default function TaxonomiesSelect( props ) {
	const {
		taxonomy,
		label,
		onChange,
		value = [],
		help,
		filterName = 'generateblocks.editor.taxonomies-select',
	} = props;
	const { taxonomies, isResolving } = useTaxonomyRecords( taxonomy );

	const taxonomiesOptions = useMemo( () => {
		const filteredTaxonomies = taxonomies
			.reduce( ( result, tax ) => {
				result.push( { value: tax.id, label: tax.name } );
				return result;
			}, [] );

		return applyFilters( filterName, filteredTaxonomies );
	}, [ JSON.stringify( taxonomies ) ] );

	const selectedValues = taxonomiesOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select terms', 'generateblocks' ) }
			help={ help }
			placeholder={ label || __( 'Select terms', 'generateblocks' ) }
			options={ taxonomiesOptions }
			isMulti
			isSearchable
			value={ selectedValues }
			onChange={ onChange }
			isLoading={ isResolving }
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

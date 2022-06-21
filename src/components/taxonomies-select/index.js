import { useMemo } from '@wordpress/element';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import useTaxonomyRecords from '../../hooks/useTaxonomyRecords';

export default function TaxonomiesSelect( { taxonomy, label, onChange, value = [], help } ) {
	const { taxonomies, isResolving } = useTaxonomyRecords( taxonomy );

	const taxonomiesOptions = useMemo( () => {
		return taxonomies
			.reduce( ( result, tax ) => {
				result.push( { value: tax.id, label: tax.name } );
				return result;
			}, [] );
	}, [ taxonomies ] );

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

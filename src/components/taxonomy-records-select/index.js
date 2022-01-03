import { useMemo } from '@wordpress/element';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import useTaxonomyRecords from '../../hooks/useTaxonomyRecords';

export default function TaxonomyRecordsSelect( props ) {
	const {
		taxonomy,
		label,
		onChange,
		value = [],
		help,
		isMulti = true
	} = props;

	const { taxonomies, isResolving } = useTaxonomyRecords( taxonomy );

	const taxonomiesOptions = useMemo( () => {
		return taxonomies
			.reduce( ( result, taxonomy ) => {
				result.push( { value: taxonomy.id, label: taxonomy.name } );
				return result;
			}, [] );
	}, [ taxonomies ] );

	const selectedValues = isMulti
		? taxonomiesOptions.filter( ( option ) => ( value.includes( option.value ) ) )
		: taxonomiesOptions.filter( ( option ) => ( option.value === value ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select taxonomies', 'generateblocks' ) }
			help={ help }
			placeholder={ label || __( 'Select taxonomies', 'generateblocks' ) }
			options={ taxonomiesOptions }
			isMulti={ isMulti }
			isSearchable
			value={ selectedValues }
			onChange={ onChange }
			isLoading={ isResolving }
		/>
	);
};

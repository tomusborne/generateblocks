import { useMemo } from '@wordpress/element';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import useCategories from '../../hooks/useCategories';

export default function CategoriesSelect( { label, onChange, value, help } ) {
	const categories = useCategories();

	const categoriesOptions = useMemo( () => {
		return categories
			.reduce( ( result, category ) => {
				result.push( { value: category.id, label: category.name } );
				return result;
			}, [] );
	}, [ categories ] );

	const selectedValues = categoriesOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-author' }
			label={ label || __( 'Select categories', 'generateblocks' ) }
			help={ help }
			placeholder={ label || __( 'Select categories', 'generateblocks' ) }
			options={ categoriesOptions }
			isMulti
			value={ selectedValues }
			onChange={ onChange }
			isLoading={ categoriesOptions.length === 0 }
		/>
	);
};

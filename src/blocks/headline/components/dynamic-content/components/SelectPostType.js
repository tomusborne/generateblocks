import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import usePostTypes from '../hooks/usePostTypes';
import { useMemo } from '@wordpress/element';

export default ( { postType, onChange, value, help } ) => {
	const postTypes = usePostTypes();

	const postTypeOptions = useMemo( () => {
		return postTypes
			.filter( ( postType ) => ( postType.viewable ) )
			.reduce( ( result, postType ) => {
				result.push( { value: postType.slug, label: postType.name } );
				return result;
			}, [] );
	}, [ postTypes ] );

	const selectValue = postTypeOptions.filter( ( option ) => ( option.value === postType || option.value === value ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post-type' }
			label={ __( 'Select post type', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select post type', 'generateblocks' ) }
			options={ postTypeOptions }
			value={ selectValue }
			onChange={ onChange }
			isLoading={ postTypeOptions.length === 0 }
		/>
	);
};

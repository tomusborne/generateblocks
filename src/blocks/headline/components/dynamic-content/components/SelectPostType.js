import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import usePostTypes from '../hooks/usePostTypes';
import { useMemo } from '@wordpress/element';

export default ( { postType, onChange } ) => {
	const postTypes = usePostTypes();

	const postTypeOptions = useMemo( () => {
		return postTypes
			.filter( ( postType ) => ( postType.viewable ) )
			.reduce( ( result, postType ) => {
				result.push( { value: postType.slug, label: postType.name } );
				return result;
			}, [] );
	}, [ postTypes ] );

	const value = postTypeOptions.filter( ( option ) => ( option.value === postType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post-type' }
			label={ __( 'Select source post type', 'generateblocks' ) }
			placeholder={ __( 'Select source post type', 'generateblocks' ) }
			options={ postTypeOptions }
			value={ value }
			onChange={ onChange }
			isLoading={ postTypeOptions.length === 0 }
		/>
	);
};

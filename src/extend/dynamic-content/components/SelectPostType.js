import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import usePostTypes from '../hooks/usePostTypes';
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

export default ( { postType, onChange, value, help } ) => {
	const postTypes = usePostTypes();

	const enabledPostTypes = useMemo( () => {
		const enabled = postTypes.filter( ( type ) => ( type.viewable && 'attachment' !== type.slug ) );

		return applyFilters( 'generateblocks.editor.query-loop.enabled-post-types', enabled, postTypes );
	}, [ postTypes ] );

	const postTypeOptions = useMemo( () => {
		return enabledPostTypes
			.reduce( ( result, type ) => {
				result.push( { value: type.slug, label: type.name } );
				return result;
			}, [] );
	}, [ enabledPostTypes ] );

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

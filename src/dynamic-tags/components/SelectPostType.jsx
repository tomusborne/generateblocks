import { __ } from '@wordpress/i18n';
import { usePostTypes } from '../hooks/usePostTypes';
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { ComboboxControl } from '@wordpress/components';

export function SelectPostType( { onChange, value, help } ) {
	const postTypes = usePostTypes();

	const enabledPostTypes = useMemo( () => {
		const enabled = postTypes.filter( ( type ) => ( type.viewable && 'attachment' !== type.slug ) );

		return applyFilters( 'generateblocks.dynamicTags.enabledPostTypes', enabled, postTypes );
	}, [ postTypes ] );

	const postTypeOptions = useMemo( () => {
		return enabledPostTypes
			.reduce( ( result, type ) => {
				result.push( { value: type.slug, label: type.name } );
				return result;
			}, [] );
	}, [ enabledPostTypes ] );

	return (
		<ComboboxControl
			id={ 'gblocks-select-post-type' }
			label={ __( 'Select post type', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select post type', 'generateblocks' ) }
			options={ postTypeOptions }
			value={ value }
			onChange={ onChange }
		/>
	);
}

import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import usePostTypeRecords from '../../extend/dynamic-content/hooks/usePostTypeRecords';
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

export default function PostTypeRecordsSelect( props ) {
	const {
		postType,
		label,
		value,
		filterName = 'generateblocks.editor.post-type-record-select',
		...otherProps
	} = props;
	const { records, isResolving } = usePostTypeRecords( postType ) || [];

	const recordOptions = useMemo( () => {
		const options = records?.map( ( post ) => {
			// If the post type does not support title we use the slug instead.
			const title = ( post.title && post.title.raw ) ? post.title.raw : post.slug;

			return { value: post.id, label: `#${ post.id }: ${ title }` };
		} );

		return applyFilters( filterName, options );
	}, [ records, postType ] );

	const selectedValues = recordOptions.filter( ( option ) => ( value.includes( option.value ) ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-posts' }
			label={ label || __( 'Select post', 'generateblocks' ) }
			placeholder={ label || __( 'Select post', 'generateblocks' ) }
			value={ selectedValues }
			isLoading={ isResolving }
			isSearchable
			isMulti
			{ ...otherProps }
			options={ recordOptions }
		/>
	);
}

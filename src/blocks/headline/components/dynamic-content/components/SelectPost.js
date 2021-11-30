import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import usePostTypeRecords from '../hooks/usePostTypeRecords';
import { useMemo } from '@wordpress/element';

export default ( { postId, postType, onChange } ) => {
	const records = usePostTypeRecords( postType ) || [];

	const recordOptions = useMemo( () => {
		return records?.map( ( post ) => ( { value: post.id, label: post.title.raw } ) );
	}, [ records, postType ] );

	const value = recordOptions?.filter( ( option ) => ( option.value === postId ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post' }
			label={ __( 'Select source post', 'generateblocks' ) }
			placeholder={ __( 'Select source post', 'generateblocks' ) }
			options={ recordOptions }
			value={ value }
			onChange={ onChange }
			isLoading={ recordOptions.length === 0 }
			isSearchable
		/>
	);
};

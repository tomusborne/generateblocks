import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import usePostTypeRecords from '../../extend/dynamic-content/hooks/usePostTypeRecords';
import { useMemo } from '@wordpress/element';

export default function PostTypeRecordsSelect( { postType, label, value, ...props } ) {
	const { records, isResolving } = usePostTypeRecords( postType ) || [];

	const recordOptions = useMemo( () => {
		return records?.map( ( post ) => ( { value: post.id, label: post.title.raw } ) );
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
			{ ...props }
			options={ recordOptions }
		/>
	);
}

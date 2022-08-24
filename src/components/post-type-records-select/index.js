import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import { usePersistentPostRecords } from '../../extend/dynamic-content/hooks/usePostTypeRecords';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import useDebounceState from '../../hooks/useDebounceState';

export default function PostTypeRecordsSelect( props ) {
	const {
		postType,
		label,
		value,
		filterName = 'generateblocks.editor.post-type-record-select',
		...otherProps
	} = props;

	const [ loadValues, setLoadValues ] = useState( value.length > 0 );
	const [ search, setSearch ] = useDebounceState( '', 500 );
	const { records, isLoading } = usePersistentPostRecords( postType, {
		per_page: 10,
		orderby: 'id',
		search: !! search ? search : undefined,
		include: loadValues ? value : undefined,
	} );

	useEffect( () => {
		if ( loadValues && records.some( ( post ) => ( value.includes( post.id ) ) ) ) {
			setLoadValues( false );
		}
	}, [ JSON.stringify( records ), JSON.stringify( value ) ] );

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
			isLoading={ isLoading }
			isSearchable
			isMulti
			{ ...otherProps }
			options={ recordOptions }
			onInputChange={ ( inputValue, { action } ) => {
				if ( 'input-change' === action ) {
					setSearch( inputValue );
				}
			} }
		/>
	);
}

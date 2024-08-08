import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { ComboboxControl } from '@wordpress/components';
import useDebounceState from '../../hooks/useDebounceState';
import { usePersistentPostRecords } from '../../extend/dynamic-content/hooks/usePostTypeRecords';
import { applyFilters } from '@wordpress/hooks';

export function SelectPost(
	{
		postType,
		value,
		onChange,
		help,
		filterName = 'generateblocks.editor.post-type-record-select',
	}
) {
	const [ loadValues, setLoadValues ] = useState( value.length > 0 );
	const [ search, setSearch ] = useDebounceState( '', 500 );
	const isSearchById = !! search.trim() && ! search.trim().match( /\D/g );
	const includeSearchId = isSearchById ? [ search.replace( /\D/g, '' ) ] : undefined;
	const { records } = usePersistentPostRecords( postType, {
		per_page: !! search ? 100 : 10,
		search: !! search && ! isSearchById ? search : undefined,
		include: loadValues ? value : includeSearchId,
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

	return (
		<ComboboxControl
			id={ 'gblocks-select-post-type' }
			label={ __( 'Select post', 'generateblocks' ) }
			options={ recordOptions }
			value={ value }
			onChange={ onChange }
			onFilterValueChange={ setSearch }
			help={ help }
		/>
	);
}

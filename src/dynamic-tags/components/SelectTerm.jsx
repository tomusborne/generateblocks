import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { Autocomplete } from '@edge22/components';

export function SelectTerm( props ) {
	const { value, taxonomy, onSelect, postId } = props;
	const terms = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );
		const params = [ 'taxonomy', taxonomy ];

		if ( postId ) {
			params.push( { post: postId } );
		}

		const records = getEntityRecords( ...params );

		return Array.isArray( records ) ? records.map( ( term ) => {
			return {
				label: term.name,
				value: term.id.toString(),
				id: term.id,
			};
		} ) : [];
	}, [ taxonomy, postId ] );

	return (
		<Autocomplete
			id={ 'gblocks-select-term' }
			label={ __( 'Select Term', 'generateblocks' ) }
			placeholder={ __( 'Select Term', 'generateblocks' ) }
			selected={ value }
			source={ terms }
			onSelect={ onSelect }
			toStringKey="label"
			showClear={ true }
			filterOnSelect={ false }
		/>
	);
}

import AdvancedSelect from '@components/advanced-select';
import { __ } from '@wordpress/i18n';

function groupBy( arr, key, common ) {
	const currentGroups = {};
	return arr.reduce( ( grouped, obj ) => {
		const groupKey = obj[ key ] || common;

		if ( ! Object.keys( currentGroups ).includes( groupKey ) ) {
			const length = grouped.push( { label: groupKey, options: [ obj ] } );
			currentGroups[ groupKey ] = length - 1;
		} else {
			grouped[ currentGroups[ groupKey ] ].options.push( obj );
		}

		return grouped;
	}, [] );
}

export function SelectQueryParameter( props ) {
	return (
		<AdvancedSelect
			id={ 'gblocks-select-query-parameters' }
			label={ __( 'Select query parameter', 'generateblocks' ) }
			placeholder={ __( 'Select query parameter', 'generateblocks' ) }
			isSearchable
			pageSize={ 20 }
			{ ...props }
			menuPlacement={ 'top' }
			options={ groupBy( props.options, 'group', 'Other' ) }
		/>
	);
}

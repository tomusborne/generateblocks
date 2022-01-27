import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';

export default ( queryParams ) => {
	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
		} = select( coreStore );

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving(
				'getEntityRecords',
				queryParams
			),
			hasResolvedData: hasFinishedResolution(
				'getEntityRecords',
				queryParams
			),
		};
	}, [ queryParams ] );

	const filteredData = useMemo( () => {
		const ids = [];

		return data && data.filter( ( item ) => {
			if ( ! ids.includes( item.id ) ) {
				ids.push( item.id );

				return true;
			}

			return false;
		} );
	}, [ data ] );

	return {
		data: filteredData,
		isResolvingData,
		hasResolvedData,
		hasData: !! ( hasResolvedData && data?.length ),
	};
};

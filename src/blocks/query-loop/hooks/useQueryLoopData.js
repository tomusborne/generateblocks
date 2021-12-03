import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

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

	return {
		data: data,
		isResolvingData,
		hasResolvedData,
		hasData: !! ( hasResolvedData && data?.length ),
	};
};

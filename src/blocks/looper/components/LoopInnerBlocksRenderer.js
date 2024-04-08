import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import LoopRenderer from './LoopRenderer';
import { normalizeRepeatableArgs, removeEmpty } from './utils';
import { store as coreStore } from '@wordpress/core-data';

export default function LoopInnerBlocksRenderer( props ) {
	const { clientId, context } = props;
	const query = context[ 'generateblocks/query' ] || {};

	const normalizedQuery = useMemo( () => {
		return normalizeRepeatableArgs( removeEmpty( query ) );
	}, [ JSON.stringify( query ) ] );

	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
			canUser,
		} = select( coreStore );

		/**
		 * Include capabilities check for 'update' and 'settings'
		 * to determine if the user can update settings.
		 */
		const queryParams = [
			'postType',
			query.post_type || 'post',
			canUser( 'update', 'settings' )
				? normalizedQuery
				: {
					...normalizedQuery,
					status: 'publish',
				},
		];

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
		};
	}, [ JSON.stringify( normalizedQuery ) ] );

	return (
		<LoopRenderer
			{ ...props }
			data={ data }
			hasData={ !! ( hasResolvedData && data?.length ) }
			isResolvingData={ isResolvingData }
			hasResolvedData={ hasResolvedData }
			templateLock={ true }
			clientId={ clientId }
			contextCallback={ ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) }
		/>
	);
}

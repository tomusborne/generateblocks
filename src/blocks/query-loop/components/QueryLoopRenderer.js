import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import LoopRenderer from './LoopRenderer';
import { normalizeRepeatableArgs, removeEmpty } from './utils';
import { store as coreStore } from '@wordpress/core-data';

export default function QueryLoopRenderer( props ) {
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

		let queryData = normalizedQuery;

		// If the user can't update settings, we'll only show published posts.
		if ( ! canUser( 'update', 'settings' ) ) {
			queryData = {
				...queryData,
				status: 'publish',
			};
		}

		const queryParams = [ 'postType', query.post_type || 'post', queryData ];

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
		};
	}, [ JSON.stringify( normalizedQuery ) ] );

	return (
		<div className="gb-post-template-wrapper">
			<LoopRenderer
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
		</div>
	);
}

import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import LoopRenderer from './LoopRenderer';
import { normalizeRepeatableArgs, removeEmpty } from './utils';
import { store as coreStore } from '@wordpress/core-data';
import usePostTypeRecords from '../../../hooks/usePostTypeRecords';
import { useSelector } from 'react-redux';
import useQueryData from '../hooks/useQueryData';

const TEMPLATE = [
	[ 'generateblocks/container', {
		isQueryLoopItem: true,
		width: 100,
		lock: {
			remove: true,
			move: true,
		},
	}, [
		[ 'generateblocks/headline', {
			isDynamicContent: true,
			contentType: 'post-title',
		} ],
		[ 'generateblocks/headline', {
			isDynamicContent: true,
			element: 'p',
			contentType: 'post-date',
		} ],
	] ],
];

export default function QueryLoopRenderer( props ) {
	const { clientId, context, attributes } = props;
	const query = context[ 'generateblocks/query' ] || {};

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const normalizedQuery = useMemo( () => {
		return normalizeRepeatableArgs( removeEmpty( query ) );
	}, [ JSON.stringify( query ) ] );

	const { data, status } = useQueryData( attributes.uniqueId, query.post_type, normalizedQuery );

	return (
		<div className="gb-post-template-wrapper">
			<LoopRenderer
				data={ data }
				hasData={ data?.length }
				dataStatus={ status }
				templateLock={ true }
				template={ TEMPLATE }
				innerBlocks={ innerBlocks }
				contextCallback={ ( post ) => ( {
					postType: post.type,
					postId: post.id,
				} ) }
			/>
		</div>
	);
}

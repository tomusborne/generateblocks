import LoopRenderer from './LoopRenderer';
import { useEffect } from '@wordpress/element';
import usePostTypeLoopData from '../../hooks/usePostTypeLoopData';

export default function PostTypeRenderer( props ) {
	const { query, innerBlocks, templateLock, setHasData } = props;

	const queryLoopData = usePostTypeLoopData( query.post_type, query );

	useEffect( () => {
		setHasData( queryLoopData.hasData );
	}, [ queryLoopData.hasData ] );

	return(
		<LoopRenderer
			{ ...queryLoopData }
			innerBlocks={ innerBlocks }
			templateLock={ templateLock }
			contextCallback={ ( post ) => ( {
				postType: post.type,
				postId: post.id
			} ) }
		/>
	);
}

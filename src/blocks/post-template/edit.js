import { normalizeRepeatableArgs, removeEmpty } from './utils';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import LoopRenderer from './LoopRenderer';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

const TEMPLATE = [
	[ 'generateblocks/container', { isQueryLoop: true }, [
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

export default function PostTemplateEdit( props ) {
	const { clientId, context } = props;
	const query = context[ 'generateblocks/query' ] || {};
	const gridId = context[ 'generateblocks/gridId' ];

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const normalizedQuery = useMemo( () => {
		return normalizeRepeatableArgs( removeEmpty( query ) );
	}, [ JSON.stringify( query ) ] );

	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
		} = select( coreStore );

		const queryParams = [ 'postType', query.post_type || 'post', normalizedQuery ];

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
		};
	}, [ normalizedQuery ] );

	const blockProps = useBlockProps( {
		className: classnames( {
			'gb-post-template': true,
			[ `gb-post-template-${ gridId }` ]: true,
		} ),
	} );

	return (
		<div
			{ ...blockProps }
		>
			<div className="gb-post-template-wrapper">
				<LoopRenderer
					data={ data }
					hasData={ !! ( hasResolvedData && data?.length ) }
					isResolvingData={ isResolvingData }
					hasResolvedData={ hasResolvedData }
					templateLock={ true }
					template={ TEMPLATE }
					innerBlocks={ innerBlocks }
					contextCallback={ ( post ) => ( {
						postType: post.type,
						postId: post.id,
					} ) }
				/>
			</div>
		</div>
	);
}

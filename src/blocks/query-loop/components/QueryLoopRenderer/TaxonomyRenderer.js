import LoopRenderer from './LoopRenderer';
import { useEffect } from '@wordpress/element';
import useTaxonomyRecords from '../../../../hooks/useTaxonomyRecords';

export default function TaxonomyRenderer( props ) {
	const {
		query,
		innerBlocks,
		templateLock,
		setHasData,
		context,
		useContext,
	} = props;

	const queryWithContext = Object.assign( {}, query );

	if ( useContext && context.postType && context.postId ) {
		queryWithContext[ context.postType ] = context.postId;
	}

	const loopData = useTaxonomyRecords( query.taxonomy, ( useContext ? queryWithContext : query ) );

	useEffect( () => {
		setHasData( loopData.hasData );
	}, [ loopData.hasData ] );

	return(
		<LoopRenderer
			{ ...loopData }
			innerBlocks={ innerBlocks }
			templateLock={ templateLock }
			contextCallback={ ( term ) => ( {
				taxonomy: term.taxonomy,
				termId: term.id,
				taxonomyRest: 'category',
			} ) }
		/>
	);
}

import LoopRenderer from './LoopRenderer';
import { useEffect } from '@wordpress/element';
import useTaxonomyRecords from '../../../../hooks/useTaxonomyRecords';

export default function TaxonomyRenderer( props ) {
	const { query, innerBlocks, templateLock, setHasData } = props;

	const loopData = useTaxonomyRecords( query.taxonomy, query );

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
			} ) }
		/>
	);
}

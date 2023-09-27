import { applyFilters } from '@wordpress/hooks';

export default function RequiredComponents( { activeLibrary, children } ) {
	return applyFilters( 'generateblocks.pattern-library.collection.content', children, { activeLibrary } );
}

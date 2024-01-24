import { applyFilters } from '@wordpress/hooks';

export default function RequiredComponents( { activeLibrary, requiredClasses, setRequiredClasses, children } ) {
	return applyFilters( 'generateblocks.pattern-library.collection.content', children, { activeLibrary, requiredClasses, setRequiredClasses } );
}

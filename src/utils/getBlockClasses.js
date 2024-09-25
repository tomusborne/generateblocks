export function getBlockClasses( blockSlug, attributes, withBaseClass = false ) {
	const {
		styles = {},
		uniqueId = '',
		globalClasses = [],
	} = attributes;

	const classNames = [];

	if ( withBaseClass ) {
		classNames.push( blockSlug );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `${ blockSlug }-${ uniqueId }` );
	}

	return classNames;
}

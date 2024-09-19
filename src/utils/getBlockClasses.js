export function getBlockClasses( blockSlug, attributes, withBaseClass = false ) {
	const {
		className = '',
		styles = {},
		uniqueId = '',
		globalClasses = [],
	} = attributes;

	const classNames = [];

	if ( withBaseClass ) {
		classNames.push( blockSlug );
	}

	if ( className ) {
		classNames.push( className );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `${ blockSlug }-${ uniqueId }` );
	}

	return classNames;
}

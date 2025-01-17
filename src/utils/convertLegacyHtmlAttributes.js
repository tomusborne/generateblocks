export function convertLegacyHtmlAttributes( oldHtmlAttributes = [] ) {
	let newHtmlAttributes = {};

	if ( oldHtmlAttributes.length > 0 ) {
		newHtmlAttributes = oldHtmlAttributes.reduce( ( acc, curr ) => {
			acc[ curr.attribute ] = curr.value;
			return acc;
		}, {} );
	}

	return newHtmlAttributes;
}

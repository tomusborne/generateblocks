/**
 * The button connector, it maps the "text" attribute to display the correct dynamic values.
 *
 * @param {Object} state The GB store state.
 * @param {Object} ownProps The component props.
 *
 * @return {Object} The connected props.
 */
export default function buttonConnector( state, ownProps ) {
	const { attributes, dynamicContent } = ownProps;
	const staticText = attributes.text;

	let text = !! attributes.contentType ? dynamicContent : staticText;

	// Only return first term in buttons for now.
	if ( 'terms' === attributes.contentType ) {
		text = dynamicContent.split( attributes.termSeparator )[ 0 ];
	}

	return {
		attributes: Object.assign( {}, attributes, {
			text,
		} ),
	};
}

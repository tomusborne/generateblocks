/**
 * The headline connector, it maps the "content" attribute to display the correct dynamic values.
 *
 * @param {Object} state The GB store state.
 * @param {Object} ownProps The component props.
 *
 * @return {Object} The connected props.
 */
export default function headlineConnector( state, ownProps ) {
	const { attributes, dynamicContent } = ownProps;
	const staticContent = attributes.content;

	let content = !! attributes.contentType ? dynamicContent : staticContent;

	if ( !! attributes.dynamicLinkType && 'terms' === attributes.contentType ) {
		content = dynamicContent
			.split( attributes.termSeparator )
			.map( ( newContent, idx, fullContent ) => {
				return (
					<>
						<a>{ newContent }</a>
						{ idx + 1 !== fullContent.length && attributes.termSeparator }
					</>
				); // eslint-disable-line jsx-a11y/anchor-is-valid
			} );
	}

	return {
		attributes: Object.assign( {}, attributes, {
			content,
		} ),
	};
}

/**
 * The headline connector, it maps the "dynamicImage" attribute to display the correct dynamic values.
 *
 * @param {Object} state The GB store state.
 * @param {Object} ownProps The component props.
 *
 * @return {Object} The connected props.
 */
export default function imageConnector( state, ownProps ) {
	const { attributes, dynamicContent } = ownProps;
	const staticImage = attributes.text;

	let image = !! attributes.contentType ? dynamicContent : staticImage;

	return {
		attributes: Object.assign( {}, attributes, {
			dynamicImage: image,
		} ),
	};
}

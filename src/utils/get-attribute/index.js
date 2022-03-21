export default function getAttribute( name, props, getName = false ) {
	const {
		attributes,
		deviceType,
	} = props;

	const device = 'Desktop' === deviceType ? '' : deviceType;
	const attributeName = name + device;

	if ( getName ) {
		return attributeName;
	}

	return attributes[ attributeName ];
}

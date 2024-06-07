export function Icon( { icon } ) {
	if ( ! icon ) {
		return null;
	}

	return <span
		className="gb-shape"
		dangerouslySetInnerHTML={ { __html: icon } }
	/>;
}

export function Icon( { icon } ) {
	if ( ! icon ) {
		return null;
	}

	return <span
		className="gb-icon"
		dangerouslySetInnerHTML={ { __html: icon } }
	/>;
}

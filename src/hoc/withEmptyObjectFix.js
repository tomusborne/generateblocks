export function withEmptyObjectFix( WrappedComponent ) {
	return ( props ) => {
		// Ensure styles is an object.
		if ( Array.isArray( props.attributes.styles ) ) {
			props.setAttributes( { styles: {} } );
		}

		if ( Array.isArray( props.attributes.htmlAttributes ) ) {
			props.setAttributes( { htmlAttributes: {} } );
		}

		return ( <WrappedComponent { ...props } /> );
	};
}

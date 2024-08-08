export function withEmptyObjectFix( WrappedComponent ) {
	return ( props ) => {
		// Ensure styles is an object.
		if ( Array.isArray( props.attributes.styles ) ) {
			props.setAttributes( { styles: {} } );
		}

		return ( <WrappedComponent { ...props } /> );
	};
}

const generateUniqueId = ( clientId ) => clientId.substr( 2, 9 ).replace( '-', '' );

export default ( WrappedComponent ) => ( ( props ) => {
	const { clientId, attributes, setAttributes } = props;

	const uniqueId = generateUniqueId( clientId );

	if ( ! attributes.uniqueId || '' === attributes.uniqueId || uniqueId !== attributes.uniqueId ) {
		setAttributes( { uniqueId } );
	}

	return ( <WrappedComponent { ...props } /> );
} );

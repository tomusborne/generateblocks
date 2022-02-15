
function EmptyLink( { text } ) {
	return (
		<a href="#" onClick={ ( e ) => ( e.preventDefault() ) }>{ text }</a> // eslint-disable-line jsx-a11y/anchor-is-valid
	);
}

export default function withContentLink( WrappedComponent ) {
	return function( props ) {
		const { attributes, innerContentProps } = props;
		const { dynamicLinkType, termSeparator, contentType } = attributes;

		if ( ! dynamicLinkType ) {
			return <WrappedComponent { ...props } />;
		}

		const linkedContent = 'terms' === contentType
			? innerContentProps.value
				.split( termSeparator )
				.map( ( content, idx, fullContent ) => {
					return (
						<>
							<EmptyLink text={ content } />
							{ idx + 1 !== fullContent.length && termSeparator }
						</>
					);
				} )
			: Array( <EmptyLink text={ innerContentProps.value } /> );

		const innerProps = Object.assign( {}, innerContentProps, { value: linkedContent } );

		return (
			<WrappedComponent { ...props } innerContentProps={ innerProps } />
		);
	};
}

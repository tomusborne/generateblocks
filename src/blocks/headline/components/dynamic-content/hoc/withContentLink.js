
function EmptyLink( { text } ) {
	return (
		<a href="#" onClick={ ( e ) => ( e.preventDefault() ) }>{ text }</a>
	);
}

export default function withContentLink( WrappedComponent ) {
	return function( props ) {
		const { attributes, innerContentProps } = props;
		const { dynamicLinkType, termSeparator } = attributes;

		const splitContent = innerContentProps.value
			.split( termSeparator )
			.map( ( content, idx, fullContent ) => {
				if ( !! dynamicLinkType ) {
					return (
						<>
							<EmptyLink text={ content } />
							{ idx + 1 !== fullContent.length && termSeparator }
						</>
					);
				}

				return content;
		} );

		const innerProps = Object.assign( {}, innerContentProps, { value: splitContent } );


		return (
			<WrappedComponent { ...props } innerContentProps={ innerProps } />
		);
	}
}

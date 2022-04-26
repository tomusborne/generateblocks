import { select } from '@wordpress/data';

function EmptyLink( { text } ) {
	return (
		<a>{ text }</a> // eslint-disable-line jsx-a11y/anchor-is-valid
	);
}

export default function withContentLink( WrappedComponent ) {
	return function( props ) {
		const { attributes, innerContentProps } = props;
		const { dynamicLinkType, termSeparator, dynamicContentType } = attributes;

		if ( ! dynamicLinkType ) {
			return <WrappedComponent { ...props } />;
		}

		const newContent = 'terms' === dynamicContentType
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
			: innerContentProps.value;

		const formats = select( 'core/rich-text' ).getFormatTypes();

		// Remove the link option.
		const newFormats = formats.filter( ( format ) => {
			return 'core/link' !== format.name;
		} ).map( ( formatNames ) => formatNames.name );

		const innerProps = Object.assign( {}, innerContentProps, {
			value: newContent,
			tagName: 'terms' !== dynamicContentType ? 'a' : null,
			allowedFormats: newFormats,
		} );

		return (
			<WrappedComponent { ...props } innerContentProps={ innerProps } />
		);
	};
}

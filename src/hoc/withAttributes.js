import { useMemo } from '@wordpress/element';

export function withAttributes( WrappedComponent ) {
	return ( ( props ) => {
		const {
			attributes,
		} = props;

		const {
			htmlAttributes = {},
			styles = {},
		} = attributes;

		const frontendHtmlAttributes = useMemo( () => {
			if ( Array.isArray( htmlAttributes ) ) {
				return {};
			}

			return htmlAttributes;
		}, [ JSON.stringify( htmlAttributes ) ] );

		const frontendStyles = useMemo( () => {
			if ( Array.isArray( styles ) ) {
				return {};
			}

			return styles;
		}, [ JSON.stringify( styles ) ] );

		const gbAttributes = {
			...attributes,
			htmlAttributes: frontendHtmlAttributes,
			styles: frontendStyles,
		};

		return (
			<>
				<WrappedComponent
					{ ...props }
					gbAttributes={ gbAttributes }
				/>
			</>
		);
	} );
}

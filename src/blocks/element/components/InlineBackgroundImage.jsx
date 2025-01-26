import { useEffect, useMemo } from '@wordpress/element';

import { ImageUpload } from '@components/index.js';

export function InlineBackgroundImage( { htmlAttributes, setAttributes, styles, onStyleChange, context, label } ) {
	const inlineBackgroundURL = useMemo( () => {
		const { style = '' } = htmlAttributes;

		const styleParts = style.split( ';' );

		if ( 0 === styleParts.length ) {
			return '';
		}

		const inlineBackgroundPart = styleParts.find( ( part ) => (
			part.trim().startsWith( '--inline-bg-image' )
		) );

		if ( ! inlineBackgroundPart ) {
			return '';
		}

		return inlineBackgroundPart.split( 'url(' )[ 1 ].split( ')' )[ 0 ];
	}, [ htmlAttributes?.style ] );

	function onChange( value ) {
		const { style = '' } = htmlAttributes;

		const styleParts = style
			.split( ';' )
			.filter( ( part ) => (
				'' !== part && ! part.trim().startsWith( '--inline-bg-image' )
			) );

		if ( value ) {
			styleParts.push( '--inline-bg-image: url(' + value + ')' );
		}

		setAttributes( {
			htmlAttributes: {
				...htmlAttributes,
				style: styleParts.join( ';' ),
			},
		} );
	}

	useEffect( () => {
		const backgroundParts = styles?.backgroundImage?.split( ',' ) ?? [];
		const hasInlineBackgroundVariable = backgroundParts.length > 0 &&
			backgroundParts.includes( 'var(--inline-bg-image)' );
		const hasInlineBackgroundAttribute = '' !== inlineBackgroundURL;

		if ( hasInlineBackgroundVariable && ! hasInlineBackgroundAttribute ) {
			// We have the CSS, but no background image.
			// Since we can't guess the background image, let's remove the CSS.

			const cleanedBackgroundParts = backgroundParts.filter( ( part ) => {
				return part !== 'var(--inline-bg-image)';
			} );

			const cleanedBackgroundStyle = cleanedBackgroundParts.length > 0
				? cleanedBackgroundParts.join( ',' )
				: '';

			onStyleChange( 'backgroundImage', cleanedBackgroundStyle );

			if ( ! cleanedBackgroundStyle ) {
				onStyleChange( 'backgroundSize', '' );
				onStyleChange( 'backgroundRepeat', '' );
				onStyleChange( 'backgroundPosition', '' );
				onStyleChange( 'backgroundBlendMode', '' );
			}
		}

		if ( ! hasInlineBackgroundVariable && hasInlineBackgroundAttribute ) {
			// We have the background image, but no CSS.
			// Let's add the CSS.

			backgroundParts.push( 'var(--inline-bg-image)' );
			const newBackgroundStyle = backgroundParts.join( ',' );
			onStyleChange( 'backgroundImage', newBackgroundStyle );

			if ( ! styles?.backgroundSize ) {
				onStyleChange( 'backgroundSize', 'cover' );
			}

			if ( ! styles?.backgroundRepeat ) {
				onStyleChange( 'backgroundRepeat', 'no-repeat' );
			}

			if ( ! styles?.backgroundPosition ) {
				onStyleChange( 'backgroundPosition', 'center' );
			}

			if ( ! styles?.backgroundBlendMode ) {
				onStyleChange( 'backgroundBlendMode', 'normal' );
			}
		}
	}, [ styles?.backgroundImage, inlineBackgroundURL ] );

	return (
		<ImageUpload
			label={ label }
			value={ inlineBackgroundURL }
			onInsert={ ( value ) => {
				onChange( value );
			} }
			onSelectImage={ ( image ) => {
				if ( !! image ) {
					onChange( image.url );
				}
			} }
			allowDynamicTags={ true }
			onInsertDynamicTag={ ( tag ) => {
				onChange( tag );
			} }
			context={ context }
		/>
	);
}

import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import { createBlock, getBlockType } from '@wordpress/blocks';

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'generateblocks/element' ],
			isMatch: ( { useInnerContainer, variantRole } ) => {
				if ( useInnerContainer || variantRole ) {
					return false;
				}

				return true;
			},
			transform: ( attributes ) => {
				const { url, target, relNoFollow, relSponsored, globalClasses, text, icon, removeText } = attributes;
				const attributeData = getBlockType( 'generateblocks/button' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const relAttributes = [];
				const htmlAttributes = {};

				if ( url ) {
					if ( target ) {
						relAttributes.push( 'noopener' );
						relAttributes.push( 'noreferrer' );
					}

					if ( relNoFollow ) {
						relAttributes.push( 'nofollow' );
					}

					if ( relSponsored ) {
						relAttributes.push( 'sponsored' );
					}
				}

				if ( url ) {
					htmlAttributes.href = url;
				}

				if ( target ) {
					htmlAttributes.target = '_blank';
				}

				if ( relAttributes.length ) {
					htmlAttributes.rel = relAttributes.join( ' ' );
				}

				// Legacy button reverts to a `span` if there is no URL set.
				// In some cases, this is just a button with no URL (in our patterns).
				// In other cases, users have used a Button block to show an icon with no URL.
				// In this case, we should convert to a Text block with an icon.
				const isButton = !! url || ( ! url && ! icon );

				return createBlock( 'generateblocks/text', {
					globalClasses,
					content: text,
					tagName: isButton ? 'a' : 'span',
					htmlAttributes,
					styles: {
						...styles,
						textDecoration: 'none',
					},
					icon,
					iconOnly: removeText,
				} );
			},
		},
	],
};

import { convertLegacyHtmlAttributes } from '@utils/convertLegacyHtmlAttributes';
import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import { createBlock, getBlockType } from '@wordpress/blocks';

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'generateblocks/text' ],
			isMatch: ( {
				hasButtonContainer,
				variantRole,
				useGlobalStyle = false,
				isGlobalStyle = false,
			} ) => {
				if (
					hasButtonContainer ||
					variantRole,
					useGlobalStyle ||
					isGlobalStyle
				) {
					return false;
				}

				return true;
			},
			transform: ( attributes ) => {
				const {
					url,
					target,
					relNoFollow,
					relSponsored,
					globalClasses,
					text,
					icon,
					removeText,
					htmlAttributes,
					iconLocation,
					anchor,
					className,
					blockLabel,
					ariaLabel,
					buttonType,
				} = attributes;
				const attributeData = getBlockType( 'generateblocks/button' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );
				const relAttributes = [];
				const metaData = {};

				if ( blockLabel ) {
					metaData.name = blockLabel;
				}

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
					newHtmlAttributes.href = url;
				}

				if ( target ) {
					newHtmlAttributes.target = '_blank';
				}

				if ( relAttributes.length ) {
					newHtmlAttributes.rel = relAttributes.join( ' ' );
				}

				if ( anchor ) {
					newHtmlAttributes.id = anchor;
				}

				if ( ariaLabel ) {
					newHtmlAttributes[ 'aria-label' ] = ariaLabel;
				}

				const newIconLocation = 'left' === iconLocation
					? 'before'
					: 'after';

				// Legacy button reverts to a `span` if there is no URL set.
				// In some cases, this is just a button with no URL (in our patterns).
				// In other cases, users have used a Button block to show an icon with no URL.
				// In this case, we should convert to a Text block with an icon.
				const isButton = !! url || ( ! url && ! icon );

				const tagName = () => {
					if ( isButton ) {
						return 'a';
					}

					if ( 'button' === buttonType ) {
						return 'button';
					}

					return 'span';
				};

				const iconColors = icon
					? {
						'.gb-shape svg': {
							...styles[ '.gb-shape svg' ],
							fill: 'currentColor',
						},
					} : {};

				return createBlock( 'generateblocks/text', {
					globalClasses,
					content: text,
					tagName: tagName(),
					htmlAttributes: newHtmlAttributes,
					styles: {
						...styles,
						textDecoration: 'none',
						...iconColors,
					},
					icon,
					iconOnly: removeText,
					iconLocation: newIconLocation,
					className,
					metadata: metaData,
				} );
			},
		},
	],
};

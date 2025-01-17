/**
 * WordPress dependencies
 */
import { convertLegacyHtmlAttributes } from '@utils/convertLegacyHtmlAttributes';
import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import { createBlock, getBlockType } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { id, url, sizeSlug } ) => {
				return createBlock( 'generateblocks/image', {
					mediaId: id,
					mediaUrl: url,
					sizeSlug,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/post-featured-image' ],
			transform: ( { sizeSlug } ) => {
				return createBlock( 'generateblocks/image', {
					useDynamicData: true,
					dynamicContentType: 'featured-image',
					sizeSlug,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { mediaId, mediaUrl, sizeSlug } ) => {
				return createBlock( 'core/image', {
					id: mediaId,
					url: mediaUrl,
					sizeSlug,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'generateblocks/media' ],
			isMatch: ( attributes, block ) => {
				const { useGlobalStyle, isGlobalStyle } = attributes;

				if (
					useGlobalStyle ||
					isGlobalStyle
				) {
					return false;
				}

				return block.innerBlocks.length === 0;
			},
			transform: ( attributes ) => {
				const {
					mediaId,
					mediaUrl,
					alt,
					title,
					href,
					openInNewWindow,
					relNoFollow,
					relSponsored,
					anchor,
					htmlAttributes,
					globalClasses,
					blockLabel,
				} = attributes;
				const attributeData = getBlockType( 'generateblocks/image' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const linkHtmlAttributes = {};
				const relAttributes = [];
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );
				newHtmlAttributes.src = mediaUrl;

				if ( anchor ) {
					newHtmlAttributes.id = anchor;
				}

				if ( alt ) {
					newHtmlAttributes.alt = alt;
				}

				if ( title ) {
					newHtmlAttributes.title = title;
				}

				if ( href ) {
					linkHtmlAttributes.href = href;

					if ( openInNewWindow ) {
						relAttributes.push( 'noopener' );
						relAttributes.push( 'noreferrer' );
					}

					if ( relNoFollow ) {
						relAttributes.push( 'nofollow' );
					}

					if ( relSponsored ) {
						relAttributes.push( 'sponsored' );
					}

					if ( relAttributes.length > 0 ) {
						linkHtmlAttributes.rel = relAttributes.join( ' ' );
					}
				}

				const metaData = {};

				if ( blockLabel ) {
					metaData.name = blockLabel;
				}

				const customStyles = {};

				if ( ! styles.width ) {
					customStyles.width = 'auto';
				}

				if ( ! styles.height ) {
					customStyles.height = 'auto';
				}

				if ( ! styles.maxWidth ) {
					customStyles.maxWidth = '100%';
				}

				return createBlock( 'generateblocks/media', {
					tagName: 'img',
					mediaId,
					htmlAttributes: newHtmlAttributes,
					linkHtmlAttributes,
					styles: {
						...styles,
						...customStyles,
					},
					globalClasses,
					metadata: metaData,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'generateblocks/element' ],
			isMatch: ( attributes, block ) => {
				const { useGlobalStyle, isGlobalStyle } = attributes;

				if (
					useGlobalStyle ||
					isGlobalStyle
				) {
					return false;
				}

				return block.innerBlocks.length > 0;
			},
			transform: ( attributes, blocks ) => {
				const {
					mediaId,
					mediaUrl,
					alt,
					title,
					href,
					openInNewWindow,
					relNoFollow,
					relSponsored,
					anchor,
					htmlAttributes,
					globalClasses,
					blockLabel,
				} = attributes;
				const attributeData = getBlockType( 'generateblocks/image' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const linkHtmlAttributes = {};
				const relAttributes = [];
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );
				newHtmlAttributes.src = mediaUrl;

				if ( anchor ) {
					newHtmlAttributes.id = anchor;
				}

				if ( alt ) {
					newHtmlAttributes.alt = alt;
				}

				if ( title ) {
					newHtmlAttributes.title = title;
				}

				if ( href ) {
					linkHtmlAttributes.href = href;

					if ( openInNewWindow ) {
						relAttributes.push( 'noopener' );
						relAttributes.push( 'noreferrer' );
					}

					if ( relNoFollow ) {
						relAttributes.push( 'nofollow' );
					}

					if ( relSponsored ) {
						relAttributes.push( 'sponsored' );
					}

					if ( relAttributes.length > 0 ) {
						linkHtmlAttributes.rel = relAttributes.join( ' ' );
					}
				}

				const metaData = {};

				if ( blockLabel ) {
					metaData.name = blockLabel;
				}

				const customStyles = {};

				if ( ! styles.width ) {
					customStyles.width = 'auto';
				}

				if ( ! styles.height ) {
					customStyles.height = 'auto';
				}

				if ( ! styles.maxWidth ) {
					customStyles.maxWidth = '100%';
				}

				const imageBlock = createBlock( 'generateblocks/media', {
					tagName: 'img',
					mediaId,
					htmlAttributes: newHtmlAttributes,
					linkHtmlAttributes,
					styles: {
						...styles,
						...customStyles,
					},
					globalClasses,
					metadata: metaData,
				} );

				// Clone the Blocks to be Grouped
				// Failing to create new block references causes the original blocks
				// to be replaced in the switchToBlockType call thereby meaning they
				// are removed both from their original location and within the
				// new group block.
				const groupInnerBlocks = blocks.map( ( block ) => {
					if ( 'generateblocks/headline' === block.name ) {
						const {
							element,
							globalClasses: headlineGlobalClasses,
							content,
							icon,
							removeText,
							htmlAttributes: headlineHtmlAttributes,
							anchor: headlineAnchor,
							className: headlineClassName,
							blockLabel: headlineBlockLabel,
							ariaLabel,
						} = block.attributes;
						const headlineAttributeData = getBlockType( 'generateblocks/headline' )?.attributes;
						const headlineStyles = convertLocalToStyles( headlineAttributeData, block.attributes, '&:is(:hover, :focus)' );
						const newHeadlineHtmlAttributes = convertLegacyHtmlAttributes( headlineHtmlAttributes );

						if ( headlineAnchor ) {
							newHeadlineHtmlAttributes.id = anchor;
						}

						if ( ariaLabel ) {
							newHeadlineHtmlAttributes[ 'aria-label' ] = ariaLabel;
						}

						const headlineMetaData = {};

						if ( headlineBlockLabel ) {
							headlineMetaData.name = headlineBlockLabel;
						}

						return createBlock(
							'generateblocks/text',
							{
								globalClasses: headlineGlobalClasses,
								content,
								tagName: element,
								htmlAttributes: newHeadlineHtmlAttributes,
								styles: headlineStyles,
								icon,
								iconOnly: removeText,
								className: headlineClassName,
								metadata: headlineMetaData,
							}
						);
					}

					return null;
				} );

				const innerBlocks = [ imageBlock ].concat( groupInnerBlocks );

				return createBlock(
					'generateblocks/element',
					{
						tagName: 'figure',
					},
					innerBlocks
				);
			},
		},
	],
};

export default transforms;

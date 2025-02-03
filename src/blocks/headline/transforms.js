/**
 * WordPress dependencies
 */
import { convertLegacyHtmlAttributes } from '@utils/convertLegacyHtmlAttributes';
import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import {
	createBlock,
	getBlockType,
} from '@wordpress/blocks';

const elementToLevel = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
const levelToElement = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' };

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( 'generateblocks/headline', {
					content,
					element: 'p',
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { content, level } ) => {
				return createBlock( 'generateblocks/headline', {
					content,
					element: levelToElement[ level ],
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( 'core/paragraph', {
					content,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { content, element } ) => {
				return createBlock( 'core/heading', {
					content,
					level: elementToLevel.hasOwnProperty( element ) ? elementToLevel[ element ] : 2,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'generateblocks/text' ],
			isMatch: ( {
				variantRole,
				googleFont,
				useGlobalStyle = false,
				isGlobalStyle = false,
				content,
			} ) => {
				if (
					variantRole ||
					useGlobalStyle ||
					isGlobalStyle ||
					googleFont ||
					undefined === content
				) {
					return false;
				}

				return true;
			},
			transform: ( attributes ) => {
				const {
					element,
					globalClasses,
					content,
					icon,
					removeText,
					htmlAttributes,
					anchor,
					className,
					blockLabel,
					ariaLabel,
				} = attributes;
				const attributeData = getBlockType( 'generateblocks/headline' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );

				if ( anchor ) {
					newHtmlAttributes.id = anchor;
				}

				if ( ariaLabel ) {
					newHtmlAttributes[ 'aria-label' ] = ariaLabel;
				}

				const metaData = {};

				if ( blockLabel ) {
					metaData.name = blockLabel;
				}

				return createBlock( 'generateblocks/text', {
					globalClasses,
					content,
					tagName: element,
					htmlAttributes: newHtmlAttributes,
					styles,
					icon,
					iconOnly: removeText,
					className,
					metadata: metaData,
				} );
			},
		},
	],
};

export default transforms;

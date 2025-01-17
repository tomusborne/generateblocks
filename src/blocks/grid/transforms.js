import { convertLegacyHtmlAttributes } from '@utils/convertLegacyHtmlAttributes';
import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { getAtRuleValue } from '@edge22/styles-builder';
import hasNumericValue from '@utils/has-numeric-value';

const GRID_MAPPINGS = {
	'40,60': '2fr 3fr',
	'60,40': '3fr 2fr',
	'30,70': '3fr 7fr',
	'70,30': '7fr 3fr',
	'20,80': '2fr 8fr',
	'80,20': '8fr 2fr',
};

function getMostCommon( widths ) {
	if ( widths.length === 0 ) {
		return '';
	}

	const frequencyMap = {};
	let maxFrequency = 0;
	let mostCommonElement = widths[ 0 ];

	for ( const item of widths ) {
		frequencyMap[ item ] = ( frequencyMap[ item ] || 0 ) + 1;

		if ( frequencyMap[ item ] > maxFrequency ) {
			maxFrequency = frequencyMap[ item ];
			mostCommonElement = item;
		}
	}

	return mostCommonElement;
}

function getGridValue( width ) {
	let gridValue = '';

	switch ( width ) {
		case '100%':
			gridValue = '1fr';
			break;
		case '50%':
			gridValue = 'repeat(2, minmax(0, 1fr))';
			break;
		case '33.33%':
		case '33%':
			gridValue = 'repeat(3, minmax(0, 1fr))';
			break;
		case '25%':
			gridValue = 'repeat(4, minmax(0, 1fr))';
			break;
		case '20%':
			gridValue = 'repeat(5, minmax(0, 1fr))';
			break;
		case '16.66%':
		case '16%':
			gridValue = 'repeat(6, minmax(0, 1fr))';
			break;
		default:
			gridValue = 'repeat(2, minmax(0, 1fr))';
			break;
	}

	return gridValue;
}

function getGapValue( value ) {
	return hasNumericValue( value ) ? `${ value }px` : '';
}

function convertToGridValue( widths ) {
	// Early return if not exactly 2 widths
	if ( ! Array.isArray( widths ) || widths.length !== 2 ) {
		return null;
	}

	// Normalize widths by removing '%' and creating a key
	const normalizedKey = widths
		.map( ( width ) => width.replace( '%', '' ) )
		.join( ',' );

	return GRID_MAPPINGS[ normalizedKey ] || null;
}

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'generateblocks/element' ],
			isMatch: ( {
				isQueryLoop,
			} ) => {
				if (
					isQueryLoop
				) {
					return false;
				}

				return true;
			},
			transform: ( attributes, blocks ) => {
				const {
					htmlAttributes,
					blockLabel,
					globalClasses,
					anchor,
					className,
					verticalGap,
					verticalGapTablet,
					verticalGapMobile,
					horizontalGap,
					horizontalGapTablet,
					horizontalGapMobile,
				} = attributes;
				const attributeData = getBlockType( 'generateblocks/grid' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );

				if ( anchor ) {
					newHtmlAttributes.id = anchor;
				}

				const metaData = {};

				if ( blockLabel ) {
					metaData.name = blockLabel;
				}

				const blockWidths = {
					desktop: [],
					tablet: [],
					mobile: [],
				};

				blocks.forEach( ( block ) => {
					blockWidths.desktop.push( block.attributes.sizing?.width );
					blockWidths.tablet.push( block.attributes.sizing?.widthTablet );
					blockWidths.mobile.push( block.attributes.sizing?.widthMobile );
				} );

				// Get the most common width for each device.
				const mostCommonDesktopWidth = getMostCommon( blockWidths.desktop );
				const mostCommonTabletWidth = getMostCommon( blockWidths.tablet );
				const mostCommonMobileWidth = getMostCommon( blockWidths.mobile );

				// Clone the Blocks to be Grouped
				// Failing to create new block references causes the original blocks
				// to be replaced in the switchToBlockType call thereby meaning they
				// are removed both from their original location and within the
				// new group block.
				const groupInnerBlocks = blocks.map( ( block ) => {
					return createBlock(
						block.name,
						{
							...block.attributes,
							sizing: {},
						},
						block.innerBlocks
					);
				} );

				const tabletAtRule = getAtRuleValue( 'mediumSmallWidth' );
				const mobileAtRule = getAtRuleValue( 'smallWidth' );
				const tabletGridValue = getGridValue( mostCommonTabletWidth );
				const mobileGridValue = getGridValue( mostCommonMobileWidth );

				const desktopWidths = blockWidths.desktop;
				const desktopGridValue = convertToGridValue( desktopWidths ) || getGridValue( mostCommonDesktopWidth );

				return createBlock(
					'generateblocks/element',
					{
						tagName: 'div',
						styles: {
							...styles,
							display: 'grid',
							gridTemplateColumns: desktopGridValue,
							columnGap: getGapValue( horizontalGap ),
							rowGap: getGapValue( verticalGap ),
							[ tabletAtRule ]: {
								...styles[ tabletAtRule ],
								gridTemplateColumns: tabletGridValue,
								columnGap: getGapValue( horizontalGapTablet ),
								rowGap: getGapValue( verticalGapTablet ),
							},
							[ mobileAtRule ]: {
								...styles[ mobileAtRule ],
								gridTemplateColumns: tabletGridValue !== mobileGridValue
									? mobileGridValue
									: '',
								columnGap: getGapValue( horizontalGapMobile ),
								rowGap: getGapValue( verticalGapMobile ),
							},
						},
						htmlAttributes: newHtmlAttributes,
						metadata: metaData,
						globalClasses,
						className,
					},
					groupInnerBlocks
				);
			},
		},
	],
};

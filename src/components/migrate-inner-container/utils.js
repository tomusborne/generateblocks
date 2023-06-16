import hasNumericValue from '../../utils/has-numeric-value';
import sizingValue from '../../utils/sizingValue';
import { createBlock } from '@wordpress/blocks';

/**
 * Returns migrated layout options for new Layout panel in 1.7.0.
 *
 * @param {Object} attributes The block attributes.
 * @return {Object} The new attributes.
 */
function getLayoutAttributes( attributes ) {
	const {
		isGrid,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		sizing,
		bgImage,
		bgOptions,
		useDynamicData,
		dynamicContentType,
		zindex,
		gradient,
		gradientSelector,
		shapeDividers,
		linkType,
		url,
		dynamicLinkType,
		advBackgrounds,
		gpInlinePostMeta,
		gpInlinePostMetaJustify,
		gpInlinePostMetaJustifyTablet,
		gpInlinePostMetaJustifyMobile,
	} = attributes;

	const layoutAttributes = {};
	let setMinHeightFlex = false;

	if ( sizingValue( 'minHeight', sizing ) && verticalAlignment && ! isGrid ) {
		layoutAttributes.display = 'flex';
		layoutAttributes.flexDirection = 'column';
		layoutAttributes.justifyContent = verticalAlignment;
		setMinHeightFlex = true;
	}

	if ( isGrid && verticalAlignment ) {
		layoutAttributes.display = 'flex';
		layoutAttributes.flexDirection = 'column';
		layoutAttributes.justifyContent = verticalAlignment;
	}

	if ( ! isGrid ) {
		if ( ! setMinHeightFlex && sizingValue( 'minHeightTablet', sizing ) && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.displayTablet = 'flex';
			layoutAttributes.flexDirectionTablet = 'column';
			setMinHeightFlex = true;
		}

		if ( setMinHeightFlex && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.justifyContentTablet = verticalAlignmentTablet;
		}
	}

	if ( isGrid && verticalAlignmentTablet && 'inherit' !== verticalAlignmentTablet ) {
		layoutAttributes.justifyContentTablet = verticalAlignmentTablet;
	}

	if ( ! isGrid ) {
		if ( ! setMinHeightFlex && sizingValue( 'minHeightMobile', sizing ) && 'inherit' !== verticalAlignmentMobile ) {
			layoutAttributes.displayMobile = 'flex';
			layoutAttributes.flexDirectionMobile = 'column';
			setMinHeightFlex = true;
		}

		if ( setMinHeightFlex && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.justifyContentMobile = verticalAlignmentMobile;
		}
	}

	if ( isGrid && verticalAlignmentMobile && 'inherit' !== verticalAlignmentMobile ) {
		layoutAttributes.justifyContentMobile = verticalAlignmentMobile;
	}

	const hasBgImage = !! bgImage || ( useDynamicData && '' !== dynamicContentType );

	if ( zindex || shapeDividers.length ) {
		layoutAttributes.position = 'relative';
	}

	if (
		( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
		( gradient && 'pseudo-element' === gradientSelector ) ||
		advBackgrounds?.length
	) {
		layoutAttributes.position = 'relative';
		layoutAttributes.overflowX = 'hidden';
		layoutAttributes.overflowY = 'hidden';
	}

	// GB Pro features.
	if ( 'hidden-link' === linkType && ( url || ( useDynamicData && dynamicLinkType ) ) ) {
		layoutAttributes.position = 'relative';
	}

	// GP Premium feature.
	if ( gpInlinePostMeta ) {
		layoutAttributes.display = 'flex';
		layoutAttributes.alignItems = 'center';
		layoutAttributes.gpInlinePostMeta = false;

		if ( gpInlinePostMetaJustify ) {
			layoutAttributes.justifyContent = gpInlinePostMetaJustify;
			layoutAttributes.gpInlinePostMetaJustify = '';
		}

		if ( gpInlinePostMetaJustifyTablet ) {
			layoutAttributes.justifyContentTablet = gpInlinePostMetaJustifyTablet;
			layoutAttributes.gpInlinePostMetaJustifyTablet = '';
		}

		if ( gpInlinePostMetaJustifyMobile ) {
			layoutAttributes.justifyContentMobile = gpInlinePostMetaJustifyMobile;
			layoutAttributes.gpInlinePostMetaJustifyMobile = '';
		}
	}

	return layoutAttributes;
}

/**
 * Check if we should wrap block contents in an additional Container.
 *
 * @param {Object} props The function props.
 * @return {boolean} Whether to add an inner Container.
 */
function shouldMigrateInnerContainer( props ) {
	const {
		attributes,
		insideGridBlock,
		childBlock,
	} = props;

	const {
		outerContainer,
		innerContainer,
		innerZindex,
	} = attributes;

	let recommend = false;

	if ( 'full' === outerContainer && 'contained' === innerContainer ) {
		recommend = true;
	}

	if ( insideGridBlock ) {
		recommend = false;
	}

	if ( childBlock && 'generateblocks/container' === childBlock.name ) {
		// This block already has a contained inner Container.
		if ( 'contained' === childBlock.attributes.outerContainer ) {
			recommend = false;
		}
	}

	if ( hasNumericValue( innerZindex ) ) {
		recommend = true;
	}

	// Some effects target the inner container.
	const effects = [ 'opacities', 'transitions', 'boxShadows', 'transforms', 'textShadows', 'filters' ];

	effects.forEach( ( effect ) => {
		const hasInnerContainerEffect =
			attributes[ effect ] &&
			attributes[ effect ].some( ( type ) => 'innerContainer' === type.target );

		if ( hasInnerContainerEffect ) {
			recommend = true;
		}
	} );

	return recommend;
}

/**
 * Wrap all child blocks in an additional Container block.
 *
 * @param {Object} props The function props.
 */
function doInnerContainerMigration( props ) {
	const {
		attributes,
		setAttributes,
		parentBlock,
		replaceBlocks,
		insertBlocks,
		clientId,
	} = props;

	const {
		isGrid,
		containerWidth,
		outerContainer,
		innerContainer,
		innerZindex,
		useGlobalMaxWidth,
		spacing,
	} = attributes;

	const childBlocks = parentBlock.innerBlocks;
	const hasDefaultContainerWidth = parseInt( containerWidth ) === parseInt( generateBlocksInfo.globalContainerWidth );
	const layoutAttributes = getLayoutAttributes( attributes );

	// We need to create new block instances for each inner block
	// to prevent a bug where re-usable block content is removed
	// during migration.
	const newChildBlocks = childBlocks.map( ( block ) => {
		return createBlock(
			block.name,
			block.attributes,
			block.innerBlocks
		);
	} );

	// Wrap our existing child blocks in a new Container block.
	const newInnerBlocks = createBlock(
		'generateblocks/container',
		{
			spacing: {
				paddingTop: spacing?.paddingTop,
				paddingRight: spacing?.paddingRight,
				paddingBottom: spacing?.paddingBottom,
				paddingLeft: spacing?.paddingLeft,
				paddingTopTablet: spacing?.paddingTopTablet,
				paddingRightTablet: spacing?.paddingRightTablet,
				paddingBottomTablet: spacing?.paddingBottomTablet,
				paddingLeftTablet: spacing?.paddingLeftTablet,
				paddingTopMobile: spacing?.paddingTopMobile,
				paddingRightMobile: spacing?.paddingRightMobile,
				paddingBottomMobile: spacing?.paddingBottomMobile,
				paddingLeftMobile: spacing?.paddingLeftMobile,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
			useGlobalMaxWidth: 'contained' === innerContainer ? !! hasDefaultContainerWidth : useGlobalMaxWidth,
			sizing: {
				maxWidth: 'contained' === innerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
			},
			zindex: innerZindex,
			position: innerZindex || 0 === innerZindex ? 'relative' : '',
		},
		newChildBlocks
	);

	const childClientIds = childBlocks.map( ( block ) => block.clientId );

	if ( childClientIds.length > 0 ) {
		replaceBlocks( childClientIds, newInnerBlocks );
	} else {
		insertBlocks( newInnerBlocks, 0, clientId );
	}

	// Update attributes for existing Container block.
	setAttributes( {
		useInnerContainer: false,
		spacing: {
			paddingTop: '',
			paddingRight: '',
			paddingBottom: '',
			paddingLeft: '',
			paddingTopTablet: '',
			paddingRightTablet: '',
			paddingBottomTablet: '',
			paddingLeftTablet: '',
			paddingTopMobile: '',
			paddingRightMobile: '',
			paddingBottomMobile: '',
			paddingLeftMobile: '',
			marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : spacing?.marginLeft,
			marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : spacing?.marginRight,
		},
		useGlobalMaxWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
		sizing: {
			height: isGrid ? '100%' : '',
			maxWidth: ! isGrid && 'contained' === outerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
		},
		...layoutAttributes,
	} );
}

/**
 * Just updates current Container block attributes.
 * Doesn't wrap inner blocks.
 *
 * @param {Object} props The function props.
 */
function doSimpleMigration( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		isGrid,
		outerContainer,
		containerWidth,
		spacing,
	} = attributes;

	const hasDefaultContainerWidth = parseInt( containerWidth ) === parseInt( generateBlocksInfo.globalContainerWidth );
	const layoutAttributes = getLayoutAttributes( attributes );

	setAttributes( {
		useInnerContainer: false,
		useGlobalMaxWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
		spacing: {
			marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : spacing?.marginLeft,
			marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : spacing?.marginRight,
		},
		sizing: {
			height: isGrid ? '100%' : '',
			maxWidth: ! isGrid && 'contained' === outerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
		},
		...layoutAttributes,
	} );
}

export {
	shouldMigrateInnerContainer,
	doInnerContainerMigration,
	getLayoutAttributes,
	doSimpleMigration,
};

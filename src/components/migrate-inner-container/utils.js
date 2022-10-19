import hasNumericValue from '../../utils/has-numeric-value';
import sizingValue from '../../utils/sizingValue';
import { createBlock } from '@wordpress/blocks';

function getLayoutAttributes( attributes ) {
	const {
		isGrid,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		sizing,
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

	return layoutAttributes;
}

function shouldMigrateInnerContainer( { attributes, insideGridBlock, childBlock } ) {
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

	return recommend;
}

function doInnerContainerMigration( props ) {
	const {
		clientId,
		attributes,
		setAttributes,
		parentBlock,
		hasParentBlock,
		removeBlocks,
		insertBlocks,
	} = props;

	const {
		isGrid,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingTopTablet,
		paddingRightTablet,
		paddingBottomTablet,
		paddingLeftTablet,
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingUnit,
		containerWidth,
		outerContainer,
		innerContainer,
		innerZindex,
		marginLeft,
		marginRight,
		useGlobalContainerWidth,
	} = attributes;

	const childBlocks = parentBlock.innerBlocks;
	const hasDefaultContainerWidth = parseInt( containerWidth ) === parseInt( generateBlocksInfo.globalContainerWidth );
	const layoutAttributes = getLayoutAttributes( attributes );

	const newInnerBlocks = createBlock(
		'generateblocks/container',
		{
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			useGlobalContainerWidth: 'contained' === innerContainer ? !! hasDefaultContainerWidth : useGlobalContainerWidth,
			marginLeft: 'auto',
			marginRight: 'auto',
			zindex: innerZindex,
		},
		childBlocks
	);

	const childClientIds = childBlocks.map( ( block ) => block.clientId );
	removeBlocks( childClientIds );
	insertBlocks( newInnerBlocks, 0, clientId );

	setAttributes( {
		useInnerContainer: false,
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
		paddingUnit: generateBlocksDefaults.container.paddingUnit,
		variantRole: ! hasParentBlock ? 'section' : '',
		useGlobalContainerWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
		marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : marginLeft,
		marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : marginRight,
		sizing: {
			...attributes.sizing,
			height: isGrid ? '100%' : '',
			maxWidth: ! isGrid && 'contained' === outerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
		},
		...layoutAttributes,
	} );
}

function doSimpleMigration( { attributes, setAttributes } ) {
	const {
		isGrid,
		outerContainer,
		marginLeft,
		marginRight,
		containerWidth,
	} = attributes;

	const hasDefaultContainerWidth = parseInt( containerWidth ) === parseInt( generateBlocksInfo.globalContainerWidth );
	const layoutAttributes = getLayoutAttributes( attributes );

	setAttributes( {
		useInnerContainer: false,
		useGlobalContainerWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
		marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : marginLeft,
		marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : marginRight,
		sizing: {
			...attributes.sizing,
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

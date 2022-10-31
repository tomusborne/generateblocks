import { createContext } from '@wordpress/element';
import defaultContext from './default';
import headlineContext from './headline';
import buttonContainerContext from './button-container';
import buttonContext from './button';
import imageContext from './image';
import gridContext from './grid';
import containerContext from './container';
import getElementAttributes from '../extend/inspector-control/controls/element/attributes';
import getTypographyAttributes from '../extend/inspector-control/controls/typography/attributes';
import getSpacingAttributes from '../extend/inspector-control/controls/spacing/attributes';
import getColorsAttributes from '../extend/inspector-control/controls/colors/attributes';
import getIconAttributes from '../extend/inspector-control/controls/icon/attributes';
import getBackgroundGradientAttributes from '../extend/inspector-control/controls/background-panel/attributes';
import getLayoutAttributes from '../extend/inspector-control/controls/layout/attributes';
import getSizingAttributes from '../extend/inspector-control/controls/sizing/attributes';
import getFlexChildAttributes from '../extend/inspector-control/controls/flex-child-panel/attributes';

/**
 * The BlockContext represents the layer to build the block components.
 *
 * @type {Object<{hasResponsiveTabs: boolean, hasTypography: boolean}>}
 */
const BlockContext = createContext( defaultContext );

/**
 * Given a block name return the correct context.
 *
 * @param {string} blockName The block name.
 * @return {Object} The block context.
 */
export function getBlockContext( blockName ) {
	return {
		'generateblocks/headline': headlineContext,
		'generateblocks/button-container': buttonContainerContext,
		'generateblocks/button': buttonContext,
		'generateblocks/image': imageContext,
		'generateblocks/grid': gridContext,
		'generateblocks/container': containerContext,
	}[ blockName ];
}

/**
 * High order component to wrap a component within the BlockContext provider.
 *
 * @param {function(*)} WrappedComponent The component to add the context provider.
 * @return {function(*)} The component with context provider.
 */
export const withBlockContext = ( WrappedComponent ) => ( ( props ) => {
	const blockContext = getBlockContext( props.name );
	const isInQueryLoop = 'undefined' !== typeof props.context[ 'generateblocks/queryId' ];
	const blockName = props.name;
	const clientId = props.clientId;

	return (
		<BlockContext.Provider value={ Object.assign( {}, blockContext, { isInQueryLoop, blockName, clientId } ) }>
			<WrappedComponent { ...props } />
		</BlockContext.Provider>
	);
} );

/**
 * Returns the attributes list based on the context.
 *
 * @param {Object} blockAttributes The block attributes.
 * @param {Object} context         The context.
 * @param {Object} defaults        The default values.
 *
 * @return {Object} The complete list of attributes.
 */
export function getBlockAttributes( blockAttributes, context, defaults ) {
	let attributes = Object.assign( {}, blockAttributes );

	if ( context.supports.htmlTags.enabled ) {
		attributes = Object.assign( {}, attributes, getElementAttributes( defaults ) );
	}

	if ( context.supports.layout.enabled ) {
		attributes = Object.assign( {}, attributes, getLayoutAttributes( defaults ) );
	}

	if ( context.supports.flexChildPanel.enabled ) {
		attributes = Object.assign( {}, attributes, getFlexChildAttributes( defaults ) );
	}

	if ( context.supports.sizingPanel.enabled ) {
		attributes = Object.assign( {}, attributes, getSizingAttributes( defaults ) );
	}

	if ( context.supports.typography.enabled ) {
		attributes = Object.assign( {}, attributes, getTypographyAttributes( defaults ) );
	}

	if ( context.supports.spacing.enabled ) {
		attributes = Object.assign( {}, attributes, getSpacingAttributes( defaults ) );
	}

	if ( context.supports.colors.enabled ) {
		attributes = Object.assign( {}, attributes, getColorsAttributes( defaults ) );
	}

	if ( context.supports.backgroundPanel.enabled ) {
		attributes = Object.assign( {}, attributes, getBackgroundGradientAttributes( defaults ) );
	}

	if ( context.supports.icon.enabled ) {
		attributes = Object.assign( {}, attributes, getIconAttributes( defaults ) );
	}

	return attributes;
}

export default BlockContext;

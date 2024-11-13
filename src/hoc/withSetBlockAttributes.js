import { useDispatch, useSelect } from '@wordpress/data';

import { getCss } from '@edge22/styles-builder';
import { getSelector } from './withStyles';

function deepMerge( target, ...sources ) {
	if ( ! sources.length ) {
		return target;
	}
	const source = sources.shift();

	if ( isObject( target ) && isObject( source ) ) {
		for ( const key in source ) {
			if ( isObject( source[ key ] ) ) {
				if ( ! target[ key ] ) {
					Object.assign( target, { [ key ]: {} } );
				}
				deepMerge( target[ key ], source[ key ] );
			} else {
				Object.assign( target, { [ key ]: source[ key ] } );
			}
		}
	}

	return deepMerge( target, ...sources );
}

function isObject( item ) {
	return ( item && typeof item === 'object' && ! Array.isArray( item ) );
}

/**
 * This HOC replaces the core "setAttributes" for an enhanced version.
 *
 * @param {Function} WrappedComponent The component.
 * @return {Function} The wrapped component.
 */
export const withSetBlockAttributes = ( WrappedComponent ) => ( ( props ) => {
	const {
		setAttributes,
		attributes,
		name,
	} = props;

	const {
		styles,
		uniqueId,
	} = attributes;

	const multiSelectedBlocks = useSelect( ( select ) => (
		select( 'core/block-editor' )?.getMultiSelectedBlocks() || []
	), [] );

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	async function setBlockAttributes( attrs ) {
		if ( multiSelectedBlocks.length === 0 ) {
			const existingStyles = styles;
			const newStyles = attrs?.styles;

			if ( ! newStyles ) {
				setAttributes( attrs );
				return;
			}

			const mergedStyles = deepMerge( { ...existingStyles }, newStyles );

			const selector = getSelector( name, uniqueId );
			const css = await getCss( selector, mergedStyles );

			setAttributes( { styles: mergedStyles, css } );
			return;
		}

		const blockPromises = multiSelectedBlocks.map( async( block ) => {
			const blockUniqueId = block.attributes.uniqueId ?? '';

			if ( ! blockUniqueId ) {
				return {
					clientId: block.clientId,
					blockAttrs: attrs,
				};
			}

			const existingStyles = block?.attributes?.styles;
			const newStyles = attrs?.styles;

			if ( ! newStyles ) {
				return {
					clientId: block.clientId,
					blockAttrs: attrs,
				};
			}

			const mergedStyles = deepMerge( { ...existingStyles }, newStyles );
			const selector = getSelector( block.name, blockUniqueId );
			const css = await getCss( selector, mergedStyles );

			return {
				clientId: block.clientId,
				blockAttrs: {
					styles: mergedStyles,
					css,
				},
			};
		} );

		const blocks = await Promise.all( blockPromises );
		const clientIds = blocks.map( ( block ) => block.clientId );
		const blockAttrs = blocks.reduce( ( result, block ) => {
			result[ block.clientId ] = block.blockAttrs;
			return result;
		}, {} );

		updateBlockAttributes( clientIds, blockAttrs, true );
	}

	return ( <WrappedComponent { ...props } setAttributes={ setBlockAttributes } /> );
} );

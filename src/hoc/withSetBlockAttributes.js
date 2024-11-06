import { useDispatch, useSelect } from '@wordpress/data';

import { getCss } from '@edge22/styles-builder';
import fastDeepEqual from 'fast-deep-equal';
import { getSelector } from './withStyles';

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

			if ( ! newStyles || fastDeepEqual( existingStyles, newStyles ) ) {
				// There are no styles, or no changed styles, so just set the attributes.
				setAttributes( attrs );
				return;
			}

			const selector = getSelector( name, uniqueId );
			const css = await getCss( selector, newStyles );

			setAttributes( { ...attrs, css } );
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

			if ( ! newStyles || fastDeepEqual( existingStyles, newStyles ) ) {
				// There are no styles, or no changed styles, so just return the attributes.
				return {
					clientId: block.clientId,
					blockAttrs: attrs,
				};
			}

			const selector = getSelector( block.name, blockUniqueId );
			const css = await getCss( selector, newStyles );

			return {
				clientId: block.clientId,
				blockAttrs: {
					...attrs,
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

import { useEffect } from '@wordpress/element';
import getEditorBlocks from '../utils/get-editor-blocks';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Search all blocks for uniqueIds
 *
 * @param {Array} blocks The blocks array
 * @return {Array} The array of uniqueIds
 */
export const getUniqueIdFromBlocks = ( blocks ) => blocks
	.reduce( ( result, block ) => {
		if (
			( block.name && block.name.includes( 'generateblocks' ) ) &&
			( block.attributes && block.attributes.uniqueId )
		) {
			result.uniqueIds.push( block.attributes.uniqueId );
			result.clientIds.push( block.clientId );
		}

		if ( block.innerBlocks ) {
			const { uniqueIds, clientIds } = getUniqueIdFromBlocks( block.innerBlocks );
			result.uniqueIds = result.uniqueIds.concat( uniqueIds );
			result.clientIds = result.clientIds.concat( clientIds );
		}

		return result;
	}, { uniqueIds: [], clientIds: [] } );

/**
 * Generates a unique id based on the clientId
 *
 * @param {string} clientId The block clientId
 * @return {string} The uniqueId
 */
export const generateUniqueId = ( clientId ) => clientId.substr( 2, 9 ).replace( '-', '' );

/**
 * Checks if the array contains duplicates of the value
 *
 * @param {Array}  arr          The array to check the values
 * @param {any}    value        The value to check if has duplicates
 * @param {number} currentIndex The current index
 * @return {boolean} If the array has duplicates
 */
export const hasDuplicates = ( arr, value, currentIndex ) => (
	arr.filter( ( el ) => ( el === value ) ).length > 1 &&
	currentIndex === arr.lastIndexOf( value )
);

/**
 * It will enhance a block component with the attributes.uniqueId property
 *
 * @param {any} WrappedComponent The component to add the uniqueId
 * @return {function(*)} The wrapped component
 */
export default ( WrappedComponent ) => ( ( props ) => {
	const { clientId, attributes } = props;
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	useEffect( () => {
		const { uniqueIds, clientIds } = getUniqueIdFromBlocks( getEditorBlocks() );

		if (
			! attributes.uniqueId ||
			hasDuplicates( uniqueIds, attributes.uniqueId, clientIds.indexOf( clientId ) )
		) {
			const uniqueId = generateUniqueId( clientId );

			updateBlockAttributes( clientId, { uniqueId } );
		}
	}, [ clientId ] );

	return ( <WrappedComponent { ...props } /> );
} );

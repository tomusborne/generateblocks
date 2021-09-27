import getEditorBlocks from '../utils/get-editor-blocks';

/**
 * Search all blocks for uniqueIds
 *
 * @param blocks
 */
export const getUniqueIdFromBlocks = ( blocks ) => blocks
	.reduce( ( uniqueIds, block ) => {
		if (
			( block.name && block.name.includes( 'generateblocks' ) )
			&& ( block.attributes && block.attributes.uniqueId )
		) {
			uniqueIds.push( block.attributes.uniqueId );
		}

		if ( block.innerBlocks ) {
			uniqueIds = uniqueIds.concat( getUniqueIdFromBlocks( block.innerBlocks ) );
		}

		return uniqueIds;
	}, [] );

/**
 * Generates a unique id based on the clientId
 *
 * @param {string} clientId The block clientId
 * @returns {string} The uniqueId
 */
export const generateUniqueId = ( clientId ) => clientId.substr( 2, 9 ).replace( '-', '' );

/**
 * Checks if the array contains duplicates of the value
 *
 * @param {array} arr The array to check the values
 * @param {any} value The value to check if has duplicates
 * @returns {boolean}
 */
export const hasDuplicates = ( arr, value ) => arr.filter( ( el ) => ( el === value ) ).length > 1;

/**
 * It will enhance a block component with the attributes.uniqueId property
 *
 * @param WrappedComponent The component to add the uniqueId
 * @returns {function(*)} The wrapped component
 */
export default ( WrappedComponent ) => ( ( props ) => {
	const { clientId, attributes, setAttributes } = props;
	const uniqueIds = getUniqueIdFromBlocks( getEditorBlocks() );

	if ( ! attributes.uniqueId || '' === attributes.uniqueId || hasDuplicates( uniqueIds, attributes.uniqueId ) ) {
		const uniqueId = generateUniqueId( clientId );

		setAttributes( { uniqueId } );
	}

	return ( <WrappedComponent { ...props } /> );
} );

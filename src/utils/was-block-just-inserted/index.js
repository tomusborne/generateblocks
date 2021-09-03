/**
 * Check if a block was just inserted.
 *
 * @param {Object} attributes The value to check.
 * @return {boolean} Whether a block was just inserted.
 */
export default function wasBlockJustInserted( attributes ) {
	return '' === attributes.uniqueId;
}

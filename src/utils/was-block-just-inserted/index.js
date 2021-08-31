/**
 * Check if a block was just inserted.
 *
 * @param {Object} props The value to check.
 * @return {boolean} Whether a block was just inserted.
 */
export default function wasBlockJustInserted( props ) {
	return props.wasBlockJustInserted || props.attributes.wasBlockJustInserted;
}

/**
 * Check if we have a value.
 *
 * @param {string} value The value to check.
 * @return {boolean} Whether a value exists.
 */
export default function hasValue( value ) {
	return value || 0 === value ? true : false;
}

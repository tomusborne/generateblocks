/**
 * Check if object is empty
 *
 * @param obj The object to check
 *
 * @returns {boolean}
 */
export default ( obj ) => ( obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype );

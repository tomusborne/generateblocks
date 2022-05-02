/**
 * Check if object is empty
 *
 * @param {Object} obj The object to check
 * @return {boolean} If the object is empty
 */
export default ( obj ) => ( obj && Object.keys( obj ).length === 0 && Object.getPrototypeOf( obj ) === Object.prototype );

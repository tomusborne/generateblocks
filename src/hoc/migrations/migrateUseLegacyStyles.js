import isBlockVersionLessThan from '../../utils/check-block-version';

/**
 * Build an iconStyles padding object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export function migrateUseLegacyStyles( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		const newAttrs = {};

		if (
			existingAttrs?.uniqueId &&
			isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan )
		) {
			// If we have a uniqueId (not a new block) and our block version doesn't check out,
			// we need to set useLegacyStyles to true.
			newAttrs.useLegacyStyles = true;
		}

		return { ...attrs, ...newAttrs };
	};
}

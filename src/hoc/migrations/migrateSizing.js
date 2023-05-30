import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';
import { addToAttrsObject } from './utils';

/**
 * Build an object with new migrated attributes and old attributes reverted to defaults.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The existing block attributes.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
function buildSizingAttributes( { attributes } ) {
	const newAttributes = {};
	const oldAttributes = {};

	// Only migrate these if we're an active Grid item.
	if ( attributes.isGrid ) {
		if ( attributes.width ) {
			newAttributes.width = attributes.width + '%';
			oldAttributes.width = '';
		}

		if ( attributes.widthTablet || attributes.autoWidthTablet ) {
			newAttributes.widthTablet = attributes.autoWidthTablet ? 'auto' : attributes.widthTablet + '%';
			oldAttributes.widthTablet = '';
			oldAttributes.autoWidthTablet = false;
		}

		if ( attributes.widthMobile || attributes.autoWidthMobile ) {
			newAttributes.widthMobile = attributes.autoWidthMobile ? 'auto' : attributes.widthMobile + '%';
			oldAttributes.widthMobile = '';
			oldAttributes.autoWidthMobile = false;
		}
	}

	if ( attributes.minHeight ) {
		newAttributes.minHeight = attributes.minHeight + attributes.minHeightUnit;
		oldAttributes.minHeight = false;
		oldAttributes.minHeightUnit = 'px';
	}

	if ( attributes.minHeightTablet ) {
		newAttributes.minHeightTablet = attributes.minHeightTablet + attributes.minHeightUnitTablet;
		oldAttributes.minHeightTablet = false;
		oldAttributes.minHeightUnitTablet = 'px';
	}

	if ( attributes.minHeightMobile ) {
		newAttributes.minHeightMobile = attributes.minHeightMobile + attributes.minHeightUnitMobile;
		oldAttributes.minHeightMobile = false;
		oldAttributes.minHeightUnitMobile = 'px';
	}

	return { newAttributes, oldAttributes };
}

/**
 * Build a sizing object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} New attributes.
 * @since 1.7.0
 */
export default function migrateSizing( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newSizing = buildSizingAttributes( {
				attributes: { ...existingAttrs, ...attrs },
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'sizing',
				existingAttrs: existingAttrs.sizing,
				newAttrs: newSizing.newAttributes,
				oldAttrs: newSizing.oldAttributes,
			} );
		}

		return attrs;
	};
}

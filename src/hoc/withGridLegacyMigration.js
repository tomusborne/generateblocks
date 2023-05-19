import { useEffect } from '@wordpress/element';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import hasNumericValue from '../utils/has-numeric-value';
import { migrationPipe, updateBlockVersion, setIsDynamic } from './migrations/utils';
import { isEmpty } from 'lodash';

/**
 * Set our old defaults as static values.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.oldDefaults          Old defaults that were changed and need to be added to attributes.
 * @return {Object} Updated attributes.
 * @since 1.4.0
 */
export function migrateOldGridDefaults( { blockVersionLessThan, oldDefaults } ) {
	return function( attrs, existingAttrs, mode ) {
		if ( 'css' === mode ) {
			return attrs;
		}

		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const hasGlobalStyle = existingAttrs.useGlobalStyle && existingAttrs.globalStyleId;

			if ( ! hasGlobalStyle && ! hasNumericValue( existingAttrs.horizontalGap ) ) {
				attrs.horizontalGap = oldDefaults.horizontalGap;
			}
		}

		return attrs;
	};
}

/**
 * Prevent layouts from switching to row-gap.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.7.0
 */
export function migrateLegacyRowGap( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs, mode ) {
		if ( 'css' === mode ) {
			return attrs;
		}

		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			attrs.useLegacyRowGap = true;
		}

		return attrs;
	};
}

/**
 * Migrate our Grid attributes.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The block attributes.
 * @param {string} Props.mode       The migration mode.
 * @return {Object} Updated attributes.
 * @since 1.8.0
 */
export function migrateGridAttributes( { attributes, mode = '' } ) {
	return migrationPipe(
		attributes,
		[
			setIsDynamic,
			migrateOldGridDefaults( {
				blockVersionLessThan: 2,
				oldDefaults: generateBlocksLegacyDefaults.v_1_4_0.gridContainer,
			} ),
			migrateLegacyRowGap( {
				blockVersionLessThan: 3,
			} ),
			updateBlockVersion( 3 ),
		],
		mode
	);
}

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const newAttributes = migrateGridAttributes( { attributes } );

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

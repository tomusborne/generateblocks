import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import hasNumericValue from '../utils/has-numeric-value';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import { migrationPipe, updateBlockVersion, setIsDynamic } from './migrations/utils';
import migrateSpacing from './migrations/migrateSpacing';
import migrateBorders from './migrations/migrateBorders';
import migrateTypography from './migrations/migrateTypography';
import migrateSizing from './migrations/migrateSizing';
import { isEmpty } from 'lodash';

/**
 * Add late-added attributes to the bgOptions object.
 * This was to prevent an error where `selector` was undefined.
 * Really not sure it's still needed.
 *
 * @param {Object} attrs         New attributes from previous migrations.
 * @param {Object} existingAttrs Pre-existing block attributes.
 * @return {Object} Updated attributes.
 * @since 1.1.2
 */
export function migrateBgSelectorOpacity( attrs, existingAttrs ) {
	if ( 'undefined' === typeof existingAttrs.bgOptions.selector ) {
		attrs = {
			...attrs,
			bgOptions: {
				...existingAttrs.bgOptions,
				...attrs.bgOptions,
				selector: 'element',
			},
		};
	}

	if ( 'undefined' === typeof existingAttrs.bgOptions.opacity ) {
		attrs = {
			...attrs,
			bgOptions: {
				...existingAttrs.bgOptions,
				...attrs.bgOptions,
				opacity: 1,
			},
		};
	}

	return attrs;
}

/**
 * Set our old defaults as static values.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.oldDefaults          Old defaults that were changed and need to be added to attributes.
 * @return {Object} Updated attributes.
 * @since 1.4.0
 */
export function migrateOldContainerDefaults( { blockVersionLessThan, oldDefaults } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const useGlobalStyle = 'undefined' !== typeof existingAttrs.useGlobalStyle && existingAttrs.useGlobalStyle;
			const items = [];

			if ( ! useGlobalStyle ) {
				items.push(
					'paddingTop',
					'paddingRight',
					'paddingBottom',
					'paddingLeft',
				);
			}

			if ( existingAttrs.isGrid ) {
				items.push(
					'width',
					'widthMobile',
				);
			}

			if ( existingAttrs.gradient ) {
				items.push(
					'gradientDirection',
					'gradientColorOne',
					'gradientColorOneOpacity',
					'gradientColorTwo',
					'gradientColorTwoOpacity'
				);
			}

			items.forEach( ( item ) => {
				if ( ! hasNumericValue( existingAttrs[ item ] ) ) {
					attrs[ item ] = oldDefaults[ item ];
				}
			} );
		}

		return attrs;
	};
}

/**
 * Set our inner z-index if we're using a gradient overlay or pseudo background.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.4.0
 */
export function migrateContainerZIndex( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			let updateOldZindex =
			existingAttrs.gradient && 'pseudo-element' === existingAttrs.gradientSelector &&
				! hasNumericValue( existingAttrs.innerZindex );

			if ( ! updateOldZindex ) {
				updateOldZindex = !! existingAttrs.bgImage && 'undefined' !== typeof existingAttrs.bgOptions.selector && 'pseudo-element' === existingAttrs.bgOptions.selector;
			}

			if ( ! updateOldZindex ) {
				updateOldZindex = 'undefined' !== typeof existingAttrs.useAdvBackgrounds && existingAttrs.useAdvBackgrounds;
			}

			if ( updateOldZindex ) {
				attrs.innerZindex = 1;
			}
		}

		return attrs;
	};
}

/**
 * Set our useInnerContainer attribute on old Containers.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.7.0
 */
export function migrateInnerContainer( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			attrs.useInnerContainer = true;
		}

		return attrs;
	};
}

/**
 * Migrate our flexBasis attributes to include their unit.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.7.0
 */
export function migrateFlexBasis( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
				if ( existingAttrs[ 'flexBasis' + device ] && ! isNaN( existingAttrs[ 'flexBasis' + device ] ) ) {
					attrs[ 'flexBasis' + device ] = existingAttrs[ 'flexBasis' + device ] + existingAttrs.flexBasisUnit;
				}
			} );
		}

		return attrs;
	};
}

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const defaults = getBlockType( 'generateblocks/container' )?.attributes;

			const newAttributes = migrationPipe(
				attributes,
				[
					setIsDynamic,
					migrateBgSelectorOpacity,
					migrateContainerZIndex( {
						blockVersionLessThan: 2,
					} ),
					migrateOldContainerDefaults( {
						blockVersionLessThan: 2,
						oldDefaults: generateBlocksLegacyDefaults.v_1_4_0.container,
					} ),
					migrateInnerContainer( {
						blockVersionLessThan: 3,
					} ),
					migrateFlexBasis( {
						blockVersionLessThan: 3,
					} ),
					migrateSizing( {
						blockVersionLessThan: 3,
					} ),
					migrateSpacing( {
						blockVersionLessThan: 4,
						defaults,
						attributesToMigrate: [
							'paddingTop',
							'paddingRight',
							'paddingBottom',
							'paddingLeft',
							'marginTop',
							'marginRight',
							'marginBottom',
							'marginLeft',
						],
					} ),
					migrateBorders( {
						blockVersionLessThan: 4,
						defaults,
						attributesToMigrate: [
							'borderSizeTop',
							'borderSizeRight',
							'borderSizeBottom',
							'borderSizeLeft',
							'borderRadiusTopRight',
							'borderRadiusBottomRight',
							'borderRadiusBottomLeft',
							'borderRadiusTopLeft',
						],
					} ),
					migrateTypography( {
						blockVersionLessThan: 4,
						defaults,
						attributesToMigrate: [
							'fontFamily',
							'fontSize',
							'fontWeight',
							'textTransform',
							'alignment',
						],
					} ),
					updateBlockVersion( 4 ),
				]
			);

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

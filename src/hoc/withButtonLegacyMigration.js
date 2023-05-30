import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import hasNumericValue from '../utils/has-numeric-value';
import migrateTypography from './migrations/migrateTypography';
import migrateIconSizing from './migrations/migratingIconSizing';
import migrateIconPadding from './migrations/migrateIconPadding';
import { migrationPipe, updateBlockVersion } from './migrations/utils';
import { isEmpty } from 'lodash';
import migrateSpacing from './migrations/migrateSpacing';
import migrateBorders from './migrations/migrateBorders';

function oldMigrations( attrs, existingAttrs, mode ) {
	if ( 'css' === mode ) {
		return attrs;
	}

	if ( ! existingAttrs.hasIcon && !! existingAttrs.icon ) {
		attrs.hasIcon = true;
	}

	if ( ! existingAttrs.hasUrl && !! existingAttrs.url ) {
		attrs.hasUrl = true;
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
export function migrateOldButtonDefaults( { blockVersionLessThan, oldDefaults } ) {
	return function( attrs, existingAttrs, mode ) {
		if ( 'css' === mode ) {
			return attrs;
		}

		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const items = [];

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
 * Set our layout attributes for old Button blocks.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.7.0
 */
export function migrateButtonLayout( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs, mode ) {
		if ( 'css' === mode ) {
			return attrs;
		}

		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) && ! existingAttrs.useGlobalStyle ) {
			attrs = {
				...attrs,
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				alignment: 'center',
			};
		}

		return attrs;
	};
}

export const currentBlockVersion = 4;

/**
 * Migrate our Button attributes.
 *
 * @param {Object} Props             Function props.
 * @param {Object} Props.attributes  The block attributes.
 * @param {Object} Props.defaults    The block defaults.
 * @param {string} Props.mode        The migration mode.
 * @param {Object} Props.oldDefaults An object of old defaults keyed by version.
 * @return {Object} Updated attributes.
 * @since 1.8.0
 */
export function migrateButtonAttributes( { attributes, defaults, mode = '', oldDefaults = {} } ) {
	return migrationPipe(
		attributes,
		[
			oldMigrations,
			migrateOldButtonDefaults( {
				blockVersionLessThan: 2,
				oldDefaults: oldDefaults.v1_4_0,
			} ),
			migrateButtonLayout( {
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
					'letterSpacing',
					'fontWeight',
					'textTransform',
					'alignment',
				],
			} ),
			migrateIconSizing( {
				blockVersionLessThan: 4,
				defaults,
			} ),
			migrateIconPadding( {
				blockVersionLessThan: 4,
				defaults,
			} ),
			updateBlockVersion( currentBlockVersion ),
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
			const newAttributes = migrateButtonAttributes( {
				attributes,
				defaults: getBlockType( 'generateblocks/button' )?.attributes,
				oldDefaults: {
					v1_4_0: generateBlocksLegacyDefaults.v_1_4_0.button,
				},
			} );

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

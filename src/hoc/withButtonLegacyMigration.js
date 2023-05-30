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

function oldMigrations( attrs, existingAttrs ) {
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
	return function( attrs, existingAttrs ) {
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
	return function( attrs, existingAttrs ) {
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

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const defaults = getBlockType( 'generateblocks/button' )?.attributes;

			const newAttributes = migrationPipe(
				attributes,
				[
					oldMigrations,
					migrateOldButtonDefaults( {
						blockVersionLessThan: 2,
						oldDefaults: generateBlocksLegacyDefaults.v_1_4_0.button,
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

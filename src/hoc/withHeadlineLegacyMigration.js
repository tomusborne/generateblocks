import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import flexboxAlignment from '../utils/flexbox-alignment';
import migrateSpacing from './migrations/migrateSpacing';
import migrateBorders from './migrations/migrateBorders';
import migrateTypography from './migrations/migrateTypography';
import migrateIconSizing from './migrations/migratingIconSizing';
import migrateIconPadding from './migrations/migrateIconPadding';
import { migrationPipe, updateBlockVersion } from './migrations/utils';
import { isEmpty } from 'lodash';

/**
 * Set our layout attributes for old Headline blocks.
 *
 * @param {Object} attrs         Attributes from previous migrations.
 * @param {Object} existingAttrs Pre-existing block attributes.
 * @param {string} mode          The migration mode.
 * @return {Object} Updated attributes.
 * @since 1.7.0
 */
export function migrateFlex( attrs, existingAttrs, mode ) {
	if ( 'css' === mode ) {
		return attrs;
	}

	if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, 2 ) ) {
		if ( existingAttrs.hasIcon ) {
			attrs.display = 'flex';
		}

		[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
			if ( existingAttrs[ 'inlineWidth' + device ] ) {
				attrs[ 'display' + device ] = existingAttrs.hasIcon ? 'inline-flex' : 'inline-block';
			}

			if ( existingAttrs.hasIcon ) {
				if ( 'above' !== existingAttrs[ 'iconLocation' + device ] && existingAttrs[ 'alignment' + device ] ) {
					attrs[ 'justifyContent' + device ] = flexboxAlignment( existingAttrs.alignment + device );
				}

				if ( 'inline' === existingAttrs[ 'iconLocation' + device ] && existingAttrs[ 'iconVerticalAlignment' + device ] ) {
					attrs[ 'alignItems' + device ] = flexboxAlignment( existingAttrs.iconVerticalAlignment + device );
				}

				if ( 'above' === existingAttrs[ 'iconLocation' + device ] ) {
					attrs[ 'flexDirection' + device ] = 'column';
				}
			}
		} );
	}

	return attrs;
}

export const currentBlockVersion = 3;

/**
 * Migrate our Headline attributes.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The block attributes.
 * @param {Object} Props.defaults   The block defaults.
 * @param {string} Props.mode       The migration mode.
 * @return {Object} Updated attributes.
 * @since 1.8.0
 */
export function migrateHeadlineAttributes( { attributes, defaults, mode } ) {
	return migrationPipe(
		attributes,
		[
			migrateFlex,
			migrateSpacing( {
				blockVersionLessThan: 3,
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
				blockVersionLessThan: 3,
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
				blockVersionLessThan: 3,
				defaults,
				attributesToMigrate: [
					'fontFamily',
					'fontSize',
					'lineHeight',
					'letterSpacing',
					'fontWeight',
					'textTransform',
					'alignment',
				],
			} ),
			migrateIconSizing( {
				blockVersionLessThan: 3,
				defaults,
			} ),
			migrateIconPadding( {
				blockVersionLessThan: 3,
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
			const newAttributes = migrateHeadlineAttributes( {
				attributes,
				defaults: getBlockType( 'generateblocks/button' )?.attributes,
			} );

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

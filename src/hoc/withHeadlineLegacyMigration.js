import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import flexboxAlignment from '../utils/flexbox-alignment';
import {
	pipe,
	updateBlockVersion,
	migrateIconPadding,
	migrateIconSizing,
	migrateTypography,
	migrateDimensions,
} from './migrations/utils';

// Set our layout attributes for old Headline blocks.
// @since 1.7.0
export function migrateFlex( attrs, existingAttrs ) {
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

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		const defaults = getBlockType( 'generateblocks/button' )?.attributes;

		useEffect( () => {
			const newAttributes = pipe(
				attributes,
				[
					migrateFlex,
					migrateDimensions( {
						blockVersion: 3,
						attributesToMigrate: [
							'paddingTop',
							'paddingRight',
							'paddingBottom',
							'paddingLeft',
							'marginTop',
							'marginRight',
							'marginBottom',
							'marginLeft',
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
						blockVersion: 3,
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
						blockVersion: 3,
						defaults,
					} ),
					migrateIconPadding( {
						blockVersion: 3,
						defaults,
					} ),
					updateBlockVersion( 3 ),
				]
			);

			setAttributes( newAttributes );
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

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
export function migrateFlex( attrs ) {
	if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, 2 ) ) {
		if ( attrs.hasIcon ) {
			attrs.display = 'flex';
		}

		[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
			if ( attrs[ 'inlineWidth' + device ] ) {
				attrs[ 'display' + device ] = attrs.hasIcon ? 'inline-flex' : 'inline-block';
			}

			if ( attrs.hasIcon ) {
				if ( 'above' !== attrs[ 'iconLocation' + device ] && attrs[ 'alignment' + device ] ) {
					attrs[ 'justifyContent' + device ] = flexboxAlignment( attrs.alignment + device );
				}

				if ( 'inline' === attrs[ 'iconLocation' + device ] && attrs[ 'iconVerticalAlignment' + device ] ) {
					attrs[ 'alignItems' + device ] = flexboxAlignment( attrs.iconVerticalAlignment + device );
				}

				if ( 'above' === attrs[ 'iconLocation' + device ] ) {
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

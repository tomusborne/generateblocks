import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import hasNumericValue from '../utils/has-numeric-value';
import migrateDimensions from './migrations/migrateDimensions';
import migrateTypography from './migrations/migrateTypography';
import migrateIconSizing from './migrations/migratingIconSizing';
import migrateIconPadding from './migrations/migrateIconPadding';
import {
	migrationPipe,
	updateBlockVersion,
} from './migrations/utils';

function oldMigrations( attrs ) {
	if ( ! attrs.hasIcon && attrs.icon ) {
		attrs.hasIcon = true;
	}

	if ( ! attrs.hasUrl ) {
		attrs.hasUrl = !! attrs.url;
	}

	// Set our layout attributes for old Button blocks.
	// @since 1.7.0
	if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, 3 ) && ! attrs.useGlobalStyle ) {
		attrs = {
			...attrs,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			alignment: 'center',
		};
	}

	// Set our old defaults as static values.
	// @since 1.4.0.
	if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, 2 ) ) {
		const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.button;
		const items = [];

		if ( attrs.gradient ) {
			items.push(
				'gradientDirection',
				'gradientColorOne',
				'gradientColorOneOpacity',
				'gradientColorTwo',
				'gradientColorTwoOpacity'
			);
		}

		items.forEach( ( item ) => {
			if ( ! hasNumericValue( attrs[ item ] ) ) {
				attrs[ item ] = legacyDefaults[ item ];
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
			const newAttributes = migrationPipe(
				attributes,
				[
					oldMigrations,
					migrateDimensions( {
						blockVersion: 4,
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
						blockVersion: 4,
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
						blockVersion: 4,
						defaults,
					} ),
					migrateIconPadding( {
						blockVersion: 4,
						defaults,
					} ),
					updateBlockVersion( 4 ),
				]
			);

			setAttributes( newAttributes );
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

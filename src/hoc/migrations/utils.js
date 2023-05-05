import isBlockVersionLessThan from '../../utils/check-block-version';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import MigrateIconPadding from './migrateIconPadding';
import MigrateIconSizing from './migratingIconSizing';
import MigrateTypography from './migrateTypography';
import MigrateDimensions from './migrateDimensions';

function pipe( attrs, callbacks = [] ) {
	return callbacks.reduce( ( resultAttrs, callback ) => {
		const result = callback( resultAttrs );
		return Object.assign( {}, result );
	}, attrs );
}

function updateBlockVersion( newBlockVersion ) {
	return function( attrs ) {
		if ( isBlockVersionLessThan( attrs.blockVersion, newBlockVersion ) ) {
			attrs.blockVersion = newBlockVersion;
		}

		return attrs;
	};
}

// Migrate old icon padding.
// @since 1.8.0.
function migrateIconPadding( { blockVersion, defaults } ) {
	return function( attrs ) {
		if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, blockVersion ) ) {
			const newSizing = MigrateIconPadding( {
				attributes: attrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					iconStyles: {
						...attrs.iconStyles,
						...newSizing.newAttributes,
					},
					...newSizing.oldAttributes,
				};
			}
		}

		return attrs;
	};
}

// Migrate old icon sizing.
// @since 1.8.0.
function migrateIconSizing( { blockVersion, defaults } ) {
	return function( attrs ) {
		if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, blockVersion ) ) {
			const newSizing = MigrateIconSizing( {
				attributes: attrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					iconStyles: {
						...attrs.iconStyles,
						...newSizing.newAttributes,
					},
					...newSizing.oldAttributes,
				};
			}
		}

		return attrs;
	};
}

// Migrate typography controls.
// @since 1.8.0.
function migrateTypography( { blockVersion, defaults, attributesToMigrate = [] } ) {
	return function( attrs ) {
		if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, blockVersion ) ) {
			const newTypography = MigrateTypography( {
				attributesToMigrate,
				attributes: attrs,
				defaults,
			} );

			if (
				Object.keys( newTypography.newAttributes ).length &&
				Object.keys( newTypography.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					typography: {
						...attrs.typography,
						...newTypography.newAttributes,
					},
					...newTypography.oldAttributes,
				};
			}
		}

		return attrs;
	};
}

function migrateDimensions( { blockVersion, attributesToMigrate = [] } ) {
	return function( attrs ) {
		if ( ! wasBlockJustInserted( attrs ) && isBlockVersionLessThan( attrs.blockVersion, blockVersion ) ) {
			const newDimensions = MigrateDimensions( {
				attributesToMigrate,
				attributes: attrs,
			} );

			attrs = {
				...attrs,
				...newDimensions,
			};
		}

		return attrs;
	};
}

export {
	pipe,
	updateBlockVersion,
	migrateIconPadding,
	migrateIconSizing,
	migrateTypography,
	migrateDimensions,
};

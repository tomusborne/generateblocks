import isBlockVersionLessThan from '../../utils/check-block-version';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import MigrateIconPadding from './migrateIconPadding';
import MigrateIconSizing from './migratingIconSizing';
import MigrateTypography from './migrateTypography';
import MigrateDimensions from './migrateDimensions';

function pipe( existingAttributes, callbacks = [] ) {
	return callbacks.reduce( ( resultAttrs, callback ) => {
		const result = callback( resultAttrs, existingAttributes );
		return Object.assign( {}, result );
	}, {} );
}

function updateBlockVersion( newBlockVersion ) {
	return function( attrs, existingAttrs ) {
		if ( isBlockVersionLessThan( existingAttrs.blockVersion, newBlockVersion ) ) {
			attrs.blockVersion = newBlockVersion;
		}

		return attrs;
	};
}

// Migrate old icon padding.
// @since 1.8.0.
function migrateIconPadding( { blockVersion, defaults } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newSizing = MigrateIconPadding( {
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					iconStyles: {
						...existingAttrs.iconStyles,
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
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newSizing = MigrateIconSizing( {
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					iconStyles: {
						...existingAttrs.iconStyles,
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
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newTypography = MigrateTypography( {
				attributesToMigrate,
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newTypography.newAttributes ).length &&
				Object.keys( newTypography.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					typography: {
						...existingAttrs.typography,
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
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newDimensions = MigrateDimensions( {
				attributesToMigrate,
				attributes: existingAttrs,
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

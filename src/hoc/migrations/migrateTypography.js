import isNumeric from '../../utils/is-numeric';
import isBlockVersionLessThan from '../../utils/check-block-version';
import { addToAttrsObject } from './utils';

/**
 * Build an object with new migrated attributes and old attributes reverted to defaults.
 *
 * @param {Object} Props                     Function props.
 * @param {Array}  Props.attributesToMigrate The attributes we want to migrate.
 * @param {Object} Props.attributes          The existing block attributes.
 * @param {Object} Props.defaults            The block defaults.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
function buildTypographyAttributes( { attributesToMigrate, attributes = {}, defaults = {} } ) {
	function unitValue( name ) {
		if ( 'fontSize' === name ) {
			return attributes.fontSizeUnit;
		}

		if ( 'lineHeight' === name ) {
			return attributes.lineHeightUnit;
		}

		if ( 'letterSpacing' === name ) {
			return 'em';
		}
	}

	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( oldValue || isNumeric( oldValue ) ) {
				const unit = unitValue( attribute );

				if ( isNumeric( oldValue ) && unit ) {
					newAttributes[ attribute + device ] = oldValue + unit;
				} else if ( 'alignment' === attribute ) {
					newAttributes[ 'textAlign' + device ] = oldValue;
				} else {
					newAttributes[ attribute + device ] = oldValue;
				}

				if ( Object.keys( defaults ).length ) {
					oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
						? defaults[ attribute + device ].default
						: '';

					if ( attribute.startsWith( 'fontSize' ) ) {
						oldAttributes.fontSizeUnit = defaults.fontSizeUnit.default;
					}

					if ( attribute.startsWith( 'lineHeight' ) ) {
						oldAttributes.lineHeightUnit = defaults.lineHeightUnit.default;
					}
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build a typography object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @param {Array}  Props.attributesToMigrate  The attributes we want to migrate.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateTypography( { blockVersionLessThan, defaults = {}, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newTypography = buildTypographyAttributes( {
				attributesToMigrate,
				attributes: { ...existingAttrs, ...attrs },
				defaults,
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'typography',
				existingAttrs: existingAttrs.typography,
				newAttrs: newTypography.newAttributes,
				oldAttrs: newTypography.oldAttributes,
			} );
		}

		return attrs;
	};
}

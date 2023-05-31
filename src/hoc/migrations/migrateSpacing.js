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
function buildSpacingAttributes( { attributesToMigrate = [], attributes = {}, defaults = {} } ) {
	function unitValue( name ) {
		if ( name.startsWith( 'padding' ) ) {
			return attributes.paddingUnit;
		}

		if ( name.startsWith( 'margin' ) ) {
			return attributes.marginUnit;
		}
	}

	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( oldValue || isNumeric( oldValue ) ) {
				if ( attribute ) {
					newAttributes[ attribute + device ] = isNumeric( oldValue )
						? oldValue + unitValue( attribute )
						: oldValue;

					if ( Object.keys( defaults ).length ) {
						oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
							? defaults[ attribute + device ].default
							: '';

						if ( attribute.startsWith( 'padding' ) ) {
							oldAttributes.paddingUnit = defaults.paddingUnit.default;
						}

						if ( attribute.startsWith( 'margin' ) ) {
							oldAttributes.marginUnit = defaults.marginUnit.default;
						}
					}
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build an iconStyles padding object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @param {Array}  Props.attributesToMigrate  The attributes we want to migrate.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateSpacing( { blockVersionLessThan, defaults = {}, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newSpacing = buildSpacingAttributes( {
				attributesToMigrate,
				attributes: { ...existingAttrs, ...attrs },
				defaults,
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'spacing',
				existingAttrs: existingAttrs.spacing,
				newAttrs: newSpacing.newAttributes,
				oldAttrs: newSpacing.oldAttributes,
			} );
		}

		return attrs;
	};
}

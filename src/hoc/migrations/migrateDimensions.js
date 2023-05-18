import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';

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
function buildDimensionAttributes( { attributesToMigrate, attributes, defaults } ) {
	function unitValue( name ) {
		if ( name.startsWith( 'padding' ) ) {
			return attributes.paddingUnit;
		}

		if ( name.startsWith( 'margin' ) ) {
			return attributes.marginUnit;
		}

		if ( name.startsWith( 'borderSize' ) ) {
			return 'px';
		}

		if ( name.startsWith( 'borderRadius' ) ) {
			return attributes.borderRadiusUnit;
		}
	}

	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( dimension ) => {
			const oldValue = attributes[ dimension + device ];

			if ( isNumeric( oldValue ) ) {
				newAttributes[ dimension + device ] = oldValue + unitValue( dimension );

				if ( dimension.startsWith( 'padding' ) ) {
					oldAttributes.paddingUnit = defaults.paddingUnit.default;
				}

				if ( dimension.startsWith( 'margin' ) ) {
					oldAttributes.marginUnit = defaults.marginUnit.default;
				}

				if ( dimension.startsWith( 'borderRadius' ) ) {
					oldAttributes.borderRadiusUnit = defaults.borderRadiusUnit.default;
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build an object of dimensions to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @param {Array}  Props.attributesToMigrate  The attributes we want to migrate.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateDimensions( { blockVersionLessThan, defaults, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newDimensions = buildDimensionAttributes( {
				attributesToMigrate,
				attributes: existingAttrs,
				defaults,
			} );

			attrs = {
				...attrs,
				...newDimensions.newAttributes,
				...newDimensions.oldAttributes,
			};
		}

		return attrs;
	};
}

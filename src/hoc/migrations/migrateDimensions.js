import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';

function buildDimensionAttributes( { attributesToMigrate, attributes } ) {
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

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( dimension ) => {
			const oldValue = attributes[ dimension + device ];

			if ( isNumeric( oldValue ) ) {
				newAttributes[ dimension + device ] = oldValue + unitValue( dimension );
			}
		} );
	} );

	return newAttributes;
}

export default function migrateDimensions( { blockVersion, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newDimensions = buildDimensionAttributes( {
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

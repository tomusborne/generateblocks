import isNumeric from '../../utils/is-numeric';

export default function MigrateIconPadding( { attributes, defaults } ) {
	const newAttributes = {};
	const oldAttributes = {};
	const attributesToMigrate = [ 'iconPaddingTop', 'iconPaddingRight', 'iconPaddingBottom', 'iconPaddingLeft' ];

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( isNumeric( oldValue ) ) {
				let newAttributeName = '';

				switch ( attribute ) {
					case 'iconPaddingTop':
						newAttributeName = 'paddingTop';
						break;

					case 'iconPaddingRight':
						newAttributeName = 'paddingRight';
						break;

					case 'iconPaddingBottom':
						newAttributeName = 'paddingBottom';
						break;

					case 'iconPaddingLeft':
						newAttributeName = 'paddingLeft';
						break;
				}

				if ( newAttributeName ) {
					newAttributes[ newAttributeName + device ] = oldValue + attributes.iconPaddingUnit;
					oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
						? defaults[ attribute + device ].default
						: '';
					oldAttributes.iconPaddingUnit = defaults.iconPaddingUnit.default;
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

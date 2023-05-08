import isNumeric from '../../utils/is-numeric';

export default function MigrateIconSizing( { attributes, defaults } ) {
	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		const oldValue = attributes[ 'iconSize' + device ];

		if ( oldValue || isNumeric( oldValue ) ) {
			newAttributes[ 'width' + device ] = oldValue + attributes.iconSizeUnit;
			newAttributes[ 'height' + device ] = oldValue + attributes.iconSizeUnit;
			oldAttributes[ 'iconSize' + device ] = defaults[ 'iconSize' + device ]?.default
				? defaults[ 'iconSize' + device ].default
				: '';
			oldAttributes.iconSizeUnit = defaults.iconSizeUnit.default;
		}
	} );

	return { newAttributes, oldAttributes };
}

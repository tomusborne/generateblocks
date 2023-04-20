import MigrateDimensions from '../dimensions';

describe( 'Value with unit function', () => {
	it( 'can migrate values with separate units', () => {
		const oldAttributes = {
			marginTop: '10',
			marginTopTablet: '20',
			marginUnit: 'px',
			paddingTop: '20',
			paddingTopMobile: '10',
			paddingTopTablet: '15em',
			paddingUnit: '%',
		};

		const newAttributes = MigrateDimensions( {
			attributesToMigrate: [ 'marginTop', 'paddingTop' ],
			attributes: oldAttributes,
		} );

		expect( newAttributes ).toEqual( {
			marginTop: '10px',
			marginTopTablet: '20px',
			paddingTop: '20%',
			paddingTopMobile: '10%',
		} );
	} );
} );

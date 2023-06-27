import valueWithUnit from '../../utils/value-with-unit';

describe( 'Value with unit function', () => {
	it( 'can create a string given a single unit', () => {
		expect( valueWithUnit( '10', 'px' ) ).toEqual( '10px' );
	} );

	it( 'can ignore a given unit if one exists', () => {
		expect( valueWithUnit( '10%', 'px' ) ).toEqual( '10%' );
	} );
} );

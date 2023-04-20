import shorthandCSS from '../../utils/shorthand-css';

describe( 'Shorthand CSS function', () => {
	it( 'can create a string given a single unit', () => {
		expect( shorthandCSS( '10', '20', '30', '40', 'px' ) ).toEqual( '10px 20px 30px 40px' );
	} );

	it( 'can create a string with their own units', () => {
		expect( shorthandCSS( '10px', '20px', '30px', '40px', '%' ) ).toEqual( '10px 20px 30px 40px' );
	} );

	it( 'can create shortended strings when duplicating values', () => {
		expect( shorthandCSS( '10px', '20px', '10px', '20px', '%' ) ).toEqual( '10px 20px' );
	} );
} );

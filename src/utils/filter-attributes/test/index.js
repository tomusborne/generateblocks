import filterAttributes from '../index';

describe( 'filterAttributes', () => {
	it( 'should return an empty object if allowed keys were not given', () => {
		const result = filterAttributes( { a: 1, b: 2 } );

		expect( Object.keys( result ).length === 0 ).toBeTruthy();
	} );

	it( 'should return an object filtered correctly', () => {
		const result1 = filterAttributes( { a: 1, b: 2, c: 3 }, [ 'a', 'c', 'd' ] );

		expect( result1.a ).toBe( 1 );
		expect( result1.b ).toBe( undefined );
		expect( result1.c ).toBe( 3 );
		expect( result1.d ).toBe( undefined );
	} );
} );

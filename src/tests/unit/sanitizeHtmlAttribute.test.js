import { sanitizeHtmlAttribute } from '../../utils/sanitizeHtmlAttribute';

describe( 'sanitize HTML attribute', () => {
	it( 'should return the same value if it is a string', () => {
		const value = sanitizeHtmlAttribute( 'foo' );
		expect( value ).toEqual( 'foo' );
	} );

	it( 'should convert a number to a string', () => {
		const value = sanitizeHtmlAttribute( 500 );
		expect( value ).toEqual( '500' );
	} );

	it( 'should convert an object to a string', () => {
		const value = sanitizeHtmlAttribute( { foo: 'bar' } );
		expect( value ).toEqual( '{&quot;foo&quot;:&quot;bar&quot;}' );
	} );

	it( 'should convert an array to a string', () => {
		const value = sanitizeHtmlAttribute( [ 'foo', 'bar' ] );
		expect( value ).toEqual( '[&quot;foo&quot;,&quot;bar&quot;]' );
	} );

	it( 'should handle undefined', () => {
		const value = sanitizeHtmlAttribute( undefined );
		expect( value ).toEqual( '' );
	} );

	it( 'should handle null', () => {
		const value = sanitizeHtmlAttribute( null );
		expect( value ).toEqual( '' );
	} );

	it( 'should escape HTML special characters', () => {
		const value = sanitizeHtmlAttribute( 'foo & <bar> "quote" \'single\'' );
		expect( value ).toEqual( 'foo &amp; &lt;bar&gt; &quot;quote&quot; &#039;single&#039;' );
	} );

	it( 'should handle boolean values', () => {
		expect( sanitizeHtmlAttribute( true ) ).toEqual( 'true' );
		expect( sanitizeHtmlAttribute( false ) ).toEqual( 'false' );
	} );

	it( 'should handle special number values', () => {
		expect( sanitizeHtmlAttribute( NaN ) ).toEqual( 'NaN' );
		expect( sanitizeHtmlAttribute( Infinity ) ).toEqual( 'Infinity' );
		expect( sanitizeHtmlAttribute( -Infinity ) ).toEqual( '-Infinity' );
	} );

	it( 'should handle empty string', () => {
		const value = sanitizeHtmlAttribute( '' );
		expect( value ).toEqual( '' );
	} );
} );

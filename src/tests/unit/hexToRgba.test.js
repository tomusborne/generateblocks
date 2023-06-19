import hexToRGBA from '../../utils/hex-to-rgba';

describe( 'hex to RGBA', () => {
	it( 'should convert hex to rgba', () => {
		const color = hexToRGBA( '#000000', 0.5 );

		expect( color ).toEqual( 'rgba(0, 0, 0, 0.5)' );
	} );

	it( 'should do nothing', () => {
		const color = hexToRGBA( '#000000', 1 );

		expect( color ).toEqual( '#000000' );
	} );
} );

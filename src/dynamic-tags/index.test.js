import { parseTag } from './utils';

describe( 'Parsing a tag', () => {
	it( 'can parse a simple tag', () => {
		expect( parseTag( '{{post_title}}' ) ).toEqual( {
			tag: 'post_title',
			params: {},
		} );
	} );

	it( 'can parse a tag with a parameter', () => {
		expect( parseTag( '{{post_title id:123}}' ) ).toEqual( {
			tag: 'post_title',
			params: {
				id: '123',
			},
		} );
	} );

	it( 'can parse a tag with multiple parameters', () => {
		expect( parseTag( '{{featured_image id:123|key:url|size:large}}' ) ).toEqual( {
			tag: 'featured_image',
			params: {
				id: '123',
				key: 'url',
				size: 'large',
			},
		} );
	} );

	it( 'can parse a tag with a parameter that has a pipe in it', () => {
		expect( parseTag( '{{post_title id:123|sep:\\|}}' ) ).toEqual( {
			tag: 'post_title',
			params: {
				id: '123',
				sep: '\\|',
			},
		} );
	} );

	it( 'can parse a tag with a parameter that has a colon in it', () => {
		expect( parseTag( '{{post_title id:123|sep:\\:}}' ) ).toEqual( {
			tag: 'post_title',
			params: {
				id: '123',
				sep: '\\:',
			},
		} );
	} );
} );

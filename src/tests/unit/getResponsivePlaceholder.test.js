import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';

describe( 'Can get responsive placeholders', () => {
	it( 'can get desktop value on mobile', () => {
		const attributes = {
			paddingTop: '20px',
		};

		expect( getResponsivePlaceholder( 'paddingTop', attributes, 'Mobile' ) ).toEqual( '20px' );
	} );

	it( 'can get desktop value on tablet', () => {
		const attributes = {
			paddingTop: '20px',
		};

		expect( getResponsivePlaceholder( 'paddingTop', attributes, 'Tablet' ) ).toEqual( '20px' );
	} );

	it( 'can get tablet value on mobile', () => {
		const attributes = {
			paddingTopTablet: '10px',
		};

		expect( getResponsivePlaceholder( 'paddingTop', attributes, 'Mobile' ) ).toEqual( '10px' );
	} );

	it( 'can get values from an object', () => {
		const attributes = {
			sizing: {
				width: '100px',
			},
		};

		expect( getResponsivePlaceholder( 'width', attributes.sizing, 'Mobile' ) ).toEqual( '100px' );
	} );
} );

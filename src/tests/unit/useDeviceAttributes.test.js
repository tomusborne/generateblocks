import { addDeviceToAttributes, splitAttributes } from '../../hooks/useDeviceAttributes';

describe( 'useDeviceAttributes', () => {
	it( 'splitAttributes should split device attributes', () => {
		const result = splitAttributes( {
			content: 'all devices',
			paddingTop: 'desktop',
			paddingTopTablet: 'tablet',
			paddingTopMobile: 'mobile',
			nested: {
				marginTop: 'desktop',
				marginTopTablet: 'tablet',
				marginTopMobile: 'mobile',
			},
			styles: {
				paddingTop: 'only desktop',
			},
		} );

		expect( result.desktop.content ).toBe( 'all devices' );
		expect( result.tablet.content ).toBe( 'all devices' );
		expect( result.mobile.content ).toBe( 'all devices' );

		expect( result.desktop.paddingTop ).toBe( 'desktop' );
		expect( result.tablet.paddingTop ).toBe( 'tablet' );
		expect( result.mobile.paddingTop ).toBe( 'mobile' );

		expect( result.desktop.nested.marginTop ).toBe( 'desktop' );
		expect( result.tablet.nested.marginTop ).toBe( 'tablet' );
		expect( result.mobile.nested.marginTop ).toBe( 'mobile' );

		expect( result.desktop.styles.paddingTop ).toBe( 'only desktop' );
		expect( result.tablet.styles.paddingTop ).toBeUndefined();
		expect( result.mobile.styles.paddingTop ).toBeUndefined();
	} );

	it( 'should add device to attributes', () => {
		const resultTablet = addDeviceToAttributes( {
			content: 'all devices',
			paddingTop: 'tablet',
			nested: {
				marginTop: 'tablet',
			},
		}, 'Tablet' );

		const resultMobile = addDeviceToAttributes( {
			content: 'all devices',
			width: 'mobile',
			nested: {
				height: 'mobile',
			},
		}, 'Mobile' );

		expect( resultTablet.content ).toBe( 'all devices' );
		expect( resultTablet.paddingTopTablet ).toBe( 'tablet' );
		expect( resultTablet.nested.marginTopTablet ).toBe( 'tablet' );

		expect( resultMobile.content ).toBe( 'all devices' );
		expect( resultMobile.widthMobile ).toBe( 'mobile' );
		expect( resultMobile.nested.heightMobile ).toBe( 'mobile' );
	} );
} );

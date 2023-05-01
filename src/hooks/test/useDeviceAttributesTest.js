import { splitAttributes, addDeviceToAttributes } from '../useDeviceAttributes';

describe( 'useDeviceAttributes', () => {
	it( 'can split attributes by devices', () => {
		const defaultAttributes = {
			attr: 'some value',
			attrTablet: 'tablet value',
			attrMobile: 'mobile value',
			otherAttr: 'global value',
		};

		const { desktop, tablet, mobile } = splitAttributes( defaultAttributes );

		expect( desktop.attr ).toBe( 'some value' );
		expect( desktop.otherAttr ).toBe( 'global value' );
		expect( tablet.attr ).toBe( 'tablet value' );
		expect( mobile.attr ).toBe( 'mobile value' );
	} );

	it( 'can add device to attributes', () => {
		const tabletAttrs = addDeviceToAttributes( {
			attr: 'first value',
			secondAttr: 'second value',
		}, 'Tablet' );

		const mobileAttrs = addDeviceToAttributes( {
			attr: 'first value',
			secondAttr: 'second value',
		}, 'Mobile' );

		expect( tabletAttrs.attrTablet ).toBe( 'first value' );
		expect( tabletAttrs.secondAttrTablet ).toBe( 'second value' );

		expect( mobileAttrs.attrMobile ).toBe( 'first value' );
		expect( mobileAttrs.secondAttrMobile ).toBe( 'second value' );
	} );
} );

import { migrateContainerAttributes, currentBlockVersion } from '../../../hoc/withContainerLegacyMigration';
import { blockDefaults as defaults, defaultAttributes } from './defaults';

describe( 'Test Container migrations', () => {
	const oldDefaults = {
		paddingTop: '40',
		paddingRight: '40',
		paddingBottom: '40',
		paddingLeft: '40',
		width: 50,
		widthMobile: 100,
		gradientDirection: 90,
		gradientColorOne: '#ffffff',
		gradientColorOneOpacity: 0.1,
		gradientColorTwo: '#000000',
		gradientColorTwoOpacity: 0.3,
	};

	it( 'can complete full migration', () => {
		const attributes = {
			...defaultAttributes,
			uniqueId: 'test',
			blockVersion: 1,
			marginTop: '20',
			marginRight: '30',
			marginBottom: '40',
			marginLeft: '50',
			marginBottomMobile: '10',
			marginUnit: 'em',
			paddingBottom: '10',
			paddingLeftTablet: '5',
			paddingUnit: 'px',
			alignment: 'right',
			fontSizeTablet: 14,
			fontSizeUnit: 'em',
			isGrid: true,
		};

		const newAttributes = migrateContainerAttributes( {
			attributes,
			defaults,
			oldDefaults: {
				v1_4_0: oldDefaults,
			},
		} );

		expect( newAttributes ).toEqual( {
			spacing: {
				marginTop: '20em',
				marginRight: '30em',
				marginBottom: '40em',
				marginLeft: '50em',
				marginBottomMobile: '10em',
				paddingTop: '40px',
				paddingRight: '40px',
				paddingBottom: '10px',
				paddingLeft: '40px',
				paddingLeftTablet: '5px',
			},
			typography: {
				textAlign: 'right',
				fontSizeTablet: '14em',
			},
			sizing: {
				width: '50%',
				widthMobile: '100%',
			},
			alignment: defaults.alignment.default,
			marginTop: defaults.marginTop.default,
			marginRight: defaults.marginRight.default,
			marginBottom: defaults.marginBottom.default,
			marginLeft: defaults.marginLeft.default,
			marginBottomMobile: defaults.marginBottomMobile.default,
			marginUnit: defaults.marginUnit.default,
			paddingTop: defaults.paddingTop.default,
			paddingRight: defaults.paddingRight.default,
			paddingBottom: defaults.paddingBottom.default,
			paddingLeft: defaults.paddingLeft.default,
			paddingLeftTablet: defaults.paddingLeftTablet.default,
			paddingUnit: defaults.paddingUnit.default,
			fontSizeTablet: defaults.fontSizeTablet.default,
			fontSizeUnit: defaults.fontSizeUnit.default,
			width: defaults.width.default,
			widthMobile: defaults.width.default,
			autoWidthMobile: false,
			isDynamic: true,
			useInnerContainer: true,
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'should do nothing when first inserted', () => {
		const attributes = {
			...defaultAttributes,
		};

		const newAttributes = migrateContainerAttributes( {
			attributes,
			defaults,
			oldDefaults: {
				v1_4_0: oldDefaults,
			},
		} );

		expect( newAttributes ).toEqual( {
			blockVersion: currentBlockVersion,
			isDynamic: true,
		} );
	} );
} );

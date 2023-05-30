import { migrateButtonContainerAttributes, currentBlockVersion } from '../../../hoc/withButtonContainerLegacyMigration';
import { blockDefaults as defaults, defaultAttributes } from './defaults';

describe( 'Test Button Container migrations', () => {
	it( 'can complete full migration', () => {
		const attributes = {
			...defaultAttributes,
			uniqueId: 'test',
			blockVersion: 1,
			stack: true,
			fillHorizontalSpace: true,
			marginTop: 20,
			marginRight: 30,
			marginBottom: 40,
			marginLeft: 50,
			marginBottomMobile: 10,
			marginUnit: 'em',
		};

		const newAttributes = migrateButtonContainerAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			isDynamic: true,
			stackTablet: true,
			stackMobile: true,
			fillHorizontalSpaceTablet: true,
			fillHorizontalSpaceMobile: true,
			spacing: {
				marginTop: '20em',
				marginRight: '30em',
				marginBottom: '40em',
				marginLeft: '50em',
				marginBottomMobile: '10em',
			},
			marginTop: '',
			marginRight: '',
			marginBottom: '',
			marginLeft: '',
			marginBottomMobile: '',
			marginUnit: 'px',
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'can complete spacing migration', () => {
		const attributes = {
			...defaultAttributes,
			uniqueId: 'test',
			blockVersion: 2,
			stack: true,
			fillHorizontalSpace: true,
			marginTop: 20,
			marginRight: 30,
			marginBottom: 40,
			marginLeft: 50,
			marginUnit: 'em',
		};

		const newAttributes = migrateButtonContainerAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			isDynamic: true,
			spacing: {
				marginTop: '20em',
				marginRight: '30em',
				marginBottom: '40em',
				marginLeft: '50em',
			},
			marginTop: '',
			marginRight: '',
			marginBottom: '',
			marginLeft: '',
			marginUnit: 'px',
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'should do nothing when first inserted', () => {
		const attributes = {
			...defaultAttributes,
		};

		const newAttributes = migrateButtonContainerAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			blockVersion: currentBlockVersion,
			isDynamic: true,
		} );
	} );
} );

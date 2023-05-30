import { migrateButtonAttributes, currentBlockVersion } from '../../../hoc/withButtonLegacyMigration';
import { blockDefaults as defaults, defaultAttributes } from './defaults';

describe( 'Test Button migrations', () => {
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
		};

		const newAttributes = migrateButtonAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			typography: {
				textAlign: 'center',
			},
			spacing: {
				marginTop: '20em',
				marginRight: '30em',
				marginBottom: '40em',
				marginLeft: '50em',
				marginBottomMobile: '10em',
				paddingBottom: '10px',
				paddingLeftTablet: '5px',
			},
			alignment: defaults.alignment.default,
			marginTop: defaults.marginTop.default,
			marginRight: defaults.marginRight.default,
			marginBottom: defaults.marginBottom.default,
			marginLeft: defaults.marginLeft.default,
			marginBottomMobile: defaults.marginBottomMobile.default,
			marginUnit: defaults.marginUnit.default,
			paddingBottom: defaults.paddingBottom.default,
			paddingLeftTablet: defaults.paddingLeftTablet.default,
			paddingUnit: defaults.paddingUnit.default,
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'should do nothing when first inserted', () => {
		const attributes = {
			...defaultAttributes,
		};

		const newAttributes = migrateButtonAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			blockVersion: currentBlockVersion,
		} );
	} );
} );

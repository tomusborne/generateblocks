import { migrateHeadlineAttributes, currentBlockVersion } from '../../../hoc/withHeadlineLegacyMigration';
import { blockDefaults as defaults, defaultAttributes } from './defaults';

describe( 'Test Headline migrations', () => {
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
			fontSize: 11,
			fontSizeUnit: 'em',
			letterSpacing: 0.01,
			alignmentTablet: 'center',
		};

		const newAttributes = migrateHeadlineAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			spacing: {
				marginTop: '20em',
				marginRight: '30em',
				marginBottom: '40em',
				marginLeft: '50em',
				marginBottomMobile: '10em',
				paddingBottom: '10px',
				paddingLeftTablet: '5px',
			},
			typography: {
				fontSize: '11em',
				letterSpacing: '0.01em',
				textAlignTablet: 'center',
			},
			alignmentTablet: defaults.alignmentTablet.default,
			fontSize: defaults.fontSize.default,
			fontSizeUnit: defaults.fontSizeUnit.default,
			letterSpacing: defaults.letterSpacing.default,
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

	it( 'should migrate icon attributes', () => {
		const attributes = {
			...defaultAttributes,
			uniqueId: 'test',
			hasIcon: true,
			iconSize: 100,
			iconSizeUnit: 'px',
		};

		const newAttributes = migrateHeadlineAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			iconStyles: {
				height: '100px',
				width: '100px',
			},
			display: 'flex',
			iconSize: 1,
			iconSizeUnit: 'em',
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'should do nothing when first inserted', () => {
		const attributes = {
			...defaultAttributes,
		};

		const newAttributes = migrateHeadlineAttributes( {
			attributes,
			defaults,
		} );

		expect( newAttributes ).toEqual( {
			blockVersion: currentBlockVersion,
		} );
	} );
} );

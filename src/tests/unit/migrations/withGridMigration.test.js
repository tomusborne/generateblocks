import { migrateGridAttributes, currentBlockVersion } from '../../../hoc/withGridLegacyMigration';
import { blockDefaults as defaults, defaultAttributes } from './defaults';

describe( 'Test Grid migrations', () => {
	const oldDefaults = {
		horizontalGap: 30,
	};

	it( 'can complete full migration', () => {
		const attributes = {
			...defaultAttributes,
			uniqueId: 'test',
			blockVersion: 1,
		};

		const newAttributes = migrateGridAttributes( {
			attributes,
			defaults,
			oldDefaults: {
				v1_4_0: oldDefaults,
			},
		} );

		expect( newAttributes ).toEqual( {
			horizontalGap: 30,
			useLegacyRowGap: true,
			isDynamic: true,
			blockVersion: currentBlockVersion,
		} );
	} );

	it( 'should do nothing when first inserted', () => {
		const attributes = {
			...defaultAttributes,
		};

		const newAttributes = migrateGridAttributes( {
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

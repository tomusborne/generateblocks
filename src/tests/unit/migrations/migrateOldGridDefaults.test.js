import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateOldGridDefaults } from '../../../hoc/withGridLegacyMigration';

describe( 'Migrate old grid defaults', () => {
	const oldDefaults = {
		horizontalGap: 30,
	};

	it( 'migrates old grid defaults', () => {
		const attributes = {};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldGridDefaults( {
					blockVersionLessThan: 2,
					oldDefaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			horizontalGap: 30,
		} );
	} );
} );

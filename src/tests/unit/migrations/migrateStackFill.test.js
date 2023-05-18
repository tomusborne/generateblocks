import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateStackFill } from '../../../hoc/withButtonContainerLegacyMigration';

describe( 'Migrate button container stack and fill', () => {
	it( 'migrates stack and fill', () => {
		const attributes = {
			blockVersion: 1,
			stack: true,
			fillHorizontalSpace: true,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateStackFill( {
					blockVersionLessThan: 2,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			stackTablet: true,
			stackMobile: true,
			fillHorizontalSpaceTablet: true,
			fillHorizontalSpaceMobile: true,
		} );
	} );
} );

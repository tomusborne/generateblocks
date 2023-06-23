import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateInnerContainer } from '../../../hoc/withContainerLegacyMigration';

describe( 'Migrate the inner container', () => {
	it( 'adds the inner container', () => {
		const attributes = {
			blockVersion: 2,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateInnerContainer( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			useInnerContainer: true,
		} );
	} );

	it( 'does not add the inner container', () => {
		const attributes = {
			blockVersion: 3,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateInnerContainer( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {} );
	} );
} );

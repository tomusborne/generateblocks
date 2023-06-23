import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateButtonLayout } from '../../../hoc/withButtonLegacyMigration';

describe( 'Test button layout migration', () => {
	it( 'can migrate layout', () => {
		const attributes = {
			blockVersion: 2,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateButtonLayout( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			alignment: 'center',
		} );
	} );
} );

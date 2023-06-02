import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateFlexBasis } from '../../../hoc/withContainerLegacyMigration';

describe( 'Migrate the flex basis', () => {
	it( 'migrates numbered flex basis', () => {
		const attributes = {
			blockVersion: 2,
			flexBasis: 100,
			flexBasisTablet: 75,
			flexBasisMobile: 50,
			flexBasisUnit: 'px',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateFlexBasis( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			flexBasis: '100px',
			flexBasisTablet: '75px',
			flexBasisMobile: '50px',
		} );
	} );

	it( 'does not migrate text flex basis', () => {
		const attributes = {
			blockVersion: 2,
			flexBasis: 'auto',
			flexBasisTablet: 75,
			flexBasisUnit: 'px',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateFlexBasis( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			flexBasisTablet: '75px',
		} );
	} );
} );

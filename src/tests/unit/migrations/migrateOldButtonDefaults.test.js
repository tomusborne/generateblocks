import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateOldButtonDefaults } from '../../../hoc/withButtonLegacyMigration';

describe( 'Migrate old button defaults', () => {
	const oldDefaults = {
		gradientDirection: 90,
		gradientColorOne: '#ffffff',
		gradientColorOneOpacity: 0.1,
		gradientColorTwo: '#000000',
		gradientColorTwoOpacity: 0.3,
	};

	it( 'migrates old gradient defaults', () => {
		const attributes = {
			gradient: true,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldButtonDefaults( {
					blockVersionLessThan: 2,
					oldDefaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			gradientDirection: 90,
			gradientColorOne: '#ffffff',
			gradientColorOneOpacity: 0.1,
			gradientColorTwo: '#000000',
			gradientColorTwoOpacity: 0.3,
		} );
	} );

	it( 'ignores existing attrubutes', () => {
		const attributes = {
			gradient: true,
			gradientDirection: 45,
			gradientColorOne: '#222222',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldButtonDefaults( {
					blockVersionLessThan: 2,
					oldDefaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			gradientColorOneOpacity: 0.1,
			gradientColorTwo: '#000000',
			gradientColorTwoOpacity: 0.3,
		} );
	} );
} );

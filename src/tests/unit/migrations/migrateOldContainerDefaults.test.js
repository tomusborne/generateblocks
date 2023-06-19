import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateOldContainerDefaults } from '../../../hoc/withContainerLegacyMigration';

describe( 'Migrate old container defaults', () => {
	const oldDefaults = {
		paddingTop: '40',
		paddingRight: '40',
		paddingBottom: '40',
		paddingLeft: '40',
		width: 50,
		widthMobile: 100,
		gradientDirection: 90,
		gradientColorOne: '#ffffff',
		gradientColorOneOpacity: 0.1,
		gradientColorTwo: '#000000',
		gradientColorTwoOpacity: 0.3,
	};

	it( 'migrates old padding defaults', () => {
		const attributes = {
			blockVersion: 1,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldContainerDefaults( {
					blockVersionLessThan: 2,
					oldDefaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			paddingTop: '40',
			paddingRight: '40',
			paddingBottom: '40',
			paddingLeft: '40',
		} );
	} );

	it( 'migrates old grid item width', () => {
		const attributes = {
			blockVersion: 1,
			paddingTop: '0',
			paddingRight: '0',
			paddingBottom: '0',
			paddingLeft: '0',
			isGrid: true,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldContainerDefaults( {
					blockVersionLessThan: 2,
					oldDefaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			width: 50,
			widthMobile: 100,
		} );
	} );

	it( 'migrates old gradient defaults', () => {
		const attributes = {
			blockVersion: 1,
			paddingTop: '0',
			paddingRight: '0',
			paddingBottom: '0',
			paddingLeft: '0',
			gradient: true,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateOldContainerDefaults( {
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
} );

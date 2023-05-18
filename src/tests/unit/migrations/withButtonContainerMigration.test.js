import { migrationPipe, setIsDynamic, updateBlockVersion } from '../../../hoc/migrations/utils';
import { migrateStackFill } from '../../../hoc/withButtonContainerLegacyMigration';
import migrateDimensions from '../../../hoc/migrations/migrateDimensions';

describe( 'Test button container migration', () => {
	const defaults = {
		marginUnit: {
			default: 'px',
		},
	};

	it( 'can complete full migration', () => {
		const attributes = {
			blockVersion: 1,
			stack: true,
			fillHorizontalSpace: true,
			marginTop: 20,
			marginRight: 30,
			marginBottom: 40,
			marginLeft: 50,
			marginUnit: 'em',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				setIsDynamic,
				migrateStackFill( {
					blockVersionLessThan: 2,
				} ),
				migrateDimensions( {
					blockVersionLessThan: 3,
					defaults,
					attributesToMigrate: [
						'marginTop',
						'marginRight',
						'marginBottom',
						'marginLeft',
					],
				} ),
				updateBlockVersion( 3 ),
			]
		);

		expect( newAttributes ).toEqual( {
			isDynamic: true,
			stackTablet: true,
			stackMobile: true,
			fillHorizontalSpaceTablet: true,
			fillHorizontalSpaceMobile: true,
			marginTop: '20em',
			marginRight: '30em',
			marginBottom: '40em',
			marginLeft: '50em',
			marginUnit: 'px',
			blockVersion: 3,
		} );
	} );

	it( 'can complete dimension migration', () => {
		const attributes = {
			blockVersion: 2,
			stack: true,
			fillHorizontalSpace: true,
			marginTop: 20,
			marginRight: 30,
			marginBottom: 40,
			marginLeft: 50,
			marginUnit: 'em',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				setIsDynamic,
				migrateStackFill( {
					blockVersionLessThan: 2,
				} ),
				migrateDimensions( {
					blockVersionLessThan: 3,
					defaults,
					attributesToMigrate: [
						'marginTop',
						'marginRight',
						'marginBottom',
						'marginLeft',
					],
				} ),
				updateBlockVersion( 3 ),
			]
		);

		expect( newAttributes ).toEqual( {
			isDynamic: true,
			marginTop: '20em',
			marginRight: '30em',
			marginBottom: '40em',
			marginLeft: '50em',
			marginUnit: 'px',
			blockVersion: 3,
		} );
	} );
} );

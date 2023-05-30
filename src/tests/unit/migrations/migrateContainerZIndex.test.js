import { migrationPipe } from '../../../hoc/migrations/utils';
import { migrateContainerZIndex } from '../../../hoc/withContainerLegacyMigration';

describe( 'Migrate container z-index', () => {
	it( 'adds z-index when using a gradient', () => {
		const attributes = {
			blockVersion: 1,
			gradient: true,
			gradientSelector: 'pseudo-element',
			innerZIndex: '',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateContainerZIndex( {
					blockVersionLessThan: 2,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			innerZindex: 1,
		} );
	} );

	it( 'adds z-index when using a background image', () => {
		const attributes = {
			blockVersion: 1,
			bgImage: 'URL to background image',
			bgOptions: {
				selector: 'pseudo-element',
			},
			innerZIndex: '',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateContainerZIndex( {
					blockVersionLessThan: 2,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			innerZindex: 1,
		} );
	} );
} );

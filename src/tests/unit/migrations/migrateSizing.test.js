import { migrationPipe } from '../../../hoc/migrations/utils';
import migrateSizing from '../../../hoc/migrations/migrateSizing';

describe( 'Migrate the old sizing', () => {
	it( 'migrates grid item width', () => {
		const attributes = {
			blockVersion: 2,
			isGrid: true,
			width: 50,
			widthTablet: 25,
			widthMobile: 10,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateSizing( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			sizing: {
				width: '50%',
				widthTablet: '25%',
				widthMobile: '10%',
			},
			width: '',
			widthTablet: '',
			widthMobile: '',
			autoWidthTablet: false,
			autoWidthMobile: false,
		} );
	} );

	it( 'migrates auto widths', () => {
		const attributes = {
			blockVersion: 2,
			isGrid: true,
			width: 50,
			autoWidthTablet: true,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateSizing( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			sizing: {
				width: '50%',
				widthTablet: 'auto',
			},
			width: '',
			widthTablet: '',
			autoWidthTablet: false,
		} );
	} );

	it( 'migrates min height', () => {
		const attributes = {
			blockVersion: 2,
			minHeight: 400,
			minHeightUnit: 'vh',
			minHeightTablet: 200,
			minHeightUnitTablet: 'px',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateSizing( {
					blockVersionLessThan: 3,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			sizing: {
				minHeight: '400vh',
				minHeightTablet: '200px',
			},
			minHeight: false,
			minHeightUnit: 'px',
			minHeightTablet: false,
			minHeightUnitTablet: 'px',
		} );
	} );
} );

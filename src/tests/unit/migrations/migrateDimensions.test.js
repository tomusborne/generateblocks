import { migrationPipe } from '../../../hoc/migrations/utils';
import migrateDimensions from '../../../hoc/migrations/migrateDimensions';

describe( 'Migrate dimensions', () => {
	const defaults = {
		paddingUnit: {
			default: 'px',
		},
		marginUnit: {
			default: 'px',
		},
		borderRadiusUnit: {
			default: 'px',
		},
	};

	it( 'can migrate values with separate units', () => {
		const attributes = {
			blockVersion: 3,
			marginTop: '10',
			marginTopTablet: '20',
			marginUnit: 'px',
			paddingTop: '20',
			paddingTopMobile: '10',
			paddingUnit: '%',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateDimensions( {
					blockVersionLessThan: 4,
					defaults,
					attributesToMigrate: [ 'marginTop', 'paddingTop' ],
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			marginTop: '10px',
			marginUnit: 'px',
			marginTopTablet: '20px',
			paddingTop: '20%',
			paddingTopMobile: '10%',
			paddingUnit: 'px',
		} );
	} );

	it( 'can ignore values with included units', () => {
		const attributes = {
			blockVersion: 3,
			marginTop: '10',
			marginUnit: 'px',
			paddingTop: '20em',
			paddingUnit: '%',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateDimensions( {
					blockVersionLessThan: 4,
					defaults,
					attributesToMigrate: [ 'marginTop', 'paddingTop' ],
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			marginTop: '10px',
			marginUnit: 'px',
		} );
	} );
} );

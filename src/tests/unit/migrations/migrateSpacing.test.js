import { migrationPipe } from '../../../hoc/migrations/utils';
import migrateSpacing from '../../../hoc/migrations/migrateSpacing';

describe( 'Test spacing migrations', () => {
	const defaults = {
		paddingTop: {
			default: '',
		},
		paddingRight: {
			default: '',
		},
		paddingTopTablet: {
			default: '',
		},
		paddingBottom: {
			default: '',
		},
		paddingLeft: {
			default: '',
		},
		paddingLeftMobile: {
			default: '',
		},
		paddingUnit: {
			default: 'px',
		},
	};

	it( 'can migrate padding', () => {
		const attributes = {
			blockVersion: 3,
			paddingTop: '20',
			paddingRight: '30',
			paddingTopTablet: '10',
			paddingLeftMobile: '5',
			paddingUnit: 'em',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateSpacing( {
					blockVersionLessThan: 4,
					attributesToMigrate: [ 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			spacing: {
				paddingTop: '20em',
				paddingTopTablet: '10em',
				paddingRight: '30em',
				paddingLeftMobile: '5em',
			},
			paddingTop: '',
			paddingTopTablet: '',
			paddingRight: '',
			paddingLeftMobile: '',
			paddingUnit: 'px',
		} );
	} );
} );

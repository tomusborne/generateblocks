import { pipe, migrateIconSizing } from '../../hoc/migrations/utils';

describe( 'Migrating icon sizing', () => {
	const defaults = {
		iconSize: {
			default: 1,
		},
		iconSizeTablet: {
			default: '',
		},
		iconSizeMobile: {
			default: '',
		},
		iconSizeUnit: {
			default: 'em',
		},
	};

	it( 'can migrate values with separate units', () => {
		const attributes = {
			blockVersion: 3,
			iconSize: 2,
			iconSizeUnit: 'em',
			iconSizeTablet: 1.5,
			iconSizeMobile: 0.8,
		};

		const newAttributes = pipe(
			attributes,
			[
				migrateIconSizing( {
					blockVersion: 4,
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			iconStyles: {
				width: '2em',
				height: '2em',
				widthTablet: '1.5em',
				heightTablet: '1.5em',
				widthMobile: '0.8em',
				heightMobile: '0.8em',
			},
			iconSize: 1,
			iconSizeTablet: '',
			iconSizeMobile: '',
			iconSizeUnit: 'em',
		} );
	} );
} );

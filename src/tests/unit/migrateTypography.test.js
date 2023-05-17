import { migrationPipe } from '../../hoc/migrations/utils';
import migrateTypography from '../../hoc/migrations/migrateTypography';

describe( 'Test typography migrations', () => {
	const defaults = {
		fontFamily: {
			default: '',
		},
		fontWeight: {
			default: '',
		},
		textTransform: {
			default: '',
		},
		fontSize: {
			default: '',
		},
		fontSizeTablet: {
			default: '',
		},
		fontSizeMobile: {
			default: '',
		},
		fontSizeUnit: {
			default: 'px',
		},
		lineHeight: {
			default: '',
		},
		lineHeightTablet: {
			default: '',
		},
		lineHeightMobile: {
			default: '',
		},
		lineHeightUnit: {
			default: 'em',
		},
		letterSpacing: {
			default: '',
		},
	};

	it( 'can migrate font family', () => {
		const attributes = {
			blockVersion: 3,
			fontFamily: 'Roboto',
			fontFamilyFallback: 'sans-serif',
			googleFont: true,
			fontWeight: 'bold',
			textTransform: 'uppercase',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateTypography( {
					blockVersion: 4,
					attributesToMigrate: [ 'fontFamily', 'fontWeight', 'textTransform' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			typography: {
				fontFamily: 'Roboto',
				fontWeight: 'bold',
				textTransform: 'uppercase',
			},
			fontFamily: '',
			fontWeight: '',
			textTransform: '',
		} );
	} );

	it( 'can migrate font size', () => {
		const attributes = {
			blockVersion: 3,
			fontSize: 12,
			fontSizeTablet: 11,
			fontSizeMobile: 10,
			fontSizeUnit: 'em',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateTypography( {
					blockVersion: 4,
					attributesToMigrate: [ 'fontSize' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			typography: {
				fontSize: '12em',
				fontSizeTablet: '11em',
				fontSizeMobile: '10em',
			},
			fontSize: '',
			fontSizeTablet: '',
			fontSizeMobile: '',
			fontSizeUnit: 'px',
		} );
	} );

	it( 'can migrate line height', () => {
		const attributes = {
			blockVersion: 3,
			lineHeight: 1.2,
			lineHeightTablet: 1.1,
			lineHeightMobile: 1,
			lineHeightUnit: 'em',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateTypography( {
					blockVersion: 4,
					attributesToMigrate: [ 'lineHeight' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			typography: {
				lineHeight: '1.2em',
				lineHeightTablet: '1.1em',
				lineHeightMobile: '1em',
			},
			lineHeight: '',
			lineHeightTablet: '',
			lineHeightMobile: '',
			lineHeightUnit: 'em',
		} );
	} );

	it( 'can migrate letter spacing', () => {
		const attributes = {
			blockVersion: 3,
			letterSpacing: 0.02,
			letterSpacingTablet: 0.01,
			typography: {
				lineHeight: '1.1em',
			},
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateTypography( {
					blockVersion: 4,
					attributesToMigrate: [ 'letterSpacing' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			typography: {
				letterSpacing: '0.02em',
				letterSpacingTablet: '0.01em',
				lineHeight: '1.1em',
			},
			letterSpacing: '',
			letterSpacingTablet: '', // Intentionally has no default defined.
		} );
	} );
} );

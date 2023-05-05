import MigrateTypography from '../../hoc/migrations/migrateTypography';

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
		const oldAttributes = {
			fontFamily: 'Roboto',
			fontFamilyFallback: 'sans-serif',
			googleFont: true,
			fontWeight: 'bold',
			textTransform: 'uppercase',
		};

		const newTypography = MigrateTypography( {
			attributesToMigrate: [ 'fontFamily', 'fontWeight', 'textTransform' ],
			attributes: oldAttributes,
			defaults,
		} );

		const existingTypography = {};

		const newAttributes = {
			typography: {
				...existingTypography,
				...newTypography.newAttributes,
			},
			...newTypography.oldAttributes,
		};

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
		const oldAttributes = {
			fontSize: 12,
			fontSizeTablet: 11,
			fontSizeMobile: 10,
			fontSizeUnit: 'em',
		};

		const newTypography = MigrateTypography( {
			attributesToMigrate: [ 'fontSize' ],
			attributes: oldAttributes,
			defaults,
		} );

		const existingTypography = {};

		const newAttributes = {
			typography: {
				...existingTypography,
				...newTypography.newAttributes,
			},
			...newTypography.oldAttributes,
		};

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
		const oldAttributes = {
			lineHeight: 1.2,
			lineHeightTablet: 1.1,
			lineHeightMobile: 1,
			lineHeightUnit: 'em',
		};

		const newTypography = MigrateTypography( {
			attributesToMigrate: [ 'lineHeight' ],
			attributes: oldAttributes,
			defaults,
		} );

		const existingTypography = {
			fontSize: '10px',
		};

		const newAttributes = {
			typography: {
				...existingTypography,
				...newTypography.newAttributes,
			},
			...newTypography.oldAttributes,
		};

		expect( newAttributes ).toEqual( {
			typography: {
				fontSize: '10px',
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
		const oldAttributes = {
			letterSpacing: 0.02,
			letterSpacingTablet: 0.01,
		};

		const newTypography = MigrateTypography( {
			attributesToMigrate: [ 'letterSpacing' ],
			attributes: oldAttributes,
			defaults,
		} );

		const existingTypography = {
			lineHeight: '1.1em',
		};

		const newAttributes = {
			typography: {
				...existingTypography,
				...newTypography.newAttributes,
			},
			...newTypography.oldAttributes,
		};

		expect( newAttributes ).toEqual( {
			typography: {
				lineHeight: '1.1em',
				letterSpacing: '0.02em',
				letterSpacingTablet: '0.01em',
			},
			letterSpacing: '',
			letterSpacingTablet: '', // Intentionally has no default defined.
		} );
	} );
} );

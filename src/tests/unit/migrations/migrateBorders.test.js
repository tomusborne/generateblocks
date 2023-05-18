import { migrationPipe } from '../../../hoc/migrations/utils';
import migrateBorders from '../../../hoc/migrations/migrateBorders';

describe( 'Test border migrations', () => {
	const defaults = {
		borderSizeTop: {
			default: '',
		},
		borderSizeRight: {
			default: '',
		},
		borderColor: {
			default: '',
		},
		borderColorOpacity: {
			default: 1,
		},
		borderColorHover: {
			default: '',
		},
		borderColorHoverOpacity: {
			default: 1,
		},
		borderRadiusTopLeft: {
			default: '',
		},
		bordeRadiusTopLeftMobile: {
			default: '',
		},
		borderRadiusTopRight: {
			default: '',
		},
		borderRadiusBottomRight: {
			default: '',
		},
		borderRadiusBottomLeft: {
			default: '',
		},
		borderRadiusUnit: {
			default: 'px',
		},
	};

	it( 'can migrate borders', () => {
		const attributes = {
			blockVersion: 3,
			borderSizeTop: '5',
			borderSizeRight: '10',
			borderColor: '#000000',
			borderColorHover: '#ffffff',
			borderColorHoverOpacity: 0.5,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateBorders( {
					blockVersionLessThan: 4,
					attributesToMigrate: [ 'borderSizeTop', 'borderSizeRight', 'borderSizeBottom', 'borderSizeLeft' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			borders: {
				borderTopWidth: '5px',
				borderRightWidth: '10px',
				borderTopStyle: 'solid',
				borderRightStyle: 'solid',
				borderTopColor: '#000000',
				borderTopColorHover: 'rgba(255, 255, 255, 0.5)',
				borderRightColor: '#000000',
				borderRightColorHover: 'rgba(255, 255, 255, 0.5)',
			},
			borderSizeTop: '',
			borderSizeRight: '',
			borderColor: '',
			borderColorHover: '',
			borderColorOpacity: 1,
			borderColorHoverOpacity: 1,
		} );
	} );

	it( 'can migrate border radius', () => {
		const attributes = {
			blockVersion: 3,
			borderRadiusTopLeft: '5',
			borderRadiusTopLeftMobile: '2',
			borderRadiusTopRight: '10',
			borderRadiusUnit: '%',
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				migrateBorders( {
					blockVersionLessThan: 4,
					attributesToMigrate: [ 'borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomRight', 'borderRadiusBottomLeft' ],
					defaults,
				} ),
			]
		);

		expect( newAttributes ).toEqual( {
			borders: {
				borderTopLeftRadius: '5%',
				borderTopLeftRadiusMobile: '2%',
				borderTopRightRadius: '10%',
			},
			borderRadiusTopLeft: '',
			borderRadiusTopLeftMobile: '',
			borderRadiusTopRight: '',
			borderRadiusUnit: 'px',
		} );
	} );
} );

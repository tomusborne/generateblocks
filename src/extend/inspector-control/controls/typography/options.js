import { __ } from '@wordpress/i18n';

const typographyOptions = {
	fontFamily: [
		{ value: '', label: __( 'Select font', 'generateblocks' ) },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Georgia', label: 'Georgia' },
	],
	fontWeight: [
		{ value: '', 		label: __( 'Default', 'generateblocks' ) },
		{ value: 'normal', 	label: __( 'Normal', 'generateblocks' ) },
		{ value: 'bold', 	label: __( 'Bold', 'generateblocks' ) },
		{ value: '100', 	label: __( '100 - Thin', 'generateblocks' ) },
		{ value: '200', 	label: __( '200 - Extra light', 'generateblocks' ) },
		{ value: '300', 	label: __( '300 - Light', 'generateblocks' ) },
		{ value: '400', 	label: __( '400 - Normal', 'generateblocks' ) },
		{ value: '500', 	label: __( '500 - Medium', 'generateblocks' ) },
		{ value: '600', 	label: __( '600 - Semi bold', 'generateblocks' ) },
		{ value: '700', 	label: __( '700 - Bold', 'generateblocks' ) },
		{ value: '800', 	label: __( '800 - Extra bold', 'generateblocks' ) },
		{ value: '900', 	label: __( '900 - Black', 'generateblocks' ) },
	],
	textTransform: [
		{ value: '', 			label: __( 'Default', 'generateblocks' ) },
		{ value: 'uppercase', 	label: __( 'Uppercase', 'generateblocks' ) },
		{ value: 'lowercase', 	label: __( 'Lowercase', 'generateblocks' ) },
		{ value: 'capitalize', 	label: __( 'Capitalize', 'generateblocks' ) },
		{ value: 'initial', 	label: __( 'Normal', 'generateblocks' ) },
	],
};

export default typographyOptions;

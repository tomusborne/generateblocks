import { __ } from '@wordpress/i18n';

const iconOptions = {
	location: [
		{ label: __( 'Inline', 'generateblocks' ), value: 'inline' },
		{ label: __( 'Above', 'generateblocks' ), value: 'above' },
	],
	alignment: [
		{ label: __( 'Top', 'generateblocks' ), value: 'top' },
		{ label: __( 'Center', 'generateblocks' ), value: 'center' },
		{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
	],
};

export default iconOptions;

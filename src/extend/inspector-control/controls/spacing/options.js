import { __ } from '@wordpress/i18n';

const spacingOptions = {
	minimumHeightUnits: [ 'px', 'vh', 'vw' ],
	verticalAlignment: [
		{ label: __( 'Default', 'generateblocks' ), value: '' },
		{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
		{ label: __( 'Center', 'generateblocks' ), value: 'center' },
		{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
	],
};

export default spacingOptions;

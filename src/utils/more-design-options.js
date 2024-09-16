import { __ } from '@wordpress/i18n';

export const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel button[id*="styles"]' )?.click(),
};

import { __ } from '@wordpress/i18n';

export const selectorShortcuts = {
	default: {
		items: [
			{ label: 'Hover', value: '&:hover' },
			{ label: 'Hover & Focus', value: '&:is(:hover, :focus)' },
			{ label: 'Links', value: 'a' },
			{ label: 'Hovered links', value: 'a:hover' },
		],
	},
	interactions: {
		label: __( 'Interactions', 'generateblocks-pro' ),
		items: [
			{ label: 'Hover', value: '&:hover' },
			{ label: 'Focus', value: '&:focus' },
			{ label: 'Hover & Focus', value: '&:is(:hover, :focus)' },
		],
	},
	links: {
		label: __( 'Links', 'generateblocks-pro' ),
		items: [
			{ label: 'Links', value: 'a' },
			{ label: 'Hovered links', value: 'a:hover' },
			{ label: 'Hovered & focused links', value: 'a:is(:hover, :focus)' },
			{ label: 'Visited links', value: 'a:visited' },
		],
	},
	pseudoElements: {
		label: __( 'Pseudo Elements', 'generateblocks-pro' ),
		items: [
			{ label: 'Before', value: '&:before' },
			{ label: 'After', value: '&:after' },
		],
	},
};

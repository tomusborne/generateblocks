import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const containerContext = defaultsDeep( {
	id: 'container',
	supports: {
		responsiveTabs: true,
		settingsPanel: {
			enabled: true,
			icon: 'container-settings',
		},
		layout: {
			enabled: true,
			display: true,
			flexDirection: true,
			flexWrap: true,
			alignItems: true,
			justifyContent: true,
			columnGap: true,
			rowGap: true,
			zIndex: true,
			position: true,
			overflow: true,
			themeWidth: true,
		},
		flexChildPanel: {
			enabled: true,
			flex: true,
			order: true,
		},
		sizingPanel: {
			enabled: true,
			width: true,
			height: true,
			minWidth: true,
			minHeight: true,
			maxWidth: true,
			maxHeight: true,
			useGlobalMaxWidth: true,
		},
		typography: {
			enabled: true,
			alignment: true,
			fontWeight: true,
			textTransform: true,
			fontSize: true,
			fontFamily: true,
		},
		spacing: {
			enabled: true,
			padding: true,
			margin: true,
		},
		borders: {
			enabled: true,
			borderColors: [
				{
					state: '',
					tooltip: __( 'Border', 'generateblocks' ),
					alpha: true,
				},
				{
					state: 'Hover',
					tooltip: __( 'Border Hover', 'generateblocks' ),
					alpha: true,
				},
			],
			borderTop: true,
			borderRight: true,
			borderBottom: true,
			borderLeft: true,
			borderRadius: true,
		},
		colors: {
			enabled: true,
			elements: [
				{
					group: 'background',
					label: __( 'Background', 'generateblocks' ),
					items: [
						{
							attribute: 'backgroundColor',
							alpha: true,
						},
					],
				},
				{
					group: 'text',
					label: __( 'Text', 'generateblocks' ),
					items: [
						{
							attribute: 'textColor',
						},
					],
				},
				{
					group: 'link',
					label: __( 'Link', 'generateblocks' ),
					items: [
						{
							attribute: 'linkColor',
						},
						{
							tooltip: __( 'Hover', 'generateblocks' ),
							attribute: 'linkColorHover',
						},
					],
				},
			],
		},
		backgroundPanel: {
			enabled: true,
			backgroundImage: true,
			backgroundGradient: true,
		},
		shapesPanel: {
			enabled: true,
		},
	},
}, defaultContext );

export default containerContext;

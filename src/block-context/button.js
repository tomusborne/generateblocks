import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const buttonContext = defaultsDeep( {
	id: 'button',
	supports: {
		responsiveTabs: true,
		settingsPanel: {
			enabled: true,
			icon: 'button-settings',
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
			letterSpacing: true,
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
						{
							tooltip: __( 'Hover', 'generateblocks' ),
							attribute: 'backgroundColorHover',
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
						{
							tooltip: __( 'Hover', 'generateblocks' ),
							attribute: 'textColorHover',
						},
					],
				},
			],
		},
		backgroundPanel: {
			enabled: true,
			backgroundGradient: true,
		},
		icon: {
			enabled: true,
			location: [
				{ label: __( 'Left', 'generateblocks' ), value: 'left' },
				{ label: __( 'Right', 'generateblocks' ), value: 'right' },
			],
			iconSize: true,
		},
	},
}, defaultContext );

export default buttonContext;

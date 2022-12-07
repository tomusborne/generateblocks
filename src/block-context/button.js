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
			dimensions: [
				{
					type: 'padding',
					label: __( 'Padding', 'generateblocks' ),
					units: [ 'px', 'em', '%' ],
				},
				{
					type: 'margin',
					label: __( 'Margin', 'generateblocks' ),
					units: [ 'px', 'em', '%' ],
				},
				{
					type: 'borderSize',
					label: __( 'Border Size', 'generateblocks' ),
					units: [ 'px' ],
				},
				{
					type: 'borderRadius',
					label: __( 'Border Radius', 'generateblocks' ),
					units: [ 'px', 'em', '%' ],
				},
			],
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
				{
					group: 'border',
					label: __( 'Border', 'generateblocks' ),
					items: [
						{
							attribute: 'borderColor',
							alpha: true,
						},
						{
							tooltip: __( 'Hover', 'generateblocks' ),
							attribute: 'borderColorHover',
							alpha: true,
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
		},
	},
}, defaultContext );

export default buttonContext;

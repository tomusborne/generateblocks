import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const headlineContext = defaultsDeep( {
	id: 'headline',
	supports: {
		responsiveTabs: true,
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
			lineHeight: true,
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
				{
					group: 'icon',
					label: __( 'Icon', 'generateblocks' ),
					items: [
						{
							attribute: 'iconColor',
							alpha: true,
						},
					],
				},
				{
					group: 'highlight',
					label: __( 'Highlight', 'generateblocks' ),
					items: [
						{
							attribute: 'highlightTextColor',
						},
					],
				},
			],
		},
		icon: {
			enabled: true,
			iconSize: true,
		},
	},
}, defaultContext );

export default headlineContext;

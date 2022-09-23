import defaultContext from './default';
import { __ } from '@wordpress/i18n';

const headlineContext = Object.assign( {}, defaultContext, {
	supports: {
		responsiveTabs: true,
		hasIcon: true,
		typography: {
			enabled: true,
			fontWeight: true,
			textTransform: true,
			fontSize: true,
			lineHeight: true,
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
					group: 'border',
					label: __( 'Border', 'generateblocks' ),
					items: [
						{
							attribute: 'borderColor',
							alpha: true,
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
		htmlTags: {
			enabled: true,
			tags: [
				{ label: 'h1', value: 'h1' },
				{ label: 'h2', value: 'h2' },
				{ label: 'h3', value: 'h3' },
				{ label: 'h4', value: 'h4' },
				{ label: 'h5', value: 'h5' },
				{ label: 'h6', value: 'h6' },
				{ label: 'paragraph', value: 'p' },
				{ label: 'div', value: 'div' },
				{ label: 'figcaption', value: 'figcaption' },
			],
		},
	},
} );

export default headlineContext;

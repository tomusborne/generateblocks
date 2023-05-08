import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const imageContext = defaultsDeep( {
	id: 'image',
	supports: {
		responsiveTabs: true,
		settingsPanel: {
			enabled: true,
			icon: 'backgrounds',
		},
		spacing: {
			enabled: true,
			dimensions: [
				{
					label: __( 'Padding', 'generateblocks' ),
					attributes: [ 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft' ],
				},
				{
					label: __( 'Margin', 'generateblocks' ),
					attributes: [ 'marginTop', 'marginRight', 'marginBottom', 'marginLeft' ],
				},
				{
					label: __( 'Border Size', 'generateblocks' ),
					attributes: [ 'borderSizeTop', 'borderSizeRight', 'borderSizeBottom', 'borderSizeLeft' ],
				},
				{
					label: __( 'Border Radius', 'generateblocks' ),
					attributes: [ 'borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomRight', 'borderRadiusBottomLeft' ],
				},
			],
		},
		colors: {
			enabled: true,
			elements: [
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
			],
		},
	},
}, defaultContext );

export default imageContext;

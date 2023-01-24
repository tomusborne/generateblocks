import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const buttonContainerContext = defaultsDeep( {
	id: 'buttonContainer',
	supports: {
		responsiveTabs: true,
		spacing: {
			enabled: true,
			stackVertically: true,
			fillHorizontalSpace: true,
			dimensions: [
				{
					type: 'margin',
					label: __( 'Margin', 'generateblocks' ),
					units: [ 'px', 'em', '%' ],
				},
			],
		},
	},
}, defaultContext );

export default buttonContainerContext;

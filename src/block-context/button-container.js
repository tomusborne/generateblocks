import defaultContext from './default';
import { __ } from '@wordpress/i18n';

const buttonContainerContext = Object.assign( {}, defaultContext, {
	id: 'buttonContainer',
	supports: Object.assign( {}, defaultContext.supports, {
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
	} ),
} );

export default buttonContainerContext;

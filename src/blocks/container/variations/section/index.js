import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';

registerBlockVariation(
	'generateblocks/container',
	{
		name: 'section',
		title: __( 'Section' ),
		description: __( 'A top-level block that adds an outer and inner container.', 'generateblocks' ),
		icon: getIcon( 'section' ),
		attributes: {
			variantRole: 'section',
		},
		isActive: ( attrs ) => 'section' === attrs.variantRole,
		innerBlocks: [
			[
				'generateblocks/container',
				{
					useGlobalContainerWidth: true,
					marginLeft: 'auto',
					marginRight: 'auto',
				},
			],
		],
	}
);

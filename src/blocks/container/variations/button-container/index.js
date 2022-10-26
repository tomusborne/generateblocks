import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import './InspectorControls';
import './BlockAppender';

registerBlockVariation(
	'generateblocks/container',
	{
		name: 'button-container',
		title: __( 'Button Container' ),
		description: __( 'Group your buttons in a Container.', 'generateblocks' ),
		icon: getIcon( 'button-container' ),
		scope: [ 'block' ],
		attributes: {
			variantRole: 'button-container',
			display: 'flex',
		},
		isActive: ( attrs ) => 'button-container' === attrs.variantRole,
		innerBlocks: [
			[
				'generateblocks/button',
				generateBlocksStyling.button,
			],
		],
	}
);

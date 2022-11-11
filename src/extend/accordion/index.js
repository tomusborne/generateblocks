import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

// Internal dependencies.
import './attributes';
import './edit';
import './components/ContainerInspectorControls';
import './components/ButtonInspectorControls';
import './components/BlockAppender';
import AccordionTemplate from './components/AccordionTemplate';
import './editor.scss';
import getIcon from '../../utils/get-icon';

registerBlockVariation(
	'generateblocks/container',
	{
		title: __( 'Accordion', 'generateblocks' ),
		name: 'accordion',
		icon: getIcon( 'accordion' ),
		attributes: {
			variantRole: 'accordion',
		},
		innerBlocks: AccordionTemplate,
		isActive: ( attrs ) => 'accordion' === attrs.variantRole,
	}
);

registerBlockVariation(
	'generateblocks/container',
	{
		title: __( 'Accordion Item', 'generateblocks' ),
		name: 'accordion-item',
		scope: [ 'block' ],
		attributes: {
			variantRole: 'accordion-item',
		},
		isActive: ( attrs ) => 'accordion-item' === attrs.variantRole,
	}
);

registerBlockVariation(
	'generateblocks/container',
	{
		title: __( 'Accordion Content', 'generateblocks' ),
		name: 'accordion-content',
		scope: [ 'block' ],
		attributes: {
			variantRole: 'accordion-content',
		},
		isActive: ( attrs ) => 'accordion-content' === attrs.variantRole,
	}
);

registerBlockVariation(
	'generateblocks/button',
	{
		title: __( 'Accordion Title', 'generateblocks' ),
		name: 'accordion-title',
		scope: [ 'block' ],
		attributes: {
			variantRole: 'accordion-toggle',
		},
		isActive: ( attrs ) => 'accordion-toggle' === attrs.variantRole,
	}
);

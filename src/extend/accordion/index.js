import { addFilter } from '@wordpress/hooks';
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

const BlockData = ( settings ) => {
	if ( 'generateblocks/container' === settings.name ) {
		settings.__experimentalLabel = ( { accordionItem, accordionContent } ) => {
			if ( accordionItem ) {
				return __( 'Accordion Item', 'generateblocks' );
			}

			if ( accordionContent ) {
				return __( 'Accordion Content', 'generateblocks' );
			}

			return settings.title;
		};
	}

	if ( 'generateblocks/button' === settings.name ) {
		settings.__experimentalLabel = ( { accordionToggle } ) => {
			if ( accordionToggle ) {
				return __( 'Accordion Toggle', 'generateblocks' );
			}

			return settings.title;
		};
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'generateblocks/accordion/block-data',
	BlockData
);

registerBlockVariation(
	'generateblocks/container',
	{
		title: __( 'Accordion', 'generateblocks' ),
		name: 'accordion',
		attributes: {
			variantRole: 'accordion',
			accordionContainer: true,
		},
		innerBlocks: AccordionTemplate,
		isActive: ( attrs ) => 'accordion' === attrs.variantRole,
	}
);

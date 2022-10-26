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

/**
 * Accordion blockContext rules.
 *
 * @param {Object} blockContext The blockContext.
 * @param {Object} props        The component props.
 * @return {Object} The block context with accordion rules.
 */
function accordionBlockContextRules( blockContext, props ) {
	if ( !! props.attributes.accordionItem || !! props.attributes.accordionContainer ) {
		const supports = Object.assign( {}, blockContext.supports, {
			settingsPanel: {
				enabled: true,
				label: __( 'Accordion', 'generateblocks' ),
				icon: 'wrench',
			},
		} );

		return Object.assign( {}, blockContext, { supports } );
	}

	return blockContext;
}

addFilter(
	'generateblocks.editor.blockContext',
	'generateblocks/editor/blockContext/accordion',
	accordionBlockContextRules
);

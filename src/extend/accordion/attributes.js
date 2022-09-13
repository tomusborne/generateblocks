import { addFilter } from '@wordpress/hooks';

/**
 * Add custom attribute for accordions.
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
const attributes = ( settings ) => {
	if ( 'undefined' === typeof settings.attributes ) {
		return settings;
	}

	if ( 'generateblocks/container' === settings.name ) {
		settings.attributes = Object.assign(
			settings.attributes, {
				accordionContainer: {
					type: 'boolean',
					default: false,
				},
				accordionItem: {
					type: 'boolean',
					default: false,
				},
				accordionItemOpen: {
					type: 'boolean',
					default: false,
				},
				accordionContent: {
					type: 'boolean',
					default: false,
				},
				accordionMultipleOpen: {
					type: 'boolean',
					default: false,
				},
			}
		);
	}

	if ( 'generateblocks/button' === settings.name ) {
		settings.attributes = Object.assign(
			settings.attributes, {
				accordionToggle: {
					type: 'boolean',
					default: false,
				},
			}
		);
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'generateblocks/accordion/attributes',
	attributes
);

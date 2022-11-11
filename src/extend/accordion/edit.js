import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';

const addCustomAttributes = ( blockHtmlAttributes, blockName, blockAttributes ) => {
	if ( 'generateblocks/container' === blockName ) {
		blockHtmlAttributes = Object.assign(
			blockHtmlAttributes,
			{
				className: classnames( {
					[ blockHtmlAttributes.className ]: true,
					'gb-accordion': 'accordion' === blockAttributes.variantRole,
					'gb-accordion__item': 'accordion-item' === blockAttributes.variantRole,
					'gb-accordion__item-open': 'accordion-item' === blockAttributes.variantRole && !! blockAttributes.accordionItemOpen,
				} ),
				'data-accordion-multiple-open': !! blockAttributes.accordionMultipleOpen ? true : null,
			}
		);
	}

	if ( 'generateblocks/button' === blockName ) {
		blockHtmlAttributes = Object.assign(
			blockHtmlAttributes,
			{
				className: classnames( {
					[ blockHtmlAttributes.className ]: true,
					'gb-accordion__toggle': 'accordion-toggle' === blockAttributes.variantRole,
				} ),
			}
		);
	}

	return blockHtmlAttributes;
};

addFilter(
	'generateblocks.frontend.htmlAttributes',
	'generateblocks/accordion/add-html-attributes',
	addCustomAttributes
);

const RemoveButtonControls = ( show, props ) => {
	if ( 'generateblocks/button' === props.name && 'accordion-toggle' === props.attributes.variantRole ) {
		show = false;
	}

	return show;
};

addFilter(
	'generateblocks.editor.showButtonAppender',
	'generateblocks/accordion/remove-button-appender',
	RemoveButtonControls
);

addFilter(
	'generateblocks.editor.showButtonLinkControl',
	'generateblocks/accordion/remove-button-link-control',
	RemoveButtonControls
);

addFilter(
	'generateblocks.editor.showButtonContainerControl',
	'generateblocks/accordion/remove-button-container-control',
	RemoveButtonControls
);

function setButtonTagName( tagName, props ) {
	if ( 'accordion-toggle' === props.attributes.variantRole ) {
		return 'button';
	}

	return tagName;
}

addFilter(
	'generateblocks.frontend.buttonTagName',
	'generateblocks/accordion/set-button-tagname',
	setButtonTagName
);

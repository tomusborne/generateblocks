import { addFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';

const addCustomAttributes = ( blockHtmlAttributes, blockName, blockAttributes ) => {
	if ( 'generateblocks/container' === blockName ) {
		blockHtmlAttributes = Object.assign(
			blockHtmlAttributes,
			{
				className: classnames( {
					[ blockHtmlAttributes.className ]: true,
					'gb-accordion': !! blockAttributes.accordionContainer,
					'gb-accordion__item': !! blockAttributes.accordionItem,
					'gb-accordion__item-open': !! blockAttributes.accordionItem && !! blockAttributes.accordionItemOpen,
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
					'gb-accordion__toggle': !! blockAttributes.accordionToggle,
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

const RemoveButtonAppender = ( show, props ) => {
	const {
		name,
		clientId,
	} = props;

	const {
		getBlockParentsByBlockName,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	if ( 'generateblocks/button-container' === name ) {
		const parentBlockId = getBlockParentsByBlockName( clientId, 'generateblocks/container', true )[ 0 ];

		if ( parentBlockId ) {
			const parentBlock = getBlocksByClientId( parentBlockId );

			if ( parentBlock && parentBlock[ 0 ].attributes.accordionItem ) {
				show = false;
			}
		}
	}

	if ( 'generateblocks/button' === name ) {
		if ( props.attributes.accordionToggle ) {
			show = false;
		}
	}

	return show;
};

addFilter(
	'generateblocks.editor.showButtonAppender',
	'generateblocks/accordion/remove-button-appender',
	RemoveButtonAppender
);

const RemoveButtonLinkControl = ( show, props ) => {
	if ( 'generateblocks/button' === props.name ) {
		if ( props.attributes.accordionToggle ) {
			show = false;
		}
	}

	return show;
};

addFilter(
	'generateblocks.editor.showButtonLinkControl',
	'generateblocks/accordion/remove-button-link-control',
	RemoveButtonLinkControl
);

function setButtonTagName( tagName, props ) {
	if ( props.attributes.accordionToggle ) {
		return 'button';
	}

	return tagName;
}

addFilter(
	'generateblocks.frontend.buttonTagName',
	'generateblocks/accordion/set-button-tagname',
	setButtonTagName
);

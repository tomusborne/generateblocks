import { addFilter } from '@wordpress/hooks';

const BlockAppender = ( appender, { attributes } ) => {
	const {
		variantRole,
	} = attributes;

	if ( 'button-container' === variantRole ) {
		return '';
	}

	return appender;
};

addFilter(
	'generateblocks.editor.containerAppender',
	'generateblocks/button-container/BlockAppender',
	BlockAppender,
);

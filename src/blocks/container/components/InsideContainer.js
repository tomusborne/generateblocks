import { createElement } from '@wordpress/element';

export default function InsideContainer( { useLegacyLayout, children } ) {
	if ( ! useLegacyLayout ) {
		return children;
	}

	return createElement(
		'div',
		{
			className: 'gb-inside-container',
		},
		children
	);
}

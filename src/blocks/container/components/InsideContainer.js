import { createElement } from '@wordpress/element';

export default function InsideContainer( { useInnerContainer, children } ) {
	if ( ! useInnerContainer ) {
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

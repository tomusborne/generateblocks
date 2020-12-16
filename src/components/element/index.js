import {
	createElement,
} from '@wordpress/element';

export default function Element( { tagName, htmlAttrs, children } ) {
	return createElement(
		tagName,
		htmlAttrs,
		children
	);
}

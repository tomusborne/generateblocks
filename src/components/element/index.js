const { createElement } = wp.element;

export default function Element( { tagName, htmlAttrs, children } ) {
	return createElement(
		tagName,
		htmlAttrs,
		children
	);
}

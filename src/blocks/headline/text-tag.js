const { createElement } = wp.element;
const { applyFilters } = wp.hooks;

export default function Text( { attributes, tagName, id, className, style, children } ) {
	if ( ! id ) {
		id = null;
	}

	const htmlAttributes = {
		className: className,
		id: id,
		style: style,
	};

	return createElement(
		tagName,
		applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes ),
		children
	);
}

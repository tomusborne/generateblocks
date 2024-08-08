export const containerTagNames = [
	'div',
	'section',
	'article',
	'aside',
	'header',
	'footer',
	'nav',
	'main',
	'figure',
];

export const headingTagNames = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
];

export const buttonTagNames = [
	'button',
	'a',
];

export const paragraphTagNames = [
	'p',
];

export const inlineTextTagNames = [
	'span',
];

export const textTagNames = [
	...headingTagNames,
	...buttonTagNames,
	...paragraphTagNames,
	...inlineTextTagNames,
];

export function getElementType( tagName ) {
	if ( containerTagNames.includes( tagName ) ) {
		return 'container';
	}

	if ( headingTagNames.includes( tagName ) ) {
		return 'heading';
	}

	if ( buttonTagNames.includes( tagName ) ) {
		return 'button';
	}

	return tagName;
}

export function isTextElement( tagName ) {
	return textTagNames.includes( tagName );
}

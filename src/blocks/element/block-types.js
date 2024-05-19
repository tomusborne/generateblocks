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

export function getBlockType( tagName ) {
	if ( containerTagNames.includes( tagName ) ) {
		return 'container';
	}

	if ( headingTagNames.includes( tagName ) ) {
		return 'heading';
	}

	if ( buttonTagNames.includes( tagName ) ) {
		return 'button';
	}

	if ( paragraphTagNames.includes( tagName ) ) {
		return 'paragraph';
	}

	return tagName;
}

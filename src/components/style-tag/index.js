import { createElement } from '@wordpress/element';

export default function StyleTag( { mediaQuery, children } ) {
	let query = '';

	switch ( mediaQuery ) {
		case 'desktop':
			query = '(min-width: 1025px)';
			break;

		case 'tablet':
			query = '(max-width: 1024px)';
			break;

		case 'tablet_only':
			query = '(max-width: 1024px) and (min-width: 768px)';
			break;

		case 'mobile':
			query = '(max-width: 767px)';
			break;
	}

	return createElement(
		'style',
		{
			media: query,
		},
		children
	);
}

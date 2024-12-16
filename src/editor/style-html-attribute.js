import { addFilter } from '@wordpress/hooks';
import { replaceTags } from '../dynamic-tags/utils';

addFilter(
	'generateblocks.editor.htmlAttributes.style',
	'generateblocks/styleWithReplacements',
	async( style, props ) => {
		const { context } = props;

		// Check if any replacements need to be made
		if ( ! style.includes( '{{' ) ) {
			return style;
		}

		const replacements = await replaceTags( style, context );

		if ( ! replacements.length ) {
			return style;
		}

		const withReplacements = replacements.reduce( ( acc, { original, replacement, fallback } ) => {
			if ( ! replacement ) {
				return acc.replaceAll( original, fallback );
			}

			return acc.replaceAll( original, replacement );
		}, style );

		return withReplacements ? withReplacements : style;
	}
);

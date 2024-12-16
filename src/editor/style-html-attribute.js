import { addFilter } from '@wordpress/hooks';
import { useState, useEffect } from '@wordpress/element';
import { replaceTags } from '../dynamic-tags/utils';

addFilter(
	'generateblocks.editor.htmlAttributes.style',
	'generateblocks/styleWithReplacements',
	( style, props ) => {
		const { context } = props;
		const [ styleValue, setStyleValue ] = useState( style );

		useEffect( () => {
			async function getReplacements() {
				// Check if any replacements need to be made if not, do nothing.
				if ( ! style.includes( '{{' ) ) {
					setStyleValue( style );
					return;
				}

				const replacements = await replaceTags( style, context );

				if ( ! replacements.length ) {
					setStyleValue( style );
					return;
				}

				const withReplacements = replacements.reduce( ( acc, { original, replacement, fallback } ) => {
					if ( ! replacement ) {
						return acc.replaceAll( original, fallback );
					}

					return acc.replaceAll( original, replacement );
				}, style );

				setStyleValue( withReplacements ? withReplacements : style );
			}

			getReplacements();
		}, [ style, context ] );

		return styleValue;
	}
);

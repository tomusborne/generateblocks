/**
 * Block: Headline
 */

import classnames from 'classnames';
import Element from '../../components/element';

import {
	RichText,
} from '@wordpress/block-editor';

import {
	applyFilters,
} from '@wordpress/hooks';

export default ( { attributes } ) => {
	const {
		uniqueId,
		className,
		anchor,
		element,
		content,
		icon,
		removeText,
		ariaLabel,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! icon,
			[ className ]: undefined !== className,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

	return (
		<Element
			tagName={ element }
			htmlAttrs={ htmlAttributes }
		>
			{ !! icon &&
				<span
					className="gb-icon"
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
					dangerouslySetInnerHTML={ { __html: icon } }
				/>
			}

			{ ! removeText &&
				<RichText.Content
					value={ content }
					tagName={ !! icon ? 'span' : null }
					className={ !! icon ? 'gb-headline-text' : null }
				/>
			}
		</Element>
	);
};

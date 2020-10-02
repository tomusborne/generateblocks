/**
 * Block: Headline
 */

import classnames from 'classnames';
import sanitizeSVG from '../../utils/sanitize-svg';
import Text from './text-tag';

const {
	RichText,
} = wp.blockEditor;

const {
	applyFilters,
} = wp.hooks;

export default ( { attributes } ) => {
	const {
		uniqueId,
		elementId,
		cssClasses,
		element,
		content,
		icon,
		removeText,
		ariaLabel,
	} = attributes;

	let htmlAttributes = {
		id: !! elementId ? elementId : undefined,
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			[ `${ cssClasses }` ]: '' !== cssClasses,
		} ),
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

	return (
		<Text
			attributes={ attributes }
			tagName={ element }
			id={ anchor }
			className={ classnames( {
				'gb-headline': true,
				'gb-headline-wrapper': ! icon,
				[ `gb-headline-${ uniqueId }` ]: true,
				[  className ]: undefined !== className,
			} ) }
		>
			{ !! icon &&
				<span
					className="gb-icon"
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}

			{ ! removeText &&
				<RichText.Content
					value={ content }
					tagName={ !! icon ? 'span' : null }
					className={ !! icon ? 'gb-headline-wrapper' : null }
				/>
			}
		</Text>
	);
};

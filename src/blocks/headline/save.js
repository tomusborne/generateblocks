/**
 * Block: Headline
 */

import classnames from 'classnames';
import sanitizeSVG from '../../utils/sanitize-svg';
import Text from './text-tag';

const {
	RichText,
} = wp.blockEditor;

export default ( { attributes } ) => {
	const {
		uniqueId,
		anchor,
		element,
		content,
		icon,
		removeText,
		ariaLabel,
	} = attributes;

	return (
		<Text
			attributes={ attributes }
			tagName={ element }
			id={ anchor }
			className={ classnames( {
				'gb-headline': true,
				'gb-headline-wrapper': ! icon,
				[ `gb-headline-${ uniqueId }` ]: true,
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

/**
 * Block: Headline
 */

import classnames from 'classnames';
import sanitizeSVG from '../../utils/sanitize-svg';

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

	const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

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
		<ConditionalWrap
			condition={ icon }
			wrap={ children => <div className={ classnames( {
				'gb-headline-wrapper': true,
				[ `gb-headline-wrapper-${ uniqueId }` ]: true,
			} ) }>{ children }</div> }
		>
			{ icon &&
				<span
					className="gb-icon"
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}

			{ ! removeText &&
				<RichText.Content
					tagName={ element }
					value={ content }
					{ ...htmlAttributes }
				/>
			}
		</ConditionalWrap>
	);
};

/**
 * Block: Buttons
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
		text,
		url,
		target,
		relNoFollow,
		relSponsored,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
	} = attributes;

	const relAttributes = [];

	if ( relNoFollow ) {
		relAttributes.push( 'nofollow' );
	}

	if ( target ) {
		relAttributes.push( 'noopener', 'noreferrer' );
	}

	if ( relSponsored ) {
		relAttributes.push( 'sponsored' );
	}

	let htmlAttributes = {
		id: !! elementId ? elementId : undefined,
		className: classnames( {
			'gb-button': true,
			[ `gb-button-${ uniqueId }` ]: true,
			[ `${ cssClasses }` ]: '' !== cssClasses,
		} ),
		href: !! url ? url : undefined,
		target: !! target ? '_blank' : undefined,
		rel: relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : undefined,
		'aria-label': !! ariaLabel ? ariaLabel : undefined,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes );

	return (
		<a
			{ ...htmlAttributes }
		>
			{ icon && 'left' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}
			{ ! removeText &&
				<RichText.Content tagName="span" className="button-text" value={ text } key="button-text" />
			}
			{ icon && 'right' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}
		</a>
	);
};

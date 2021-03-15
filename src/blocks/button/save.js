/**
 * Block: Buttons
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
		text,
		url,
		target,
		relNoFollow,
		relSponsored,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
		anchor,
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
		className: classnames( {
			'gb-button': true,
			[ `gb-button-${ uniqueId }` ]: true,
			'gb-button-text': ! icon,
			[ `${ className }` ]: undefined !== className,
		} ),
		href: !! url ? url : null,
		target: !! target ? '_blank' : null,
		rel: relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null,
		'aria-label': !! ariaLabel ? ariaLabel : null,
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes );

	return (
		<Element
			tagName={ url ? 'a' : 'span' }
			htmlAttrs={ htmlAttributes }
		>
			{ !! icon && 'left' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: icon } }
				/>
			}

			{ ! removeText &&
				<RichText.Content
					value={ text }
					tagName={ !! icon ? 'span' : null }
					className={ !! icon ? 'gb-button-text' : null }
				/>
			}

			{ !! icon && 'right' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: icon } }
				/>
			}
		</Element>
	);
};

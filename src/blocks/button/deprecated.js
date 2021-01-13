/**
 * External dependencies
 */
import classnames from 'classnames';
import blockAttributes from './attributes';
import sanitizeSVG from '../../utils/sanitize-svg';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	RichText,
} from '@wordpress/block-editor';

const deprecated = [
	// v1 of button block.
	{
		attributes: {
			...blockAttributes,
			text: {
				type: 'array',
				source: 'children',
				selector: '.gb-button .button-text',
				default: 'Button',
			},
		},
		supports: {
			anchor: false,
			className: false,
			customClassName: false,
			inserter: false,
			reusable: false,
		},
		migrate( attributes ) {
			const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
			const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;

			return {
				...attributes,
				className: oldClasses,
				anchor: oldAnchor,
				cssClasses: '',
				elementId: '',
			};
		},
		save( { attributes } ) {
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
						<RichText.Content
							tagName="span"
							className="button-text"
							value={ text }
							key="button-text"
						/>
					}
					{ icon && 'right' === iconLocation &&
						<span
							className="gb-icon"
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					}
				</a>
			);
		},
	},
];

export default deprecated;

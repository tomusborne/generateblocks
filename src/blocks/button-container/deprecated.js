/**
 * External dependencies
 */
import classnames from 'classnames';
import blockAttributes from './attributes';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

import {
	applyFilters,
} from '@wordpress/hooks';

const deprecated = [
	// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
	{
		attributes: blockAttributes,
		supports: {
			anchor: false,
			className: false,
			customClassName: false,
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
			} = attributes;

			let htmlAttributes = {
				id: !! elementId ? elementId : undefined,
				className: classnames( {
					'gb-button-wrapper': true,
					[ `gb-button-wrapper-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
				} ),
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes );

			return (
				<div
					{ ...htmlAttributes }
				>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;

/**
 * External dependencies
 */
import classnames from 'classnames';
import Element from '../../components/element';
import blockAttributes from './attributes';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

import { getBlockAttributes } from '../../block-context';
import containerContext from '../../block-context/container';

const allAttributes = Object.assign(
	{},
	getBlockAttributes(
		blockAttributes,
		containerContext,
		generateBlocksDefaults.container
	),
);

const deprecated = [
	// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
	{
		attributes: allAttributes,
		supports: {
			align: false,
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
				tagName,
				elementId,
				cssClasses,
				isGrid,
				align,
			} = attributes;

			const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

			let htmlAttributes = {
				className: classnames( {
					'gb-container': true,
					[ `gb-container-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
					[ `align${ align }` ]: !! align && ! isGrid,
				} ),
				id: elementId ? elementId : null,
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/container', attributes );

			return (
				<ConditionalWrap
					condition={ isGrid }
					wrap={ ( children ) => <div className={ classnames( {
						'gb-grid-column': true,
						[ `gb-grid-column-${ uniqueId }` ]: true,
					} ) }>{ children }</div> }
				>
					<Element
						tagName={ tagName }
						htmlAttrs={ htmlAttributes }
					>
						{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
						<div className={ classnames( {
							'gb-inside-container': true,
						} ) }>
							<InnerBlocks.Content />
						</div>
					</Element>
				</ConditionalWrap>
			);
		},
	},
];

export default deprecated;

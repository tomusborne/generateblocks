/**
 * External dependencies
 */
import classnames from 'classnames';
import blockAttributes from './attributes';

const {
	applyFilters,
} = wp.hooks;

const {
	InnerBlocks,
} = wp.blockEditor;

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
			const oldClasses = ( attributes.cssClasses ? attributes.cssClasses : undefined );
			const oldAnchor = ( attributes.elementId ? attributes.elementId : undefined );

			return {
				...attributes,
				className: oldClasses ? oldClasses : undefined,
				anchor: oldAnchor ? oldAnchor : undefined,
			};
		},
		save: ( props ) => {
			const {
				uniqueId,
				elementId,
				cssClasses,
			} = props.attributes;

			let htmlAttributes = {
				id: !! elementId ? elementId : undefined,
				className: classnames( {
					'gb-grid-wrapper': true,
					[ `gb-grid-wrapper-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
				} ),
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', props.attributes );

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

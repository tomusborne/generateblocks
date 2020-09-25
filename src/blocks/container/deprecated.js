/**
 * External dependencies
 */
import classnames from 'classnames';
import Section from './section-tag';
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
			customClassName: false,
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

			return (
				<ConditionalWrap
					condition={ isGrid }
					wrap={ children => <div className={ classnames( {
						'gb-grid-column': true,
						[ `gb-grid-column-${ uniqueId }` ]: true,
					} ) }>{ children }</div> }
				>
					<Section
						attributes={ attributes }
						tagName={ tagName }
						id={ elementId }
						className={ classnames( {
							'gb-container': true,
							[ `gb-container-${ uniqueId }` ]: true,
							[ `${ cssClasses }` ]: '' !== cssClasses,
							[ `align${ align }` ]: !! align && ! isGrid,
						} ) }
					>
						{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
						<div className={ classnames( {
							'gb-inside-container': true,
						} ) }>
							<InnerBlocks.Content />
						</div>
					</Section>
				</ConditionalWrap>
			);
		},
	},
];

export default deprecated;

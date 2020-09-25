/**
 * Block: Container
 */

import Section from './section-tag';
import classnames from 'classnames';

const {
	InnerBlocks,
} = wp.blockEditor;

const {
	applyFilters,
} = wp.hooks;

export default ( { attributes } ) => {
	const {
		uniqueId,
		tagName,
		isGrid,
		align,
	} = attributes;

	return (
		<Section
			attributes={ attributes }
			tagName={ tagName }
			className={ classnames( {
				'gb-container': true,
				[ `gb-container-${ uniqueId }` ]: true,
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
	);
};

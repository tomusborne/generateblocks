/**
 * Block: Section
 */

import Section from './section-tag';
import classnames from 'classnames';

const {
	InnerBlocks
} = wp.editor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		tagName,
		elementId,
		cssClasses,
		outerContainer,
		innerContainer,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		backgroundColor,
		textColor,
		linkColor,
		linkColorHover,
		bgImage,
		bgOptions
	} = attributes;

	return (
		<Section
			tagName={ tagName }
			id={ elementId }
			className={ classnames( {
				'generate-section': true,
				[`section-${ uniqueId }`]: true,
				'grid-container grid-parent': 'contained' === outerContainer,
				'parallax': bgOptions.parallax,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<div className={ classnames( {
				'inside-section': true,
				'grid-container grid-parent': 'contained' === innerContainer
			} ) }>
				<InnerBlocks.Content />
			</div>
		</Section>
	);
}

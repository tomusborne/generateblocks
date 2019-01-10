/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import Section from './section-tag';
import classnames from 'classnames';

const {
	InnerBlocks
} = wp.editor;

export default ( { attributes } ) => {

	const {
		uniqueID,
		tagName,
		elementID,
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
			id={ elementID }
			className={ classnames( {
				'generate-section': true,
				[`section-${ uniqueID }`]: true,
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

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
		cssClasses,
		outerContainer,
		innerContainer,
		spacingTop,
		spacingRight,
		spacingBottom,
		spacingLeft,
		customBackgroundColor,
		customTextColor,
		linkColor,
		linkColorHover,
		bgImage,
		bgOptions
	} = attributes;

	console.log(attributes);

	return (
		<Section
			tagName={ tagName }
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

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

export default ( { attributes, className } ) => {

	const {
		uniqueID,
		tagName,
		cssClasses,
		outerContainer,
		innerContainer,
		backgroundColor,
		customTextColor,
		customBackgroundColor,
		linkColor,
		linkColorHover,
		spacingBottom,
		spacingTop,
		spacingRight,
		spacingLeft,
		bgImage,
		bgOptions
	} = attributes;

	return (
		<Section
			tagName={ tagName }
			className={ classnames( {
				'generate-section': true,
				[`section-${ attributes.uniqueID }`]: true,
				'grid-container grid-parent': 'contained' === attributes.outerContainer,
				'parallax': attributes.bgOptions.parallax,
				[`${ attributes.cssClasses }`]: '' !== attributes.cssClasses
			} ) }
		>
			<div className={ classnames( {
				'inside-section': true,
				'grid-container grid-parent': 'contained' === attributes.innerContainer
			} ) }>
				<InnerBlocks.Content />
			</div>
		</Section>
	);
}

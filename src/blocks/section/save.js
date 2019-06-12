/**
 * Block: Section
 */

import Section from './section-tag';
import classnames from 'classnames';

const {
	InnerBlocks
} = wp.blockEditor;

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
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
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
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<div className={ classnames( {
				'inside-section': true
			} ) }>
				<InnerBlocks.Content />
			</div>
		</Section>
	);
}

/**
 * Block: Container
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
		isGrid,
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

	const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

	return (
		<ConditionalWrap
			condition={ isGrid }
			wrap={ children => <div className={ classnames( {
				'fx-grid-column': true,
				[`fx-grid-column-${ uniqueId }`]: true
			} ) }>{ children }</div>}
		>
			<Section
				tagName={ tagName }
				id={ elementId }
				className={ classnames( {
					'fx-container': true,
					[`fx-container-${ uniqueId }`]: true,
					[`${ cssClasses }`]: '' !== cssClasses
				} ) }
			>
				<div className={ classnames( {
					'fx-inside-container': true
				} ) }>
					<InnerBlocks.Content />
				</div>
			</Section>
		</ConditionalWrap>
	);
}

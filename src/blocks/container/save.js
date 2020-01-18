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
				'gb-grid-column': true,
				[`gb-grid-column-${ uniqueId }`]: true
			} ) }>{ children }</div>}
		>
			<Section
				tagName={ tagName }
				id={ elementId }
				className={ classnames( {
					'gb-container': true,
					[`gb-container-${ uniqueId }`]: true,
					[`${ cssClasses }`]: '' !== cssClasses
				} ) }
			>
				<div className={ classnames( {
					'gb-inside-container': true
				} ) }>
					<InnerBlocks.Content />
				</div>
			</Section>
		</ConditionalWrap>
	);
}

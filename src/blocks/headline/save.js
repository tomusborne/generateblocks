/**
 * Block: Headline
 */

import classnames from 'classnames';

const {
	RichText
} = wp.blockEditor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		elementId,
		cssClasses,
		element,
		content,
		icon,
	} = attributes;

	const sanitizeSVG = ( svg ) => {
		return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
	}

	const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

	return (
		<ConditionalWrap
			condition={ icon }
			wrap={ children => <div className={ classnames( {
				'gb-headline-wrapper': true,
				[`gb-headline-wrapper-${ uniqueId }`]: true,
			} ) }>{ children }</div>}
		>
			{ icon &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}

			<RichText.Content
				tagName={ element }
				id={ !! elementId ? elementId : undefined }
				className={ classnames( {
					'gb-headline': true,
					[`gb-headline-${ uniqueId }`]: true,
					[`${ cssClasses }`]: '' !== cssClasses
				} ) }
				value={ content }
			/>
		</ConditionalWrap>
	);
}

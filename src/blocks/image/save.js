import classnames from 'classnames';
import Element from '../../components/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { removeEmpty } from '../query-loop/components/utils';
import AnchorTag from './components/AnchorTag';

export default ( { attributes } ) => {
	const {
		uniqueId,
		mediaUrl,
		anchor,
		alt,
		title,
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
		useDynamicData,
		dynamicContentType,
		className,
		align,
	} = attributes;

	if ( useDynamicData && dynamicContentType ) {
		return <InnerBlocks.Content />;
	}

	if ( ! mediaUrl ) {
		return null;
	}

	const figureAttributes = useBlockProps.save( {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
	} );

	// We don't want our className appearing in the figure.
	if ( figureAttributes?.className.includes( className ) ) {
		figureAttributes.className = figureAttributes.className.replace( className, '' ).trim();
	}

	const htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		{
			className: classnames( {
				'gb-image': true,
				[ `gb-image-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
				[ `align${ align }` ]: '' !== align,
			} ),
			id: anchor ? anchor : null,
			src: mediaUrl,
			alt,
			title,
		},
		'generateblocks/image',
		attributes
	);

	const imageAttributes = removeEmpty( htmlAttributes );

	const anchorAttributes = {
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
	};

	return (
		<Element tagName="figure" htmlAttrs={ figureAttributes }>
			<AnchorTag { ...anchorAttributes }>
				<Element tagName="img" htmlAttrs={ imageAttributes } />
			</AnchorTag>

			<InnerBlocks.Content />
		</Element>
	);
};

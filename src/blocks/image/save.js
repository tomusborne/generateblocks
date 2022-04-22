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
		isDynamicContent,
		width,
		height,
		contentType,
	} = attributes;

	if ( isDynamicContent && contentType ) {
		return <InnerBlocks.Content />;
	}

	if ( ! mediaUrl ) {
		return null;
	}

	const figureAttrs = {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
	};

	const htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		{
			className: classnames( {
				'gb-image': true,
				[ `gb-image-${ uniqueId }` ]: true,
			} ),
			id: anchor ? anchor : null,
			width,
			height,
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
		<Element tagName="figure" htmlAttrs={ figureAttrs }>
			<AnchorTag { ...anchorAttributes }>
				<Element tagName="img" htmlAttrs={ useBlockProps.save( imageAttributes ) } />
			</AnchorTag>

			<InnerBlocks.Content />
		</Element>
	);
};

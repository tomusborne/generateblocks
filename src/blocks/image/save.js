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
	} = attributes;

	if ( isDynamicContent || ! mediaUrl ) {
		return <InnerBlocks.Content />;
	}

	let htmlAttributes = {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/image',
		attributes
	);

	const blockProps = useBlockProps.save( htmlAttributes );

	const imageAttributes = removeEmpty( {
		width,
		height,
		src: mediaUrl,
		alt,
		title,
		className: `gb-image-${ uniqueId }`,
	} );

	const anchorAttributes = {
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
	};

	return (
		<Element tagName="figure" htmlAttrs={ blockProps }>
			<AnchorTag { ...anchorAttributes }>
				<Element tagName="img" htmlAttrs={ imageAttributes } />
			</AnchorTag>

			<InnerBlocks.Content />
		</Element>
	);
};

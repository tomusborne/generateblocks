import classnames from 'classnames';
import Element from '../../components/element';
import { useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { removeEmpty } from '../post-template/utils';
import AnchorTag from './components/AnchorTag';

export default ( { attributes } ) => {
	const {
		uniqueId,
		url,
		anchor,
		alt,
		title,
		caption,
		href,
		target,
		relNoFollow,
		relSponsored,
		isDynamicContent,
	} = attributes;

	if ( isDynamicContent || ! url ) {
		return undefined;
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
		src: url,
		alt,
		title,
		className: `gb-image-${ uniqueId }`,
	} );

	const anchorAttributes = {
		href,
		target,
		relNoFollow,
		relSponsored,
	};

	return (
		<Element tagName="figure" htmlAttrs={ blockProps }>
			<AnchorTag { ...anchorAttributes }>
				<Element tagName="img" htmlAttrs={ imageAttributes } />
			</AnchorTag>

			{ !! caption && <Element tagName={ 'figcaption' }>{ caption }</Element> }
		</Element>
	);
};

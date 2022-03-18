import classnames from 'classnames';
import Element from '../../components/element';
import { useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { removeEmpty } from '../post-template/utils';

export default ( { attributes } ) => {
	const {
		uniqueId,
		url,
		anchor,
		alt,
		title,
		caption,
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

	return (
		<Element tagName="figure" htmlAttrs={ blockProps }>
			<Element tagName="img" htmlAttrs={ imageAttributes } />
			{ !! caption && <Element tagName={ 'figcaption' }>{ caption }</Element> }
		</Element>
	);
};

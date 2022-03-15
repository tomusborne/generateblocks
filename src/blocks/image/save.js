import classnames from 'classnames';
import Element from '../../components/element';
import { useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

export default ( { attributes } ) => {
	const {
		uniqueId,
		url,
		anchor,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-image': true,
			[ `gb-image-${ uniqueId }` ]: true,
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

	return (
		<Element tagName="figure" htmlAttrs={ blockProps }>
			<img src={ url } alt="" />
		</Element>
	);
};

import classnames from 'classnames';
import Element from '../../components/element';
import { useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

export default ( { attributes } ) => {
	const {
		uniqueId,
		url,
		anchor,
		alt,
		title,
	} = attributes;

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

	return (
		<Element tagName="figure" htmlAttrs={ blockProps }>
			<img
				src={ url }
				alt={ alt }
				className={ `gb-image-${ uniqueId }` }
				title={ title }
			/>
		</Element>
	);
};

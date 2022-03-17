import ImagePlaceholder from './ImagePlaceholder';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import RootElement from '../../../components/root-element';
import Element from '../../../components/element';

export default function ImageContentRenderer( props ) {
	const {
		attributes,
		name,
		clientId,
		media,
	} = props;

	const { uniqueId, isDynamicContent, anchor, alt } = attributes;
	const imageUrl = isDynamicContent ? media?.source_url : attributes.url;
	const altText = isDynamicContent ? media?.alt_text : attributes.alt;

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

	const blockProps = useBlockProps( htmlAttributes );

	return (
		<RootElement name={ name } clientId={ clientId }>
			<Element tagName="figure" htmlAttrs={ blockProps }>
				{ ( !! imageUrl )
					? <img src={ imageUrl } alt={ altText } className={ `gb-image-${ uniqueId }` } />
					: <ImagePlaceholder { ...props } />
				}
			</Element>
		</RootElement>
	);
}

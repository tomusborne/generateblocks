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

	const { uniqueId, anchor } = attributes;
	const imageUrl = attributes.isDynamicContent ? media?.source_url : attributes.url;

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
					? <img src={ imageUrl } className={ `gb-image-${ uniqueId }` } alt="" />
					: <ImagePlaceholder { ...props } />
				}
			</Element>
		</RootElement>
	);
}

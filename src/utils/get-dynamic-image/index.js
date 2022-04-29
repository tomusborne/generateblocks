import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( props ) => {
	const {
		attributes,
		featuredImage,
	} = props;

	const {
		dynamicImage,
		useDynamicData,
		dynamicContentType,
		bgImageSize,
	} = attributes;

	return useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		if (
			( 'featured-image' === dynamicContentType && !! featuredImage ) ||
			! isNaN( parseInt( dynamicImage ) )
		) {
			const mediaId = 'featured-image' === dynamicContentType && !! featuredImage
				? featuredImage
				: parseInt( dynamicImage );

			return getMedia( mediaId, { context: 'view' } );
		}

		return dynamicImage;
	}, [ useDynamicData, dynamicImage, bgImageSize, featuredImage, dynamicContentType ] );
};

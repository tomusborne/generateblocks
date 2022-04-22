import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( props ) => {
	const {
		attributes,
		featuredImage,
	} = props;

	const {
		dynamicImage,
		isDynamicContent,
		contentType,
		bgImageSize,
	} = attributes;

	return useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		if (
			( 'featured-image' === contentType && !! featuredImage ) ||
			! isNaN( parseInt( dynamicImage ) )
		) {
			const mediaId = 'featured-image' === contentType ? featuredImage : parseInt( dynamicImage );

			return getMedia( mediaId, { context: 'view' } );
		}

		return dynamicImage;
	}, [ isDynamicContent, dynamicImage, bgImageSize, featuredImage, contentType ] );
};

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( props ) => {
	const {
		attributes,
	} = props;

	const {
		dynamicImage,
		isDynamicContent,
		bgImageSize,
	} = attributes;

	return useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		if ( ! isNaN( parseInt( dynamicImage ) ) ) {
			return getMedia( parseInt( dynamicImage ), { context: 'view' } );
		}

		return dynamicImage;
	}, [ isDynamicContent, dynamicImage, bgImageSize ] );
};

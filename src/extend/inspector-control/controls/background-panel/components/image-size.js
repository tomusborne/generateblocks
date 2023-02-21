import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function ImageSize( { value, onChange } ) {
	const bgImageSizes = [];

	Object.keys( generateBlocksInfo.imageSizes ).forEach( ( size ) => {
		bgImageSizes.push( {
			label: generateBlocksInfo.imageSizes[ size ],
			value: generateBlocksInfo.imageSizes[ size ],
		} );
	} );

	return (
		<SelectControl
			label={ __( 'Image Size', 'generateblocks' ) }
			value={ value }
			options={ bgImageSizes }
			onChange={ onChange }
		/>
	);
}

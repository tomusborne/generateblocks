import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import getAttribute from '../../../utils/get-attribute';
import typographyOptions from '../../../extend/inspector-control/controls/typography/options';
import getDeviceType from '../../../utils/get-device-type';
import AlignmentMatrixControl from '../../../extend/block-controls/controls/alignment-matrix-control';

export default ( { attributes, setAttributes } ) => {
	const deviceType = getDeviceType();
	const {
		display,
		displayTablet,
		displayMobile,
		flexDirection,
		flexDirectionTablet,
		flexDirectionMobile,
		alignItems,
		alignItemsTablet,
		alignItemsMobile,
		justifyContent,
		justifyContentTablet,
		justifyContentMobile,
	} = attributes;

	return (
		<BlockControls group="block">
			<AlignmentToolbar
				value={ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType } ) }
				onChange={ ( value ) => {
					setAttributes( {
						typography: {
							[ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType }, true ) ]: value,
						},
					} );
				} }
				alignmentControls={ typographyOptions.alignments }
			/>

			<AlignmentMatrixControl
				attributes={ {
					display,
					displayTablet,
					displayMobile,
					flexDirection,
					flexDirectionTablet,
					flexDirectionMobile,
					alignItems,
					alignItemsTablet,
					alignItemsMobile,
					justifyContent,
					justifyContentTablet,
					justifyContentMobile,
				} }
				setAttributes={ setAttributes }
			/>
		</BlockControls>
	);
};

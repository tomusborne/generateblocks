import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import getAttribute from '../../../utils/get-attribute';
import typographyOptions from '../../../extend/inspector-control/controls/typography/options';
import isFlexItem from '../../../utils/is-flex-item';
import getDeviceType from '../../../utils/get-device-type';

export default ( { attributes, setAttributes } ) => {
	const deviceType = getDeviceType();
	const {
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	return (
		<BlockControls>
			{ ! isFlexItem( { device: deviceType, display, displayTablet, displayMobile } ) &&
				<AlignmentToolbar
					value={ getAttribute( 'alignment', { attributes, deviceType } ) }
					onChange={ ( value ) => {
						setAttributes( {
							[ getAttribute( 'alignment', { attributes, deviceType }, true ) ]: value,
						} );
					} }
					alignmentControls={ typographyOptions.alignments }
				/>
			}
		</BlockControls>
	);
};

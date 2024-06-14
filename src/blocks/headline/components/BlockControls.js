import ToolbarGroup from './ToolbarGroup';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import isFlexItem from '../../../utils/is-flex-item';
import getAttribute from '../../../utils/get-attribute';
import typographyOptions from '../../../extend/inspector-control/controls/typography/options';
import getDeviceType from '../../../utils/get-device-type';

export default function HeadlineBlockControls( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		element,
		isCaption,
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	const device = getDeviceType();

	return (
		<BlockControls>
			<ToolbarGroup
				setAttributes={ setAttributes }
				element={ element }
				isCaption={ isCaption }
			/>

			{ ! isFlexItem( { device, display, displayTablet, displayMobile } ) &&
				<>
					<AlignmentToolbar
						value={ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType: device } ) }
						onChange={ ( value ) => {
							setAttributes( {
								typography: {
									[ getAttribute( 'textAlign', { attributes: attributes.typography, deviceType: device }, true ) ]: value,
								},
							} );
						} }
						alignmentControls={ typographyOptions.alignments }
					/>
				</>
			}
		</BlockControls>
	);
}

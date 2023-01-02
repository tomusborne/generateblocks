import ToolbarGroup from './ToolbarGroup';
import { memo } from '@wordpress/element';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import isFlexItem from '../../../utils/is-flex-item';
import getAttribute from '../../../utils/get-attribute';
import typographyOptions from '../../../extend/inspector-control/controls/typography/options';
import getDeviceType from '../../../utils/get-device-type';

function HeadlineBlockControls( props ) {
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
						value={ getAttribute( 'alignment', { attributes, deviceType: device } ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'alignment', { attributes, deviceType: device }, true ) ]: value,
							} );
						} }
						alignmentControls={ typographyOptions.alignments }
					/>
				</>
			}
		</BlockControls>
	);
}

export default memo( HeadlineBlockControls, ( prevProps, nextProps ) => {
	return [
		'element',
		'alignment',
		'alignmentTablet',
		'alignmentMobile',
		'display',
		'displayTablet',
		'displayMobile',
	].every( ( key ) => {
		return prevProps.attributes[ key ] === nextProps.attributes[ key ];
	} ) && prevProps.deviceType === nextProps.deviceType;
} );

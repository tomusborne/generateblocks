import ToolbarGroup from './ToolbarGroup';
import { memo } from '@wordpress/element';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { useDeviceType } from '../../../hooks';
import isFlexItem from '../../../utils/is-flex-item';

function HeadlineBlockControls( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		element,
		alignment,
		alignmentTablet,
		alignmentMobile,
		isCaption,
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	const [ device ] = useDeviceType();

	return (
		<BlockControls>
			<ToolbarGroup
				setAttributes={ setAttributes }
				element={ element }
				isCaption={ isCaption }
			/>

			{ ! isFlexItem( { device, display, displayTablet, displayMobile } ) &&
				<>
					{ 'Desktop' === device &&
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( value ) => {
								setAttributes( { alignment: value } );
							} }
						/>
					}

					{ 'Tablet' === device &&
						<AlignmentToolbar
							value={ alignmentTablet }
							onChange={ ( value ) => {
								setAttributes( { alignmentTablet: value } );
							} }
						/>
					}

					{ 'Mobile' === device &&
						<AlignmentToolbar
							value={ alignmentMobile }
							onChange={ ( value ) => {
								setAttributes( { alignmentMobile: value } );
							} }
						/>
					}
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

import ToolbarGroup from './ToolbarGroup';
import { memo } from '@wordpress/element';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

function HeadlineBlockControls( props ) {
	const {
		attributes,
		setAttributes,
		deviceType,
	} = props;

	const {
		element,
		alignment,
		alignmentTablet,
		alignmentMobile,
		inlineWidth,
		inlineWidthTablet,
		inlineWidthMobile,
		isCaption,
	} = attributes;

	return (
		<BlockControls>
			<ToolbarGroup
				setAttributes={ setAttributes }
				element={ element }
				isCaption={ isCaption }
			/>

			{ 'Desktop' === deviceType && ! inlineWidth &&
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) => {
						setAttributes( { alignment: value } );
					} }
				/>
			}

			{ 'Tablet' === deviceType && ! inlineWidthTablet &&
				<AlignmentToolbar
					value={ alignmentTablet }
					onChange={ ( value ) => {
						setAttributes( { alignmentTablet: value } );
					} }
				/>
			}

			{ 'Mobile' === deviceType && ! inlineWidthMobile &&
				<AlignmentToolbar
					value={ alignmentMobile }
					onChange={ ( value ) => {
						setAttributes( { alignmentMobile: value } );
					} }
				/>
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
		'inlineWidth',
		'inlineWidthTablet',
		'inlineWidthMobile',
	].every( ( key ) => {
		return prevProps.attributes[ key ] === nextProps.attributes[ key ];
	} ) && prevProps.deviceType === nextProps.deviceType;
} );

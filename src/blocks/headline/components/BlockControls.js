import ToolbarGroup from './ToolbarGroup';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

export default ( props ) => {
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
	} = attributes;

	return (
		<BlockControls>
			<ToolbarGroup setAttributes={ setAttributes } element={ element } />

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
};

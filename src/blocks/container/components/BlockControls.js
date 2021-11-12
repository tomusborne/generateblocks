import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

export default ( { attributes, setAttributes, deviceType } ) => {
	const {
		alignment,
		alignmentTablet,
		alignmentMobile,
	} = attributes;

	return (
		<BlockControls>
			{ 'Desktop' === deviceType && (
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) => {
						setAttributes( { alignment: value } );
					} }
				/>
			) }

			{ 'Tablet' === deviceType && (
				<AlignmentToolbar
					value={ alignmentTablet }
					onChange={ ( value ) => {
						setAttributes( { alignmentTablet: value } );
					} }
				/>
			) }

			{ 'Mobile' === deviceType && (
				<AlignmentToolbar
					value={ alignmentMobile }
					onChange={ ( value ) => {
						setAttributes( { alignmentMobile: value } );
					} }
				/>
			) }
		</BlockControls>
	);
};

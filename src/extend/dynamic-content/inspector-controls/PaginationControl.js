import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function PaginationControl( { endSize, midSize, setAttributes, isActive = false } ) {
	return isActive && (
		<>
			<TextControl
				label={ __( 'End Size', 'generateblocks' ) }
				help={ __( 'How many page numbers should show on the start and the end list edges.', 'generateblocks' ) }
				value={ endSize }
				onChange={ ( value ) => setAttributes( { paginationOptions: {
					endSize: value,
				} } ) }
				type="number"
				min="1"
			/>
			<TextControl
				label={ __( 'Mid Size', 'generateblocks' ) }
				help={ __( 'How many page numbers should show on either side of the current pages.', 'generateblocks' ) }
				value={ midSize }
				onChange={ ( value ) => setAttributes( { paginationOptions: {
					midSize: value,
				} } ) }
				type="number"
				min="1"
			/>
		</>
	);
}

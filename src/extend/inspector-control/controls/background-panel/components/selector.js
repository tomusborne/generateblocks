import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export default function Selector( { value, onChange, position, useInnerContainer } ) {
	let help = null;

	if ( ! useInnerContainer && 'pseudo-element' === value ) {
		help = __( 'Note: This image will sit on top of content inside this Container unless the content has its own Container with "Position" set to "Relative" (Layout panel).', 'generateblocks' );

		if ( ! position ) {
			help = __( 'Note: You need to set your "Position" option to "Relative" (Layout panel) or this image will overflow out of this Container.', 'generateblocks' );
		}
	}

	return (
		<SelectControl
			label={ __( 'Selector', 'generateblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Element', 'generateblocks' ), value: 'element' },
				{ label: __( 'Pseudo Element', 'generateblocks' ), value: 'pseudo-element' },
			] }
			onChange={ onChange }
			help={ help }
		/>
	);
}

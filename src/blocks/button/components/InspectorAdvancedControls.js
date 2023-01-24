import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';

export default ( { anchor, ariaLabel, buttonType, setAttributes } ) => {
	return (
		<InspectorAdvancedControls>
			<HTMLAnchor anchor={ anchor } setAttributes={ setAttributes } />

			<TextControl
				label={ __( 'ARIA Label', 'generateblocks' ) }
				help={ __( 'Helpful to people using screen readers.', 'generateblocks' ) }
				value={ ariaLabel }
				onChange={ ( value ) => {
					setAttributes( {
						ariaLabel: value,
					} );
				} }
			/>

			<SelectControl
				label={ __( 'Button type', 'generateblocks' ) }
				value={ buttonType }
				onChange={ ( value ) => setAttributes( { buttonType: value } ) }
				options={ [
					{ value: 'link', label: __( 'Link', 'generateblocks' ) },
					{ value: 'button', label: '<button>' },
				] }
			/>
		</InspectorAdvancedControls>
	);
};

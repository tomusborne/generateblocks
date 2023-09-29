import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { TextControl } from '@wordpress/components';

export default function TermMetaControl( props ) {
	const {
		isActive = false,
		metaFieldName,
		setAttributes,
	} = props;

	const afterComponent = applyFilters(
		'generateblocks.editor.dynamicContent.TermMetaControl.afterComponent',
		undefined,
		props,
	);

	return (
		<>
			{ isActive &&
				<>
					<TextControl
						label={ __( 'Term meta field name', 'generateblocks' ) }
						value={ metaFieldName }
						onChange={ ( value ) => {
							setAttributes( { metaFieldName: value } );
						} }
					/>

					{ afterComponent }
				</>
			}
		</>
	);
}

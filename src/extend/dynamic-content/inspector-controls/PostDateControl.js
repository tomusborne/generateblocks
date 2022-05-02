import { SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function PostDateControl( props ) {
	const { isActive = false, dateType, dateReplacePublished, setAttributes } = props;

	return (
		<>
			{ isActive &&
				<>
					<SelectControl
						label={ __( 'Date type', 'generateblocks' ) }
						value={ dateType }
						options={ [
							{ value: 'published', label: __( 'Published', 'generateblocks' ) },
							{ value: 'updated', label: __( 'Updated', 'generateblocks' ) },
						] }
						onChange={ ( value ) => setAttributes( { dateType: value } ) }
					/>

					{ 'published' === dateType &&
						<ToggleControl
							label={ __( 'Replace with updated date', 'generateblocks' ) }
							checked={ !! dateReplacePublished }
							onChange={ ( value ) => setAttributes( { dateReplacePublished: value } ) }
						/>
					}
				</>
			}
		</>
	);
}

import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import getDeviceType from '../../../utils/get-device-type';

export default function TagName( props ) {
	const {
		onChange,
		tagName,
		isCaption,
	} = props;

	const device = getDeviceType();

	const tagNames = applyFilters(
		'generateblocks.editor.headlineTagNames',
		[
			{ label: 'h1', value: 'h1' },
			{ label: 'h2', value: 'h2' },
			{ label: 'h3', value: 'h3' },
			{ label: 'h4', value: 'h4' },
			{ label: 'h5', value: 'h5' },
			{ label: 'h6', value: 'h6' },
			{ label: 'paragraph', value: 'p' },
			{ label: 'div', value: 'div' },
			{ label: 'figcaption', value: 'figcaption' },
		],
		{ ...props, deviceType: device }
	);

	return (
		<>
			{ 'Desktop' === device && ! isCaption &&
				<SelectControl
					label={ __( 'Tag Name', 'generateblocks' ) }
					value={ tagName }
					options={ tagNames }
					onChange={ onChange }
				/>
			}
		</>
	);
}

import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import getDeviceType from '../../../utils/get-device-type';

export default function TagName( props ) {
	const {
		onChange,
		tagName,
	} = props;

	const device = getDeviceType();

	const tagNames = applyFilters(
		'generateblocks.editor.containerTagNames',
		[
			{ label: 'div', value: 'div' },
			{ label: 'article', value: 'article' },
			{ label: 'section', value: 'section' },
			{ label: 'header', value: 'header' },
			{ label: 'footer', value: 'footer' },
			{ label: 'aside', value: 'aside' },
		],
		{ ...props, deviceType: device }
	);

	return (
		<>
			{ 'Desktop' === device &&
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

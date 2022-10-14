import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useDeviceType } from '../../../hooks';

export default function TagName( props ) {
	const {
		onChange,
		tagName,
	} = props;

	const [ device ] = useDeviceType();

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
		props,
		{ deviceType: device }
	);

	return (
		<>
			<SelectControl
				label={ __( 'Tag Name', 'generateblocks' ) }
				value={ tagName }
				options={ tagNames }
				onChange={ onChange }
			/>
		</>
	);
}

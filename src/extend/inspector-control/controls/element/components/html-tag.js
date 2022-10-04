import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../../block-context';

export default function HtmlTag( { value, onChange } ) {
	const { supports: { htmlTags } } = useContext( ControlsContext );

	return (
		<SelectControl
			label={ __( 'Tag Name', 'generateblocks' ) }
			value={ value }
			options={ htmlTags.tags }
			onChange={ onChange }
		/>
	);
}

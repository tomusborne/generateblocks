import SimpleSelect from '../../../../components/simple-select';
import { __ } from '@wordpress/i18n';

export default function QueryTypeSelect( props ) {
	return (
		<SimpleSelect
			{ ...props }
			label={ __( 'Query type', 'generateblocks' ) }
			help={ __( 'Which type of data the loop will render', 'generateblocks' ) }
			wrapperStyles={ { marginTop: '8px' } }
			options={ [
				{ value: 'postType', label: __( 'Post type', 'generateblocks' ) },
				{ value: 'taxonomy', label: __( 'Taxonomy', 'generateblocks' ) },
			] }
		/>
	);
}

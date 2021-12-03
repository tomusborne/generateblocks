import AdvancedSelect from '../../../../components/advanced-select';
import { __ } from '@wordpress/i18n';
import queryParameterOptions from '../../query-parameters';

export default ( props ) => {
	return (
		<AdvancedSelect
			id={ 'gblocks-select-query-parameters' }
			label={ __( 'Select query parameter', 'generateblocks' ) }
			placeholder={ __( 'Select query parameter', 'generateblocks' ) }
			options={ queryParameterOptions }
			isSearchable
			pageSize={ 20 }
			{ ...props }
		/>
	);
};

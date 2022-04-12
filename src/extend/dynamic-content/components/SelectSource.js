import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = ( contentType ) => {
	const defaultOptions = [
		{ value: 'current-post', label: 'caption' === contentType
			? __( 'Current image', 'generateblocks' )
			: __( 'Current post', 'generateblocks' ) },
		{ value: 'post-type', label: __( 'Post type', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceOptions',
		defaultOptions,
	);
};

export default ( { source, onChange, help, contentType } ) => {
	const options = getOptions( contentType );
	const value = options.filter( ( option ) => ( option.value === source ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-source-control' }
			label={ __( 'Data source', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select source', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

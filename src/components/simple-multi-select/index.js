import AdvancedSelect from '../advanced-select';

function SimpleMultiSelect( props ) {
	const { options, value } = props;

	return (
		<AdvancedSelect
			{ ...props }
			isMulti
			id={ 'gblocks-simple-multi-select' }
			value={ options.filter( ( option ) => ( value.includes( option.value ) ) ) }
		/>
	);
}

export default SimpleMultiSelect;

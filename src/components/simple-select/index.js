import AdvancedSelect from '../advanced-select';

export default ( props ) => {
	const { options, value } = props;
	return (
		<AdvancedSelect
			{ ...props }
			id={ 'gblocks-simple-select' }
			value={ options.filter( ( option ) => ( option.value === value ) ) }
		/>
	);
};

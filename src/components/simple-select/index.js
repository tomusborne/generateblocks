import AdvancedSelect from '../advanced-select';

export default ( { label, help, placeholder, options, value, onChange } ) => {
	return (
		<AdvancedSelect
			id={ 'gblocks-simple-select' }
			label={ label }
			help={ help }
			placeholder={ placeholder }
			options={ options }
			value={ options.filter( ( option ) => ( option.value === value ) ) }
			onChange={ onChange }
		/>
	);
};

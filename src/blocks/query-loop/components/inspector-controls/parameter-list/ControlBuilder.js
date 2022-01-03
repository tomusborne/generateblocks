import { TextControl, ToggleControl } from '@wordpress/components';
import SelectPostType from '../../../../headline/components/dynamic-content/components/SelectPostType';
import SimpleSelect from '../../../../../components/simple-select';
import AuthorsSelect from '../../../../../components/authors-select';
import TaxonomyRecordsSelect from '../../../../../components/taxonomy-records-select';
import RemoveButton from './RemoveButton';
import TaxonomyParameterControl from '../controls/TaxonomyParameterControl';
import PostTypeRecordsSelect from '../../../../../components/post-type-records-select';
import DateTimePicker from '../controls/DateTimePicker';
import TaxonomySelect from '../../../../../components/taxonomy-select';

const getParameterControl = ( parameterType ) => {
	switch ( parameterType ) {
		case 'text':
		case 'number':
			return TextControl;
		case 'postTypeSelect':
			return SelectPostType;
		case 'select':
			return SimpleSelect;
		case 'authorsSelect':
			return AuthorsSelect;
		case 'taxonomyParamSelect':
			return TaxonomyParameterControl;
		case 'postsSelect':
			return PostTypeRecordsSelect;
		case 'dateTimePicker':
			return DateTimePicker;
		case 'toggleControl':
			return ToggleControl;
		case 'taxonomySelect':
			return TaxonomySelect;
		case 'termsSelect':
			return TaxonomyRecordsSelect;
	}
};

export default function ControlBuilder( props ) {
	const {
		id,
		type,
		label,
		description,
		selectOptions = [],
		isSticky,
		value,
		onChange,
		onClickRemove,
		dependencies,
		controlProps,
	} = props;

	const Control = getParameterControl( type );

	return (
		<div className={ 'gblocks-parameter-component' }>
			<Control
				type={ type }
				label={ label }
				help={ description }
				options={ selectOptions }
				value={ value }
				onChange={ onChange }
				{ ...dependencies }
				{ ...controlProps }
			/>
			{ ! isSticky && <RemoveButton id={ id } onClick={ onClickRemove } /> }
		</div>
	);
}

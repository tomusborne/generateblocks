import { ToggleControl } from '@wordpress/components';
import SelectPostType from '../../../../../extend/dynamic-content/components/SelectPostType';
import SimpleSelect from '../../../../../components/simple-select';
import AuthorsSelect from '../../../../../components/authors-select';
import { CategoriesSelect, TagsSelect } from '../../../../../components/taxonomies-select';
import RemoveButton from './RemoveButton';
import TaxonomyParameterControl from '../controls/TaxonomyParameterControl';
import PostTypeRecordsSelect from '../../../../../components/post-type-records-select';
import DateTimePicker from '../controls/DateTimePicker';
import DebouncedTextControl from '../../../../../components/debounced-text-control';

const getParameterControl = ( parameterType ) => {
	switch ( parameterType ) {
		case 'text':
		case 'number':
			return DebouncedTextControl;
		case 'postTypeSelect':
			return SelectPostType;
		case 'select':
			return SimpleSelect;
		case 'authorsSelect':
			return AuthorsSelect;
		case 'categoriesSelect':
			return CategoriesSelect;
		case 'tagsSelect':
			return TagsSelect;
		case 'taxonomySelect':
			return TaxonomyParameterControl;
		case 'postsSelect':
			return PostTypeRecordsSelect;
		case 'dateTimePicker':
			return DateTimePicker;
		case 'toggleControl':
			return ToggleControl;
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
			/>
			{ ! isSticky && <RemoveButton id={ id } onClick={ onClickRemove } /> }
		</div>
	);
}

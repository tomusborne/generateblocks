import { ToggleControl } from '@wordpress/components';
import { sprintf } from '@wordpress/i18n';
import SelectPostType from '../../extend/dynamic-content/components/SelectPostType';
import SimpleSelect from '../simple-select';
import AuthorsSelect from '../authors-select';
import { CategoriesSelect, TagsSelect } from '../taxonomies-select';
import RemoveButton from './parameter-list/RemoveButton';
import TaxonomyParameterControl from './parameter-list/TaxonomyParameterControl';
import PostTypeRecordsSelect from '../post-type-records-select';
import DateTimePicker from './DateTimePicker/DateTimePicker';
import DebouncedTextControl from '../debounced-text-control';
import SimpleMultiSelect from '../simple-multi-select';
import { isArray, isObject } from 'lodash';

const getParameterControl = ( parameterType ) => {
	switch ( parameterType ) {
		case 'text':
		case 'number':
			return DebouncedTextControl;
		case 'postTypeSelect':
			return SelectPostType;
		case 'select':
			return SimpleSelect;
		case 'multiSelect':
			return SimpleMultiSelect;
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
		default: defaultValue,
		onChange,
		onClickRemove,
		dependencies,
		placeholder,
	} = props;

	const Control = getParameterControl( type );
	let controlDescription = description;

	if ( 'per_page' === id && ( '-1' === value || parseInt( value ) > parseInt( generateBlocksInfo.queryLoopEditorPostsCap ) ) ) {
		controlDescription += ' ' + sprintf(
			'Editor only: A maximum of %s posts can be previewed in the editor.',
			generateBlocksInfo.queryLoopEditorPostsCap
		);
	}

	const defaultValuePlaceholder = !! defaultValue && ( ! isArray( defaultValue ) || ! isObject( defaultValue ) )
		? defaultValue
		: undefined;

	const controlPlaceholder = placeholder || defaultValuePlaceholder;

	const isPostsPerPage = 'number' === type && 'posts per page' === label.toLowerCase();

	return (
		<div className={ 'gblocks-parameter-component' }>
			<Control
				id={ id }
				type={ type }
				label={ label }
				help={ controlDescription }
				options={ selectOptions }
				value={ value }
				placeholder={ controlPlaceholder }
				onChange={ onChange }
				min={ isPostsPerPage ? -1 : undefined }
				{ ...dependencies }
			/>
			{ ! isSticky && <RemoveButton id={ id } onClick={ onClickRemove } /> }
		</div>
	);
}

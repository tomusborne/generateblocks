import { TextControl } from '@wordpress/components';
import SelectPostType from '../../../../headline/components/dynamic-content/components/SelectPostType';
import SimpleSelect from '../../../../../components/simple-select';
import AuthorsSelect from '../../../../../components/authors-select';
import { CategoriesSelect, TagsSelect } from '../../../../../components/taxonomies-select';
import RemoveButton from './RemoveButton';
import TaxonomyParameterControl from '../controls/TaxonomyParameterControl';

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
		case 'categoriesSelect':
			return CategoriesSelect;
		case 'tagsSelect':
			return TagsSelect;
		case 'taxonomySelect':
			return TaxonomyParameterControl;
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
			/>
			{ ! isSticky && <RemoveButton id={ id } onClick={ onClickRemove } /> }
		</div>
	);
}

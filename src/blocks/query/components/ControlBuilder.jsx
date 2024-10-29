import { ToggleControl, Button, Tooltip } from '@wordpress/components';
import { sprintf, __ } from '@wordpress/i18n';

import { isArray, isObject } from 'lodash';

import {
	CategoriesSelect,
	TagsSelect,
	SimpleSelect,
	AuthorsSelect,
	PostTypeRecordsSelect,
	DebouncedTextControl,
	SimpleMultiSelect,
} from '@components';
import { SelectPostType } from '../../../dynamic-tags/components/SelectPostType'; // @TODO: Move this to a better location

import TaxonomyParameterControl from '@components/inspector-controls/parameter-list/TaxonomyParameterControl';
import DateTimePicker from '@components/inspector-controls/DateTimePicker/DateTimePicker';

import getIcon from '@utils/get-icon';

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

export function ControlBuilder( props ) {
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

	if ( 'posts_per_page' === id && ( '-1' === value || parseInt( value ) > parseInt( generateBlocksInfo.queryLoopEditorPostsCap ) ) ) {
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
			{ ! isSticky && (
				<Tooltip text={ __( 'Delete parameter', 'generateblocks-pro' ) }>
					<Button
						className="gblocks-remove-parameter"
						onClick={ () => {
							// eslint-disable-next-line
							if ( window.confirm( __( 'This will permanently delete this parameter.', 'generateblocks' ) ) ) {
								onClickRemove( id );
							}
						} }
						icon={ getIcon( 'trash' ) }
					/>
				</Tooltip>
			) }
		</div>
	);
}


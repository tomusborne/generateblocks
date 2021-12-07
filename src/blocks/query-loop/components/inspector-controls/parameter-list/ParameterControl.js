import { Button, TextControl, Tooltip } from '@wordpress/components';
import SelectPostType from '../../../../headline/components/dynamic-content/components/SelectPostType';
import SimpleSelect from '../../../../../components/simple-select';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../../utils/get-icon';
import AuthorsSelect from '../../../../../components/authors-select';
import { CategoriesSelect, TagsSelect } from '../../../../../components/taxonomies-select';

const getParameterComponent = ( parameterType ) => {
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
	}
};

const attributeValueNormalizer = ( attribute, value ) => {
	switch ( attribute ) {
		case 'post_type':
		case 'order':
		case 'orderby':
			return value.value;

		case 'author':
		case 'author_exclude':
		case 'categories':
		case 'categories_exclude':
		case 'tags':
		case 'tags_exclude':
			return value.reduce( ( result, option ) => {
				result.push( option.value );

				return result;
			}, [] );

		default:
			return value;

	}
};

export default ( { parameter, query, setParameter, removeParameter } ) => {
	const Component = getParameterComponent( parameter.type );
	return (
		<div className={ 'gblocks-parameter-component' }>
			<Component
				type={ parameter.type }
				label={ parameter.label }
				help={ parameter.description }
				value={ query[ parameter.id ] }
				options={ parameter?.selectOptions || [] }
				onChange={ ( value ) => {
					setParameter( parameter.id, attributeValueNormalizer( parameter.id, value ) );
				} }
			/>
			{ ! parameter.isSticky &&
				<Tooltip text={ __( 'Delete parameter', 'generateblocks-pro' ) }>
					<Button
						className="gblocks-remove-parameter"
						onClick={ () => {
							// eslint-disable-next-line
							if ( window.confirm( __( 'This will permanently delete this parameter.', 'generateblocks' ) ) ) {
								removeParameter( parameter.id );
							}
						} }
						icon={ getIcon( 'x' ) }
					/>
				</Tooltip>
			}
		</div>
	);
};

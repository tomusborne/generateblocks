import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import AdvancedSelect from '../../advanced-select';
import { withSelect } from '@wordpress/data';

const normalizePostTypes = ( postTypes ) => postTypes
	.filter( ( postType ) => ( postType.viewable ) )
	.reduce( ( result, postType ) => {
		result.push( { value: postType.slug, label: postType.name } );
		return result;
	}, [] );

// Keeping this only for reference for now.
const getOptions = () => {
	const defaultOptions = [
		{ value: 'post', label: __( 'Post', 'generateblocks' ) },
		{ value: 'page', label: __( 'Page', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.postTypeOptions',
		defaultOptions,
	);
};

const SelectPostType = ( { postType, onChange, postTypes } ) => {
	// Options is a good candidate for Pro features, we have access to all registered post_types
	// We can block the list to only default ones for the free version
	const options = normalizePostTypes( postTypes );
	const value = options.filter( ( option ) => ( option.value === postType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post-type' }
			label={ __( 'Source post type', 'generateblocks' ) }
			placeholder={ __( 'Select source post type', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default withSelect( ( select ) => {
	const { getPostTypes } = select( 'core' );

	return {
		postTypes: getPostTypes() || [],
	};
} )( SelectPostType );

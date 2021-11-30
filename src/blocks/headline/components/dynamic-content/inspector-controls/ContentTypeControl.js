import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = () => {
	const defaultOptions = [
		{
			label: __( 'Post', 'generateblocks' ),
			options: [
				{ value: 'post-title', label: __( 'Title', 'generateblocks' ) },
				{ value: 'post-excerpt', label: __( 'Excerpt', 'generateblocks' ) },
				{ value: 'post-date', label: __( 'Post date', 'generateblocks' ) },
				{ value: 'post-meta', label: __( 'Post meta', 'generateblocks' ) },
				{ value: 'comments-number', label: __( 'Comments number', 'generateblocks' ) },
				{ value: 'terms', label: __( 'List of terms', 'generateblocks' ) },
			],
		},
		{
			label: __( 'Author', 'generateblocks' ),
			options: [
				{ value: 'author-meta', label: __( 'Author meta', 'generateblocks' ) },
				{ value: 'author-email', label: __( 'Email', 'generateblocks' ) },
				{ value: 'author-name', label: __( 'Name', 'generateblocks' ) },
				{ value: 'author-nickname', label: __( 'Nickname', 'generateblocks' ) },
				{ value: 'author-first-name', label: __( 'First name', 'generateblocks' ) },
				{ value: 'author-last-name', label: __( 'Last name', 'generateblocks' ) },
			],
		},
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceTypes',
		defaultOptions,
	);
};

export default ( { contentType, onChange } ) => {
	const options = getOptions();
	const value = options
		.reduce( ( result, group ) => result.concat( group.options ), [] )
		.filter( ( option ) => ( option.value === contentType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-content-type-control' }
			label={ __( 'Content type', 'generateblocks' ) }
			placeholder={ __( 'Content type', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = ( name ) => {
	const defaultOptions = [
		{
			options: [
				{ value: '', label: __( 'Select…', 'generateblocks' ) },
			],
		},
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

	if ( 'generateblocks/button' === name ) {
		defaultOptions.push(
			{
				label: __( 'Pagination', 'generateblocks' ),
				options: [
					{ value: 'pagination-numbers', label: __( 'Pagination numbers', 'generateblocks' ) },
				],
			},
		);
	}

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceTypes',
		defaultOptions,
	);
};

export default ( { contentType, setAttributes, name } ) => {
	const options = getOptions( name );
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
			onChange={ ( option ) => {
				setAttributes( {
					contentType: option.value,
					metaFieldName: '',
				} );

				if ( 'comments-number' === option.value ) {
					setAttributes( {
						noCommentsText: __( 'No comments', 'generateblocks' ),
						singleCommentText: __( '1 comment', 'generateblocks' ),
						// translators: Number of comments.
						multipleCommentsText: __( '% comments', 'generateblocks' ),
					} );
				} else {
					setAttributes( {
						noCommentsText: '',
						singleCommentText: '',
						multipleCommentsText: '',
					} );
				}
			} }
		/>
	);
};

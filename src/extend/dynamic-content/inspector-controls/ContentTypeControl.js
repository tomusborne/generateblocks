import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = ( name, isCaption ) => {
	let defaultOptions = [
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

	if ( 'generateblocks/container' === name || 'generateblocks/image' === name ) {
		defaultOptions = [
			{
				options: [
					{ value: '', label: __( 'Select…', 'generateblocks' ) },
				],
			},
			{
				label: __( 'Post', 'generateblocks' ),
				options: [
					{ value: 'featured-image', label: __( 'Featured Image', 'generateblocks' ) },
					{ value: 'post-meta', label: __( 'Post meta', 'generateblocks' ) },
				],
			},
			{
				label: __( 'Author', 'generateblocks' ),
				options: [
					{ value: 'author-avatar', label: __( 'Author avatar', 'generateblocks' ) },
				],
			},
		];
	}

	if ( isCaption ) {
		defaultOptions = [
			{
				options: [
					{ value: '', label: __( 'Select…', 'generateblocks' ) },
				],
			},
			{
				label: __( 'Image', 'generateblocks' ),
				options: [
					{ value: 'caption', label: __( 'Caption', 'generateblocks' ) },
					{ value: 'post-title', label: __( 'Title', 'generateblocks' ) },
					{ value: 'alt-text', label: __( 'Alt text', 'generateblocks' ) },
					{ value: 'image-description', label: __( 'Description', 'generateblocks' ) },
				],
			},
		];
	}

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceTypes',
		defaultOptions,
		name,
	);
};

export default ( { dynamicContentType, setAttributes, name, isCaption } ) => {
	const options = getOptions( name, isCaption );
	const value = options
		.reduce( ( result, group ) => result.concat( group.options ), [] )
		.filter( ( option ) => ( option.value === dynamicContentType ) );

	let label = __( 'Content source', 'generateblocks' );

	if ( 'generateblocks/container' === name ) {
		label = __( 'Background image source', 'generateblocks' );
	}

	if ( 'generateblocks/image' === name ) {
		label = __( 'Image source', 'generateblocks' );
	}

	return (
		<AdvancedSelect
			id={ 'gblocks-select-content-type-control' }
			label={ label }
			placeholder={ label }
			options={ options }
			value={ value }
			onChange={ ( option ) => {
				setAttributes( {
					dynamicContentType: option.value,
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

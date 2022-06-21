import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';

const getOptions = ( dynamicContentType, isPagination = false, name ) => {
	let defaultOptions = [
		{
			options: [
				{ value: '', label: __( 'Select…', 'generateblocks' ) },
			],
		},
		{
			label: __( 'Post', 'generateblocks' ),
			options: [
				{ value: 'single-post', label: __( 'Single post', 'generateblocks' ) },
				{ value: 'comments-area', label: __( 'Comments area', 'generateblocks' ) },
				{ value: 'post-meta', label: __( 'Post meta', 'generateblocks' ) },
			],
		},
		{
			label: __( 'Author', 'generateblocks' ),
			options: [
				{ value: 'author-archives', label: __( 'Author archives', 'generateblocks' ) },
				{ value: 'author-meta', label: __( 'Author meta', 'generateblocks' ) },
				{ value: 'author-email', label: __( 'Author email', 'generateblocks' ) },
			],
		},
	];

	if ( 'terms' === dynamicContentType ) {
		defaultOptions = [
			{
				options: [
					{ value: '', label: __( 'Select…', 'generateblocks' ) },
				],
			},
			{
				label: __( 'Terms', 'generateblocks' ),
				options: [
					{ value: 'term-archives', label: __( 'Term archives', 'generateblocks' ) },
				],
			},
		];
	}

	if ( isPagination ) {
		defaultOptions = [
			{
				options: [
					{ value: '', label: __( 'Select…', 'generateblocks' ) },
				],
			},
			{
				label: __( 'Pagination', 'generateblocks' ),
				options: [
					{ value: 'pagination-prev', label: __( 'Previous page', 'generateblocks' ) },
					{ value: 'pagination-next', label: __( 'Next page', 'generateblocks' ) },
				],
			},
		];

		if ( 'pagination-numbers' === dynamicContentType ) {
			defaultOptions = [];
		}
	}

	if ( 'generateblocks/image' === name ) {
		defaultOptions.splice( 1, 0, {
			label: __( 'Image', 'generateblocks' ),
			options: [
				{ value: 'single-image', label: __( 'Single image', 'generateblocks' ) },
			],
		} );
	}

	return applyFilters(
		'generateblocks.editor.dynamicContent.linkTypes',
		defaultOptions,
		dynamicContentType
	);
};

const getMetaLinkTypes = applyFilters(
	'generateblocks.editor.dynamicContent.linkPrependOptions',
	[
		{
			label: __( 'Default', 'generateblocks' ),
			value: '',
		},
		{
			label: __( 'Email', 'generateblocks' ),
			value: 'mailto:',
		},
		{
			label: __( 'Telephone', 'generateblocks' ),
			value: 'tel:',
		},
	]
);

export default ( {
	linkType,
	linkMetaFieldName,
	linkMetaFieldType,
	dynamicContentType,
	setAttributes,
	isPagination,
	isActive,
	name,
	dynamicLinkRemoveIfEmpty,
} ) => {
	const options = getOptions( dynamicContentType, isPagination, name );

	if ( options.length === 0 ) {
		return null;
	}

	const value = options
		.reduce( ( result, group ) => result.concat( group.options ), [] )
		.filter( ( option ) => ( option.value === linkType ) );

	const isMeta = 'post-meta' === linkType || 'author-meta' === linkType;

	return (
		<>
			{ isActive &&
				<>
					<AdvancedSelect
						id={ 'gblocks-select-link-type-control' }
						label={ __( 'Link source', 'generateblocks' ) }
						placeholder={ __( 'Link source', 'generateblocks' ) }
						options={ options }
						value={ value }
						onChange={ ( option ) => setAttributes( { dynamicLinkType: option.value } ) }
					/>

					{ isMeta &&
						<TextControl
							label={ __( 'Meta field name', 'generateblocks' ) }
							value={ linkMetaFieldName }
							onChange={ ( newValue ) => setAttributes( { linkMetaFieldName: newValue } ) }
						/>
					}

					{ (
						'author-email' === linkType ||
						( isMeta && !! linkMetaFieldName )
					) &&
						<SelectControl
							label={ __( 'Link type', 'generateblocks' ) }
							value={ linkMetaFieldType }
							onChange={ ( newValue ) => setAttributes( { linkMetaFieldType: newValue } ) }
							options={ getMetaLinkTypes }
						/>
					}

					{ !! linkType &&
						<ToggleControl
							label={ __( 'Remove block if link is empty', 'generateblocks' ) }
							checked={ !! dynamicLinkRemoveIfEmpty }
							onChange={ ( newValue ) => setAttributes( { dynamicLinkRemoveIfEmpty: newValue } ) }
						/>
					}
				</>
			}
		</>
	);
};

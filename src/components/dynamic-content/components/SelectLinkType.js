import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = ( contentType ) => {
	let defaultOptions = [
		{ value: '', label: __( 'Select…', 'generateblocks' ) },
		{ value: 'single-post', label: __( 'Single post', 'generateblocks' ) },
		{ value: 'author-archives', label: __( 'Author archives', 'generateblocks' ) },
		{ value: 'comments-area', label: __( 'Comments area', 'generateblocks' ) },
		{ value: 'post-meta', label: __( 'Post meta', 'generateblocks' ) },
	];

	if ( 'terms' === contentType ) {
		defaultOptions = [
			{ value: '', label: __( 'Select…', 'generateblocks' ) },
			{ value: 'term-archives', label: __( 'Term archives', 'generateblocks' ) },
		];
	}

	return applyFilters(
		'generateblocks.editor.dynamicContent.linkTypes',
		defaultOptions,
		contentType
	);
};

export default ( { linkType, contentType, onChange } ) => {
	const options = getOptions( contentType );
	const value = options.filter( ( option ) => ( option.value === linkType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-link-type-control' }
			label={ __( 'Link type', 'generateblocks' ) }
			placeholder={ __( 'Link type', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

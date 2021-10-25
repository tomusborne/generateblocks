import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = () => {
	const defaultOptions = [
		{ value: '', label: __( 'Select…', 'generateblocks' ) },
		{ value: 'title', label: __( 'Title', 'generateblocks' ) },
		{ value: 'post-date', label: __( 'Post date', 'generateblocks' ) },
		{ value: 'post-author', label: __( 'Post author', 'generateblocks' ) },
		{ value: 'comments-number', label: __( 'Comments number', 'generateblocks' ) },
		{ value: 'terms', label: __( 'List of terms', 'generateblocks' ) },
		{ value: 'post-meta', label: __( 'Post meta', 'generateblocks' ) },
		{ value: 'term-meta', label: __( 'Term meta', 'generateblocks' ) },
		{ value: 'author-meta', label: __( 'Author meta', 'generateblocks' ) },
	];

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceTypes',
		defaultOptions,
	);
};

export default ( { contentType, onChange } ) => {
	const options = getOptions();
	const value = options.filter( ( option ) => ( option.value === contentType ) );

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

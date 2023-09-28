import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../components/advanced-select';
import { applyFilters } from '@wordpress/hooks';

const getOptions = ( dynamicContentType, isInQueryLoop, blockName ) => {
	const currentPostLabel = 'caption' === dynamicContentType
		? __( 'Current image', 'generateblocks' )
		: __( 'Current post', 'generateblocks' );

	const defaultOptions = [
		{ value: 'current-post', label: currentPostLabel },
		{ value: 'post-type', label: __( 'Post type', 'generateblocks' ) },
	];

	if ( ! isInQueryLoop && 'generateblocks/image' !== blockName ) {
		defaultOptions.push( {
			value: 'next-post',
			label: __( 'Next post', 'generateblocks' ),
		} );
		defaultOptions.push( {
			value: 'previous-post',
			label: __( 'Previous post', 'generateblocks' ),
		} );
	}

	return applyFilters(
		'generateblocks.editor.dynamicContent.sourceOptions',
		defaultOptions,
	);
};

export default ( { source, onChange, help, dynamicContentType, isInQueryLoop, blockName } ) => {
	const options = getOptions( dynamicContentType, isInQueryLoop, blockName );
	const value = options.filter( ( option ) => ( option.value === source ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-source-control' }
			label={ __( 'Data source', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select source', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

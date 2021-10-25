import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../advanced-select';
import { withSelect, getSelectors } from '@wordpress/data';

const normalizePostMetadata = ( postMetadata ) => Object
	.keys( postMetadata )
	.map( ( meta ) => ( { value: meta, label: meta } ) );

const SelectPostMetaField = ( { postId, onChange, postMeta } ) => {
	const options = normalizePostMetadata( postMeta );
	const value = options.filter( ( option ) => ( option.value === postId ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post-metadata' }
			label={ __( 'Post metadata name', 'generateblocks' ) }
			placeholder={ __( 'Post metadata name', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecord } = select( 'core' );

	const postObject = getEntityRecord( 'postType', ownProps.postType, ownProps.postId ) || {};
	const postMeta = postObject.meta || {};

	return {
		postMeta,
	};
} )( SelectPostMetaField );

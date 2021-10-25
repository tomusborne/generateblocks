import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../advanced-select';
import { withSelect } from '@wordpress/data';

const normalizePostTypes = ( posts ) => posts.map( ( post ) => ( { value: post.id, label: post.title.raw } ) );

const SelectPosts = ( { postId, onChange, posts } ) => {
	const options = normalizePostTypes( posts );
	const value = options.filter( ( option ) => ( option.value === postId ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-posts' }
			label={ __( 'Source post', 'generateblocks' ) }
			placeholder={ __( 'Select posts', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default withSelect( ( select, ownProps ) => {
	const { getEntityRecords } = select( 'core' );

	return {
		posts: getEntityRecords( 'postType', ownProps.postType, { per_page: -1 } ) || [],
	};
} )( SelectPosts );

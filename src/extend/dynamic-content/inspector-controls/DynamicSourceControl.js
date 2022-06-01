import { __ } from '@wordpress/i18n';
import SelectPostType from '../components/SelectPostType';
import PostTypeRecordsSelect from '../../../components/post-type-records-select';
import SelectSource from '../components/SelectSource';

export default ( { dynamicSource, postType, postId, setAttributes, dynamicContentType } ) => {
	return (
		<>
			<SelectSource
				source={ dynamicSource }
				onChange={ ( option ) => {
					setAttributes( {
						dynamicSource: option.value,
						postId: '',
						postType: 'post',
					} );
				} }
				dynamicContentType={ dynamicContentType }
			/>

			{ dynamicSource === 'post-type' &&
				<>
					<SelectPostType
						postType={ postType }
						onChange={ ( option ) => {
							setAttributes( { postType: option.value, postId: '' } );
						} }
					/>

					<PostTypeRecordsSelect
						postId={ postId }
						postType={ postType }
						value={ [ postId ] }
						id={ 'gblocks-select-post' }
						label={ __( 'Select source post', 'generateblocks' ) }
						onChange={ ( option ) => {
							setAttributes( { postId: option.value } );
						} }
						isMulti={ false }
					/>
				</>
			}
		</>
	);
};

import SelectPostType from '../components/SelectPostType';
import SelectPost from '../components/SelectPost';
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

					<SelectPost
						postId={ postId }
						postType={ postType }
						onChange={ ( option ) => {
							setAttributes( { postId: option.value } );
						} }
					/>
				</>
			}
		</>
	);
};

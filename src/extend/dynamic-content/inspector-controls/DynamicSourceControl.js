import { __ } from '@wordpress/i18n';
import SelectPostType from '../components/SelectPostType';
import PostTypeRecordsSelect from '../../../components/post-type-records-select';
import SelectSource from '../components/SelectSource';
import AdjacentPostControl from './AdjacentPostControl';

export default ( props ) => {
	const {
		dynamicSource,
		postType,
		postId,
		setAttributes,
		dynamicContentType,
		adjacentPost,
		isInQueryLoop,
		blockName,
		currentPostType,
		currentPostId,
	} = props;

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
				isInQueryLoop={ isInQueryLoop }
				blockName={ blockName }
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
						value={ !! postId ? [ postId ] : [] }
						id={ 'gblocks-select-post' }
						label={ __( 'Select source post', 'generateblocks' ) }
						help={ __( 'Search by name or ID.', 'generateblocks' ) }
						onChange={ ( option ) => {
							setAttributes( { postId: option.value } );
						} }
						isMulti={ false }
					/>
				</>
			}

			{ ( dynamicSource === 'next-post' || dynamicSource === 'previous-post' ) &&
				<AdjacentPostControl
					dynamicSource={ dynamicSource }
					adjacentPost={ adjacentPost }
					postType={ currentPostType }
					postId={ currentPostId }
					setAttributes={ setAttributes }
				/>
			}
		</>
	);
};

import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import DynamicSourceControl from './inspector-controls/DynamicSourceControl';
import ContentTypeControl from './inspector-controls/ContentTypeControl';
import LinkTypeControl from './inspector-controls/LinkTypeControl';
import PostDateControl from './inspector-controls/PostDateControl';
import PostMetaControl from './inspector-controls/PostMetaControl';
import AuthorMetaControl from './inspector-controls/AuthorMetaControl';
import CommentsControl from './inspector-controls/CommentsControl';
import TermsControl from './inspector-controls/TermsControl';
import getIcon from '../../../../utils/get-icon';

export default ( { context, attributes, setAttributes, name } ) => {
	const {
		postType,
		postId,
		isDynamicContent,
		dynamicSource,
		contentType,
		dateType,
		dateReplacePublished,
		metaFieldName,
		noCommentsText,
		singleCommentText,
		multipleCommentsText,
		termTaxonomy,
		termSeparator,
		dynamicLinkType,
		linkMetaFieldName,
	} = attributes;

	const currentPostType = dynamicSource === 'current-post' ? context.postType : postType;
	const currentPostId = dynamicSource === 'current-post' ? context.postId : postId;

	return (
		<InspectorControls>
			<PanelArea
				id={ 'dynamicContentControls' }
				title={ __( 'Dynamic Content', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'dynamic' ) }
				className="gblocks-panel-label"
			>
				<ToggleControl
					label={ __( 'Enable dynamic content', 'generateblocks' ) }
					checked={ isDynamicContent }
					onChange={ ( value ) => {
						setAttributes( { isDynamicContent: value } );
					} }
				/>

				{ isDynamicContent &&
					<>
						<DynamicSourceControl
							dynamicSource={ dynamicSource }
							postType={ postType }
							postId={ postId }
							setAttributes={ setAttributes }
						/>

						<ContentTypeControl contentType={ contentType } setAttributes={ setAttributes } />

						<PostDateControl
							isActive={ 'post-date' === contentType }
							dateType={ dateType }
							dateReplacePublished={ dateReplacePublished }
							setAttributes={ setAttributes }
						/>

						<PostMetaControl
							isActive={ 'post-meta' === contentType }
							postType={ currentPostType }
							postId={ currentPostId }
							metaFieldName={ metaFieldName }
							setAttributes={ setAttributes }
						/>

						<AuthorMetaControl
							isActive={ 'author-meta' === contentType }
							postType={ currentPostType }
							postId={ currentPostId }
							metaFieldName={ metaFieldName }
							setAttributes={ setAttributes }
						/>

						<CommentsControl
							isActive={ 'comments-number' === contentType }
							noCommentsText={ noCommentsText }
							singleCommentText={ singleCommentText }
							multipleCommentsText={ multipleCommentsText }
							setAttributes={ setAttributes }
						/>

						<TermsControl
							isActive={ 'terms' === contentType }
							postType={ postType }
							termTaxonomy={ termTaxonomy }
							termSeparator={ termSeparator }
							setAttributes={ setAttributes }
							name={ name }
						/>

						<LinkTypeControl
							linkType={ dynamicLinkType }
							contentType={ contentType }
							linkMetaFieldName={ linkMetaFieldName }
							onChange={ ( option ) => setAttributes( { dynamicLinkType: option.value } ) }
						/>
					</>
				}
			</PanelArea>
		</InspectorControls>
	);
};

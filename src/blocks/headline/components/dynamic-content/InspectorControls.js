import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import DynamicSourceControl from './inspector-controls/DynamicSourceControl';
import ContentTypeControl from './inspector-controls/ContentTypeControl';
import LinkTypeControl from './inspector-controls/LinkTypeControl';
import PostDateControl from './inspector-controls/PostDateControl';
import PostMetaControl from './inspector-controls/PostMetaControl';
import AuthorMetaControl from './inspector-controls/AuthorMetaControl';
import getIcon from '../../../../utils/get-icon';

export default ( { context, attributes, setAttributes } ) => {
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
						setAttributes( { isDynamicContent: value, content: '' } );
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

						{ 'comments-number' === contentType &&
							<>
								<TextControl
									label={ __( 'No comments text', 'generateblocks' ) }
									value={ noCommentsText }
									onChange={ ( value ) => setAttributes( { noCommentsText: value } ) }
								/>

								<TextControl
									label={ __( 'Single comment text', 'generateblocks' ) }
									value={ singleCommentText }
									onChange={ ( value ) => setAttributes( { singleCommentText: value } ) }
								/>

								<TextControl
									label={ __( 'Multiple comments text', 'generateblocks' ) }
									value={ multipleCommentsText }
									onChange={ ( value ) => setAttributes( { multipleCommentsText: value } ) }
								/>
							</>
						}

						{ 'terms' === contentType &&
							<>
								<TextControl
									label={ __( 'Taxonomy', 'generateblocks' ) }
									help="Would be cool if this was an auto-populated select"
									value={ termTaxonomy }
									onChange={ ( value ) => setAttributes( { termTaxonomy: value } ) }
								/>

								<TextControl
									label={ __( 'Term separator', 'generateblocks' ) }
									value={ termSeparator }
									onChange={ ( value ) => setAttributes( { termSeparator: value } ) }
								/>
							</>
						}

						<LinkTypeControl
							linkType={ dynamicLinkType }
							contentType={ contentType }
							onChange={ ( option ) => setAttributes( { dynamicLinkType: option.value } ) }
						/>

						{ 'post-meta' === dynamicLinkType &&
							<TextControl
								label={ __( 'Meta field name', 'generateblocks' ) }
								value={ linkMetaFieldName }
								onChange={ ( value ) => setAttributes( { linkMetaFieldName: value } ) }
							/>
						}
					</>
				}
			</PanelArea>
		</InspectorControls>
	);
};

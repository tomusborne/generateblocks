import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import PanelArea from '../../components/panel-area';
import DynamicSourceControl from './inspector-controls/DynamicSourceControl';
import ContentTypeControl from './inspector-controls/ContentTypeControl';
import LinkTypeControl from './inspector-controls/LinkTypeControl';
import PostDateControl from './inspector-controls/PostDateControl';
import PostMetaControl from './inspector-controls/PostMetaControl';
import AuthorMetaControl from './inspector-controls/AuthorMetaControl';
import CommentsControl from './inspector-controls/CommentsControl';
import TermsControl from './inspector-controls/TermsControl';
import ExcerptControl from './inspector-controls/ExcerptControl';
import getIcon from '../../utils/get-icon';
import TermMetaControl from "./inspector-controls/TermMetaControl";

export default ( { context, attributes, setAttributes, name } ) => {
	const {
		postType,
		postId,
		useDynamicData,
		dynamicSource,
		dynamicContentType,
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
		linkMetaFieldType,
		isPagination,
		isQueryLoopItem,
		isCaption,
		excerptLength,
		useDefaultMoreLink,
		customMoreLinkText,
		dynamicLinkRemoveIfEmpty,
		adjacentPost,
		adjacentPostLink,
	} = attributes;

	const currentPostType = dynamicSource === 'current-post' ? context.postType : postType;
	const currentPostId = dynamicSource === 'current-post' ? context.postId : postId;
	const isInQueryLoop = 'undefined' !== typeof context[ 'generateblocks/queryId' ];

	useEffect( () => {
		if (
			'generateblocks/container' === name &&
			useDynamicData &&
			'' !== dynamicContentType &&
			( isQueryLoopItem || isInQueryLoop )
		) {
			setAttributes( {
				bgImageInline: true,
			} );
		}
	}, [
		dynamicContentType,
		isQueryLoopItem,
	] );

	useEffect( () => {
		if (
			'generateblocks/headline' === name &&
			isCaption &&
			useDynamicData
		) {
			if ( context[ 'generateblocks/mediaId' ] ) {
				setAttributes( {
					postId: context[ 'generateblocks/mediaId' ],
					postType: 'attachment',
					dynamicSource: 'current-post',
					dynamicContentType: dynamicContentType || 'caption',
				} );
			} else {
				setAttributes( {
					postId: '',
					postType: 'post',
					dynamicSource: 'current-post',
					dynamicContentType: dynamicContentType || 'caption',
				} );
			}
		}
	}, [
		isCaption,
		context[ 'generateblocks/mediaId' ],
		useDynamicData,
		dynamicContentType,
	] );

	useEffect( () => {
		if ( isInQueryLoop && ( 'next-post' === dynamicSource || 'previous-post' === dynamicSource ) ) {
			setAttributes( {
				dynamicSource: 'current-post',
				adjacentPost: undefined,
			} );
		}

		if ( isInQueryLoop && ( 'next-post' === dynamicLinkType || 'previous-post' === dynamicLinkType ) ) {
			setAttributes( {
				dynamicLinkType: 'single-post',
				adjacentPostLink: undefined,
			} );
		}
 	}, [ isInQueryLoop, dynamicSource, dynamicLinkType ] );

	return (
		<InspectorControls>
			<PanelArea
				id={ 'dynamicDataControls' }
				title={ __( 'Dynamic Data', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'dynamic' ) }
				className="gblocks-panel-label"
			>
				<ToggleControl
					label={ __( 'Enable Dynamic Data', 'generateblocks' ) }
					checked={ useDynamicData }
					onChange={ ( value ) => {
						setAttributes( { useDynamicData: value } );
					} }
				/>

				{ useDynamicData &&
					<>
						<DynamicSourceControl
							dynamicSource={ dynamicSource }
							postType={ postType }
							postId={ postId }
							setAttributes={ setAttributes }
							dynamicContentType={ dynamicContentType }
							adjacentPost={ adjacentPost }
							isInQueryLoop={ isInQueryLoop }
							blockName={ name }
							currentPostType={ context.postType }
							currentPostId={ context.postId }
						/>

						<ContentTypeControl
							dynamicContentType={ dynamicContentType }
							setAttributes={ setAttributes }
							name={ name }
							isCaption={ isCaption }
						/>

						<PostDateControl
							isActive={ 'post-date' === dynamicContentType }
							dateType={ dateType }
							dateReplacePublished={ dateReplacePublished }
							setAttributes={ setAttributes }
						/>

						<PostMetaControl
							isActive={ 'post-meta' === dynamicContentType }
							postType={ currentPostType }
							postId={ currentPostId }
							metaFieldName={ metaFieldName }
							setAttributes={ setAttributes }
							attributes={ attributes }
						/>

						<AuthorMetaControl
							isActive={ 'author-meta' === dynamicContentType }
							postType={ currentPostType }
							postId={ currentPostId }
							metaFieldName={ metaFieldName }
							setAttributes={ setAttributes }
							attributes={ attributes }
						/>

						<TermMetaControl
							isActive={ 'term-meta' === dynamicContentType }
							metaFieldName={ metaFieldName }
							setAttributes={ setAttributes }
							attributes={ attributes }
						/>

						<CommentsControl
							isActive={ 'comments-number' === dynamicContentType }
							noCommentsText={ noCommentsText }
							singleCommentText={ singleCommentText }
							multipleCommentsText={ multipleCommentsText }
							setAttributes={ setAttributes }
						/>

						<TermsControl
							isActive={ 'terms' === dynamicContentType }
							postType={ currentPostType }
							termTaxonomy={ termTaxonomy }
							termSeparator={ termSeparator }
							setAttributes={ setAttributes }
							name={ name }
						/>

						<ExcerptControl
							isActive={ 'post-excerpt' === dynamicContentType }
							excerptLength={ excerptLength }
							useDefaultMoreLink={ useDefaultMoreLink }
							customMoreLinkText={ customMoreLinkText }
							setAttributes={ setAttributes }
							attributes={ attributes }
						/>

						<LinkTypeControl
							isActive={
								'generateblocks/container' !== name ||
								(
									'generateblocks/container' === name &&
									'undefined' !== typeof attributes.url
								)
							}
							postType={ currentPostType }
							postId={ currentPostId }
							attributes={ attributes }
							linkType={ dynamicLinkType }
							dynamicLinkRemoveIfEmpty={ dynamicLinkRemoveIfEmpty }
							dynamicContentType={ dynamicContentType }
							linkMetaFieldName={ linkMetaFieldName }
							linkMetaFieldType={ linkMetaFieldType }
							isPagination={ isPagination }
							setAttributes={ setAttributes }
							adjacentPostLink={ adjacentPostLink }
							name={ name }
						/>
					</>
				}
			</PanelArea>
		</InspectorControls>
	);
};

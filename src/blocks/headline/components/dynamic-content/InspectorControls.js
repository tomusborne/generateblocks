import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl, SelectControl, TextControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import DynamicSourceControl from './inspector-controls/DynamicSourceControl';
import ContentTypeControl from './inspector-controls/ContentTypeControl';
import LinkTypeControl from './inspector-controls/LinkTypeControl';

export default ( { attributes, setAttributes } ) => {
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

	return (
		<InspectorControls>
			<PanelArea
				id={ 'dynamicContentControls' }
				title={ __( 'Dynamic content', 'generateblocks' ) }
				initialOpen={ true }
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

						<ContentTypeControl
							contentType={ contentType }
							onChange={ ( option ) => {
								setAttributes( { contentType: option.value } );

								if ( 'comments-number' === option.value ) {
									setAttributes( {
										noCommentsText: __( 'No comments', 'generateblocks' ),
										singleCommentText: __( '1 comment', 'generateblocks' ),
										// translators: Number of comments.
										multipleCommentsText: __( '% comments', 'generateblocks' ),
									} );
								} else {
									setAttributes( {
										noCommentsText: '',
										singleCommentText: '',
										multipleCommentsText: '',
									} );
								}
							} }
						/>

						{ 'post-date' === contentType &&
							<>
								<SelectControl
									label={ __( 'Date type', 'generateblocks' ) }
									value={ dateType }
									options={ [
										{ value: 'published', label: __( 'Published', 'generateblocks' ) },
										{ value: 'updated', label: __( 'Updated', 'generateblocks' ) },
									] }
									onChange={ ( value ) => setAttributes( { dateType: value } ) }
								/>

								{ 'published' === dateType &&
									<ToggleControl
										label={ __( 'Replace with updated date', 'generateblocks' ) }
										checked={ !! dateReplacePublished }
										onChange={ ( value ) => setAttributes( { dateReplacePublished: value } ) }
									/>
								}
							</>
						}

						{ ( 'post-meta' === contentType || 'author-meta' === contentType ) &&
							<TextControl
								label={ __( 'Meta field name', 'generateblocks' ) }
								value={ metaFieldName }
								onChange={ ( value ) => setAttributes( { metaFieldName: value } ) }
							/>
						}

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

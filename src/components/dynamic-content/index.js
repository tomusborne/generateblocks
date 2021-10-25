import PanelArea from '../panel-area';
import { __ } from '@wordpress/i18n';
import { SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import dynamicContentAttributes from './attributes';
import SelectSource from './components/SelectSource';
import SelectContentType from './components/SelectContentType';
import SelectLinkType from './components/SelectLinkType';
import SelectPostType from './components/SelectPostType';
import SelectPosts from './components/SelectPosts';
import SelectPostMetaField from './components/SelectPostMetaField';
export {
	dynamicContentAttributes,
};

export default ( { attributes, setAttributes } ) => {
	const {
		hasDynamicContent,
		dynamicSource,
		dynamicContentType,
		dynamicLinkType,
		postType,
		postId,
		metaFieldName,
		dateType,
		dateReplacePublished,
		termTaxonomy,
		termSeparator,
		linkMetaFieldName,
		noCommentsText,
		singleCommentText,
		multipleCommentsText,
	} = attributes;

	return (
		<PanelArea
			title={ __( 'Dynamic Content', 'generateblocks' ) }
			id={ 'dynamicContent' }
			showPanel={ true }
		>
			<div style={ { marginTop: '12px', marginBottom: '24px' } }>
				<ToggleControl
					label={ __( 'Enable dynamic content', 'generateblocks' ) }
					checked={ !! hasDynamicContent }
					onChange={ ( value ) => setAttributes( { hasDynamicContent: value } ) }
				/>
			</div>

			{ hasDynamicContent &&
				<div>
					<SelectSource
						source={ dynamicSource }
						onChange={ ( option ) => setAttributes( { dynamicSource: option.value } ) }
					/>

					{ 'post-type' === dynamicSource &&
						<>
							<SelectPostType
								postType={ postType }
								onChange={ ( option ) => setAttributes( { postType: option.value } ) }
							/>

							{ postType &&
								<SelectPosts
									postType={ postType }
									postId={ postId }
									onChange={ ( option ) => {
										setAttributes( { postId: option.value } );
									} }
								/>
							}
						</>
					}

					<SelectContentType
						contentType={ dynamicContentType }
						onChange={ ( option ) => {
							setAttributes( { dynamicContentType: option.value } );

							if ( 'comments-number' === option.value ) {
								setAttributes( {
									noCommentsText: __( 'No comments', 'generateblocks' ),
									singleCommentText: __( '1 comment', 'generateblocks' ),
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

					{ 'post-meta' === dynamicContentType &&
						<SelectPostMetaField
							postType={ postType }
							postId={ postId }
							metaField={ metaFieldName }
							onChange={ ( option ) => setAttributes( { metaFieldName: option.value } ) }
						/>
					}

					{ ( 'term-meta' === dynamicContentType || 'author-meta' === dynamicContentType ) &&
						<TextControl
							label={ __( 'Meta field name', 'generateblocks' ) }
							value={ metaFieldName }
							onChange={ ( value ) => setAttributes( { metaFieldName: value } ) }
						/>
					}

					{ 'post-date' === dynamicContentType &&
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

					{ 'comments-number' === dynamicContentType &&
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

					{ 'terms' === dynamicContentType &&
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

					<SelectLinkType
						linkType={ dynamicLinkType }
						contentType={ dynamicContentType }
						onChange={ ( option ) => setAttributes( { dynamicLinkType: option.value } ) }
					/>

					{ 'post-meta' === dynamicLinkType &&
						<SelectPostMetaField
							postType={ postType }
							postId={ postId }
							metaField={ linkMetaFieldName }
							onChange={ ( option ) => setAttributes( { linkMetaFieldName: option.value } ) }
						/>
					}

				</div>
			}
		</PanelArea>

	);
};

function disableRichTextFormatting( disable, props ) {
	if ( 'undefined' !== typeof props.attributes.hasDynamicContent && props.attributes.hasDynamicContent ) {
		return true;
	}

	return disable;
}

addFilter(
	'generateblocks.editor.headlineDisableFormatting',
	'gp-premium/dynamic-headline/disable-headline-formatting',
	disableRichTextFormatting
);

addFilter(
	'generateblocks.editor.buttonDisableFormatting',
	'gp-premium/dynamic-headline/disable-button-formatting',
	disableRichTextFormatting
);

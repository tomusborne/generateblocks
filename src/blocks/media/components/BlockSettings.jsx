import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

import {
	ApplyFilters,
	OpenPanel,
	HtmlAttributes,
	ImageUpload,
	URLControls,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	onSelectImage,
} ) {
	const {
		htmlAttributes,
		linkHtmlAttributes,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<ImageUpload
					value={ htmlAttributes?.src }
					onInsert={ ( value ) => {
						const newHtmlAttributes = {
							...htmlAttributes,
							src: value,
						};

						if ( newHtmlAttributes?.[ 'data-media-id' ] ) {
							delete newHtmlAttributes[ 'data-media-id' ];
						}

						setAttributes( {
							htmlAttributes: newHtmlAttributes,
							mediaId: 0,
						} );
					} }
					onSelectImage={ onSelectImage }
					allowDynamicTags={ true }
					onInsertDynamicTag={ ( value ) => {
						const newHtmlAttributes = {
							...htmlAttributes,
							src: value,
						};
						const featuredImageIdTag = value.startsWith( '{featured_image_url' )
							? value.replace( '{featured_image_url', '{featured_image_id' )
							: null;

						if ( featuredImageIdTag ) {
							newHtmlAttributes[ 'data-media-id' ] = featuredImageIdTag;
						}

						setAttributes( {
							htmlAttributes: newHtmlAttributes,
							mediaId: 0,
						} );
					} }
				/>

				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ linkHtmlAttributes }
					attributesName="linkHtmlAttributes"
				/>

				{ !! linkHtmlAttributes.href && (
					<HtmlAttributes
						label={ __( 'Link Attributes', 'generateblocks' ) }
						items={ linkHtmlAttributes }
						onAdd={ ( value ) => setAttributes( { linkHtmlAttributes: value } ) }
						onRemove={ ( value ) => setAttributes( { linkHtmlAttributes: value } ) }
						onChange={ ( value ) => setAttributes( { linkHtmlAttributes: value } ) }
					/>
				) }

				<TextControl
					label={ __( 'Width', 'generateblocks' ) }
					value={ htmlAttributes?.width }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								width: value,
							},
						} );
					} }
				/>

				<TextControl
					label={ __( 'Height', 'generateblocks' ) }
					value={ htmlAttributes?.height }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								height: value,
							},
						} );
					} }
				/>

				<TextControl
					label={ __( 'Alt text', 'generateblocks' ) }
					value={ htmlAttributes?.alt }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								alt: value,
							},
						} );
					} }
				/>

				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}

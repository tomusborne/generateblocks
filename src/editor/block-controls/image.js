import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import UnitControl from '../../components/unit-control/index.js';
import { ImageUpload } from '../../components/image-upload/ImageUpload.jsx';
import { OpenPanel } from '../../components/open-panel';
import { moreDesignOptions } from './index.js';
import { HtmlAttributes } from '@components/html-attributes';

function ImageOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		currentAtRule,
		name,
		attributes,
		setAttributes,
		onSelectImage,
	} = props;

	const {
		htmlAttributes,
		tagName,
	} = attributes;

	if ( 'generateblocks/media' !== name || 'img' !== tagName ) {
		return options;
	}

	return (
		<>
			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<ImageUpload
					value={ htmlAttributes?.src }
					onInsert={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								src: value,
							},
						} );
					} }
					onSelectImage={ onSelectImage }
					allowDynamicTags={ true }
				/>

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

			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<UnitControl
					id="width"
					label={ __( 'Width', 'generateblocks' ) }
					value={ getStyleValue( 'width', currentAtRule ) }
					onChange={ ( value ) => onStyleChange( 'width', value, currentAtRule ) }
				/>

				<UnitControl
					id="height"
					label={ __( 'Height', 'generateblocks' ) }
					value={ getStyleValue( 'height', currentAtRule ) }
					onChange={ ( value ) => onStyleChange( 'height', value, currentAtRule ) }
				/>
			</OpenPanel>

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/imageOptions',
	ImageOptions
);

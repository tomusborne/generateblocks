import { useBlockProps, useInnerBlocksProps, InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockStyles, withUniqueId, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { useSelect, useDispatch } from '@wordpress/data';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { SelectControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { HtmlAttributes } from '../../components/html-attributes/index.js';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { isBlobURL, getBlobByURL, revokeBlobURL } from '@wordpress/blob';
import { useImageFunctions } from './hooks/useImageFunctions.js';
import { Image } from './components/Image.jsx';
import { withDynamicTag } from '../../hoc/withDynamicTag.js';
import RootElement from '../../components/root-element/index.js';
import { AddCaption } from './components/AddCaption.jsx';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		name,
		clientId,
	} = props;

	const {
		tagName,
		className,
		styles = {},
		uniqueId,
		css,
		htmlAttributes = {},
		globalClasses = [],
	} = attributes;

	const [ temporaryURL, setTemporaryURL ] = useState();
	const classNames = [];
	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const { isTemporaryImage, mediaUpload, onUploadError } = useImageFunctions();

	if ( className ) {
		classNames.push( className );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-media-${ uniqueId }` );
	}

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'img' } );
		}
	}, [ tagName ] );

	const selector = useMemo( () => {
		if ( ! uniqueId ) {
			return '';
		}

		return '.gb-media-' + uniqueId;
	}, [ uniqueId ] );

	function onStyleChange( property, value = '', atRuleValue = '', nestedRuleValue = '' ) {
		addStyle( property, value, atRuleValue, nestedRuleValue );

		const updatedStyles = getStyles();
		setAttributes( { styles: updatedStyles } );
	}

	function getStyleValue( property, nestedRuleValue = '' ) {
		if ( ! nestedRuleValue ) {
			return styles?.[ property ] ?? '';
		}

		return styles?.[ nestedRuleValue ]?.[ property ] ?? '';
	}

	useEffect( () => {
		if ( ! selector ) {
			return;
		}

		( async function() {
			const generateCss = await getCss( selector, styles );
			setAttributes( { css: generateCss } );
		}() );
	}, [ JSON.stringify( styles ), selector ] );

	useEffect( () => {
		if ( ! selector ) {
			return;
		}

		updateEditorCSS( selector, css );
	}, [ css, selector ] );

	const { style = '', ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };
	const blockProps = useBlockProps();
	const elementAttributes = {
		className: classNames.join( ' ' ).trim(),
		...combinedAttributes,
	};

	const innerBlocksProps = useInnerBlocksProps( blockProps );
	const TagName = tagName || 'img';
	const tagNames = getBlockType( 'generateblocks/media' )?.attributes?.tagName?.enum;
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );

	function onSelectImage( image ) {
		if ( ! image || ! image.url ) {
			onResetImage();
			return;
		}

		if ( isBlobURL( image.url ) ) {
			setTemporaryURL( image.url );
		}

		setTemporaryURL();

		if ( !! image ) {
			const newAttributes = {
				...htmlAttributes,
				src: image.url,
				alt: image.alt,
				title: image.title,
				height: image.height,
				width: image.width,
			};

			setAttributes( { htmlAttributes: newAttributes } );
		}
	}

	function onSelectURL( newURL ) {
		if ( newURL === htmlAttributes.src ) {
			return;
		}

		const newAttributes = {
			...htmlAttributes,
			src: newURL,
		};

		setAttributes( { htmlAttributes: newAttributes } );
	}

	function onResetImage() {
		const newAttributes = { ...htmlAttributes };
		delete newAttributes.src;
		delete newAttributes.alt;
		delete newAttributes.title;

		setAttributes( { htmlAttributes: newAttributes } );
	}

	let isTemp = isTemporaryImage( htmlAttributes?.src );

	useEffect( () => {
		if ( ! isTemp ) {
			return;
		}

		const file = getBlobByURL( htmlAttributes?.src );

		if ( file ) {
			mediaUpload( {
				filesList: [ file ],
				onFileChange: ( [ img ] ) => {
					onSelectImage( img );
				},
				allowedTypes: [ 'image' ],
				onError: ( message ) => {
					isTemp = false;
					onUploadError( message );
				},
			} );
		}
	}, [] );

	// If an image is temporary, revoke the Blob url when it is uploaded (and is
	// no longer temporary).
	useEffect( () => {
		if ( isTemp ) {
			setTemporaryURL( htmlAttributes?.src );
			return;
		}
		revokeBlobURL( temporaryURL );
	}, [ isTemp, htmlAttributes?.src ] );

	function elementRender() {
		return (
			<>
				{ 'img' === tagName ? (
					<Image
						{ ...props }
						elementAttributes={ elementAttributes }
						temporaryURL={ temporaryURL }
						onSelectImage={ onSelectImage }
						onSelectURL={ onSelectURL }
						onResetImage={ onResetImage }
						onUploadError={ onUploadError }
					/>
				) : (
					<TagName { ...elementAttributes } />
				) }
			</>
		);
	}

	const shouldWrapBlock = isSelected || ( 'img' === tagName && ! temporaryURL && ! htmlAttributes?.src );

	return (
		<>
			<AddCaption
				clientId={ clientId }
				tagName={ tagName }
			/>

			<InspectorControls>
				<BlockStyles
					selector={ selector }
					onStyleChange={ onStyleChange }
					setAttributes={ setAttributes }
					styles={ styles }
					css={ css }
					stores={ { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } }
					defaultAtRules={ defaultAtRules }
				>
					{
						applyFilters(
							'generateblocks.editor.blockStyles',
							null,
							{
								...props,
								onStyleChange,
								getStyleValue,
								onSelectImage,
							}
						)
					}
				</BlockStyles>
			</InspectorControls>
			<InspectorAdvancedControls>
				{ tagNameOptions.length > 1 && (
					<SelectControl
						label={ __( 'Tag Name' ) }
						value={ tagName }
						options={ tagNameOptions }
						onChange={ ( value ) => setAttributes( { tagName: value } ) }
					/>
				) }

				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</InspectorAdvancedControls>

			<RootElement
				name={ name }
				clientId={ clientId }
			>
				{ !! shouldWrapBlock ? (
					<div { ...innerBlocksProps }>
						{ elementRender() }
					</div>
				) : (
					elementRender()
				) }
			</RootElement>
		</>
	);
}

const Edit = compose(
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };

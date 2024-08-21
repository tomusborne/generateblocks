import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockStyles, withUniqueId, useUpdateEditorStyleCSS } from '@edge22/block-styles';
import { getCss } from '@edge22/styles-builder';
import { useSelect, useDispatch } from '@wordpress/data';
import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore, tabsStore } from '../../store/block-styles';
import { defaultAtRules } from '../../utils/defaultAtRules.js';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { isBlobURL, getBlobByURL, revokeBlobURL } from '@wordpress/blob';
import { useImageFunctions } from './hooks/useImageFunctions.js';
import { Image } from './components/Image.jsx';
import { withDynamicTag } from '../../hoc/withDynamicTag.js';
import RootElement from '../../components/root-element/index.js';
import { AddCaption } from './components/AddCaption.jsx';
import { useCurrentAtRule } from '../../hooks/useCurrentAtRule.js';
import { BlockSettings } from './components/BlockSettings';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';

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
		linkHtmlAttributes = {},
	} = attributes;

	const [ temporaryURL, setTemporaryURL ] = useState();
	const { getStyles } = useSelect( stylesStore );
	const { addStyle } = useDispatch( stylesStore );
	const updateEditorCSS = useUpdateEditorStyleCSS();
	const currentAtRule = useCurrentAtRule();
	const { isTemporaryImage, mediaUpload, onUploadError } = useImageFunctions();
	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-media-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

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

	function getStyleValue( property, atRuleValue = '', nestedRuleValue = '' ) {
		if ( nestedRuleValue ) {
			if ( atRuleValue ) {
				return styles?.[ atRuleValue ]?.[ nestedRuleValue ]?.[ property ] ?? '';
			}

			return styles?.[ nestedRuleValue ]?.[ property ] ?? '';
		} else if ( atRuleValue ) {
			return styles?.[ atRuleValue ]?.[ property ] ?? '';
		}

		return styles?.[ property ] ?? '';
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

			if ( newAttributes?.[ 'data-media-id' ] ) {
				delete newAttributes[ 'data-media-id' ];
			}

			setAttributes( {
				htmlAttributes: newAttributes,
				mediaId: image.id ?? 0,
			} );
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

		setAttributes( {
			htmlAttributes: newAttributes,
			mediaId: 0,
		} );
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
						linkHtmlAttributes={ linkHtmlAttributes }
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
					scope="gb-block-styles-wrapper"
					stylesBuilderScope="gb-styles-builder-wrapper"
				>
					<BlockSettings
						{ ...props }
						getStyleValue={ getStyleValue }
						onStyleChange={ onStyleChange }
						currentAtRule={ currentAtRule }
						onSelectImage={ onSelectImage }
					/>
				</BlockStyles>
			</InspectorControls>

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
	withEmptyObjectFix,
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };

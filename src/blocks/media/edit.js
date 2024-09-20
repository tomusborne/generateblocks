import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { isBlobURL, getBlobByURL, revokeBlobURL } from '@wordpress/blob';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { useImageFunctions } from './hooks/useImageFunctions.js';
import { Image } from './components/Image.jsx';
import { withDynamicTag } from '../../hoc/withDynamicTag.js';
import RootElement from '../../components/root-element/index.js';
import { AddCaption } from './components/AddCaption.jsx';
import { BlockSettings } from './components/BlockSettings';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, StylesOnboarder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { useBlockClassAttributes } from '@hooks/useBlockClassAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses.js';
import { useBlockStyles } from '@hooks/useBlockStyles.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		name,
		clientId,
		selector,
		onStyleChange,
		htmlAttributes,
		getStyleValue,
	} = props;

	const {
		tagName,
		linkHtmlAttributes = {},
	} = attributes;

	const { currentAtRule } = useBlockStyles();
	const [ temporaryURL, setTemporaryURL ] = useState();
	const { isTemporaryImage, mediaUpload, onUploadError } = useImageFunctions();
	const classNameAttributes = useBlockClassAttributes( attributes );
	const classNames = getBlockClasses( 'gb-media', classNameAttributes );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'img' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps();
	const elementAttributes = {
		className: classNames.join( ' ' ).trim(),
		'data-block': clientId,
		...htmlAttributes,
	};
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
	const hasObjectFit = getStyleValue( 'objectFit', currentAtRule );

	return (
		<>
			<AddCaption
				clientId={ clientId }
				tagName={ tagName }
			/>

			<InspectorControls>
				<StylesOnboarder />
				<BlockStyles
					settingsTab={ (
						<BlockSettings
							{ ...props }
							onSelectImage={ onSelectImage }
						/>
					) }
					stylesTab={ (
						<BlockStylesBuilder
							selector={ selector }
							setAttributes={ setAttributes }
							shortcuts={ {} }
							onStyleChange={ onStyleChange }
						/>
					) }
				/>
			</InspectorControls>

			<RootElement
				name={ name }
				clientId={ clientId }
			>
				{ !! shouldWrapBlock ? (
					<div
						{ ...blockProps }
						data-block-wrapper
						style={ {
							width: hasObjectFit ? 'auto' : undefined,
							height: hasObjectFit ? '100%' : undefined,
						} }
					>
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
	withHtmlAttributes,
	withStyles,
	withEmptyObjectFix,
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };

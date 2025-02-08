import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { isBlobURL, getBlobByURL, revokeBlobURL } from '@wordpress/blob';
import { useSelect } from '@wordpress/data';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { useImageFunctions } from './hooks/useImageFunctions.js';
import { Image } from './components/Image.jsx';
import { withDynamicTag } from '../../hoc/withDynamicTag.js';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, StylesOnboarder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		name,
		clientId,
		onStyleChange,
		editorHtmlAttributes,
		htmlAttributes,
		styles,
	} = props;

	const {
		tagName,
		linkHtmlAttributes = {},
	} = attributes;

	const [ temporaryURL, setTemporaryURL ] = useState();
	const { isTemporaryImage, mediaUpload, onUploadError } = useImageFunctions();
	const classNames = getBlockClasses(
		'gb-media',
		{
			...attributes,
			styles,
		}
	);

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'img' } );
		}
	}, [ tagName ] );

	const {
		isBlockMultiSelected,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const blockProps = useBlockProps();
	const shouldWrapBlock = isSelected || isBlockMultiSelected( clientId ) || ( 'img' === tagName && ! temporaryURL && ! htmlAttributes?.src );
	const elementAttributes = {
		className: classNames.join( ' ' ).trim(),
		'data-block': clientId,
		...editorHtmlAttributes,
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

	return (
		<>
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
							attributes={ attributes }
							setAttributes={ setAttributes }
							shortcuts={ {} }
							onStyleChange={ onStyleChange }
							name={ name }
						/>
					) }
				/>
			</InspectorControls>

			<RootElement
				name={ name }
				clientId={ clientId }
			>
				<div
					{ ...blockProps }
					data-block-wrapper
					style={ {
						display: ! shouldWrapBlock ? 'none' : undefined,
					} }
				>
					{ elementRender() }
				</div>
				<div style={ { display: shouldWrapBlock ? 'none' : 'contents' } }>
					{ elementRender() }
				</div>
			</RootElement>
		</>
	);
}

const Edit = compose(
	withHtmlAttributes,
	withStyles,
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };

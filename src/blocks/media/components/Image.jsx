import { useState, useMemo, useRef } from '@wordpress/element';
import { ImagePlaceholder } from './ImagePlaceholder.jsx';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { isURL } from '@wordpress/url';

export function Image( {
	elementAttributes,
	temporaryURL,
	onSelectImage,
	onSelectURL,
	onUploadError,
	dynamicTagValue,
	isSelected,
	clientId,
	linkHtmlAttributes,
	attributes,
} ) {
	const imageRef = useRef();
	const [
		{ loadedNaturalWidth, loadedNaturalHeight },
		setLoadedNaturalSize,
	] = useState( {} );
	const { selectBlock } = useDispatch( blockEditorStore );

	// Get naturalWidth and naturalHeight from image ref, and fall back to loaded natural
	// width and height. This resolves an issue in Safari where the loaded natural
	// witdth and height is otherwise lost when switching between alignments.
	// See: https://github.com/WordPress/gutenberg/pull/37210.
	const { naturalWidth, naturalHeight } = useMemo( () => {
		return {
			naturalWidth:
				imageRef.current?.naturalWidth ||
				loadedNaturalWidth ||
				undefined,
			naturalHeight:
				imageRef.current?.naturalHeight ||
				loadedNaturalHeight ||
				undefined,
		};
	}, [
		loadedNaturalWidth,
		loadedNaturalHeight,
		imageRef.current?.complete,
	] );

	const imageSrc = useMemo( () => {
		if ( dynamicTagValue?.[ 0 ]?.replacement && isURL( dynamicTagValue?.[ 0 ]?.replacement ) ) {
			return dynamicTagValue?.[ 0 ]?.replacement;
		}

		if ( temporaryURL ) {
			return temporaryURL;
		}

		if ( elementAttributes?.src ) {
			if ( elementAttributes?.src.startsWith( '{{' ) ) {
				return generateblocksBlockMedia.squarePlaceholder;
			}

			return elementAttributes.src;
		}
	}, [ dynamicTagValue, temporaryURL, elementAttributes?.src ] );

	/* eslint-disable jsx-a11y/alt-text */
	// The alt tag below is added via elementAttributes.

	/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
	// The img element below is interactive if it's not selected.
	// This allows us to not render the surrounding `<div>` with the `blockProps`
	// unless the image is selected.

	/* eslint-disable jsx-a11y/anchor-is-valid */
	// We disable the anchor in the editor only.

	const image = (
		<>
			<img
				width={ naturalWidth }
				height={ naturalHeight }
				{ ...elementAttributes }
				src={ imageSrc }
				ref={ imageRef }
				onLoad={ ( event ) => {
					setLoadedNaturalSize( {
						loadedNaturalWidth: event.target?.naturalWidth,
						loadedNaturalHeight: event.target?.naturalHeight,
					} );
				} }
				onClick={ () => {
					if ( isSelected ) {
						return;
					}

					selectBlock( clientId );
				} }
				onKeyDown={ () => {
					if ( isSelected ) {
						return;
					}

					selectBlock( clientId );
				} }
				role={ ! isSelected ? 'button' : undefined }
				tabIndex={ ! isSelected ? 0 : undefined }
			/>
		</>
	);

	return (
		<>
			{ ( !! temporaryURL || !! elementAttributes?.src ) ? (
				<>
					{ linkHtmlAttributes.href ? (
						<a
							{ ...linkHtmlAttributes }
							href={ undefined }
						>
							{ image }
						</a>
					) : (
						image
					) }
				</>
			) : (
				<ImagePlaceholder
					onSelectImage={ onSelectImage }
					onSelectURL={ onSelectURL }
					onUploadError={ onUploadError }
					uniqueId={ attributes?.uniqueId ?? '' }
				/>
			) }
		</>
	);

	/* eslint-enable jsx-a11y/alt-text */
	/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
	/* eslint-enable jsx-a11y/anchor-is-valid */
}

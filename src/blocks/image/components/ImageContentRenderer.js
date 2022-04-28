import ImagePlaceholder from './ImagePlaceholder';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import RootElement from '../../../components/root-element';
import Element from '../../../components/element';
import Image from './Image';
import BlockControls from './BlockControls';
import { useRef, useState, useMemo, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import getDynamicImage from '../../../utils/get-dynamic-image';
import getMediaUrl from '../../../utils/get-media-url';
import getAttribute from '../../../utils/get-attribute';
import { applyFilters } from '@wordpress/hooks';

export default function ImageContentRenderer( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		context,
		deviceType,
	} = props;

	const {
		uniqueId,
		useDynamicData,
		dynamicContentType,
		dynamicSource,
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
		width,
		height,
		sizeSlug,
		className,
		align,
	} = attributes;

	const imageRef = useRef();
	const figureRef = useRef();
	const [
		{ loadedNaturalWidth, loadedNaturalHeight },
		setLoadedNaturalSize,
	] = useState( {} );
	const [ imageFloat, setImageFloat ] = useState( false );

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

	useEffect( () => {
		if ( ! useDynamicData ) {
			if ( ! width ) {
				setAttributes( { width: naturalWidth } );
			}

			if ( ! height ) {
				setAttributes( { height: naturalHeight } );
			}
		}
	}, [
		loadedNaturalWidth,
		loadedNaturalHeight,
	] );

	useEffect( () => {
		if ( figureRef.current ) {
			const imageStyles = getComputedStyle( figureRef.current );

			if ( imageStyles ) {
				setImageFloat( imageStyles.float );
			}
		}
	}, [ getAttribute( 'alignment', props ) ] );

	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const parentBlock = getBlockRootClientId( clientId );
	const currentImage = getDynamicImage( props );
	const dynamicImageUrl = getMediaUrl( currentImage, sizeSlug );

	const dynamicImageFallback = applyFilters(
		'generateblocks.editor.dynamicImageFallback',
		dynamicImageUrl,
		props
	);

	const imageUrl = useDynamicData && dynamicContentType ? dynamicImageFallback : attributes.mediaUrl;
	const altText = useDynamicData && dynamicContentType ? currentImage?.alt_text : attributes.alt;
	const titleText = useDynamicData && dynamicContentType ? currentImage?.title?.rendered : attributes.title;

	const getDataAlign = () => {
		let dataAlign = null;

		if ( align ) {
			dataAlign = align;
		}

		if ( 'left' === imageFloat || 'right' === imageFloat ) {
			dataAlign = imageFloat;
		}

		return dataAlign;
	};

	const figureAttributes = useBlockProps( {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
		'data-align': !! parentBlock ? getDataAlign() : null,
		ref: figureRef,
	} );

	// We don't want our className appearing in the figure.
	if ( figureAttributes.className.includes( className ) ) {
		figureAttributes.className = figureAttributes.className.replace( className, '' ).trim();
	}

	const isDescendentOfQueryLoop = !! context[ 'generateblocks/query' ];

	const canUploadImage =
		! useDynamicData ||
		(
			useDynamicData &&
			'featured-image' === dynamicContentType &&
			'current-post' === dynamicSource &&
			! isDescendentOfQueryLoop
		);

	const anchorAttributes = {
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
		disabled: true,
	};

	const imageProps = {
		src: imageUrl,
		alt: altText,
		title: titleText,
		setAttributes,
		anchorAttributes,
		imageRef,
		setLoadedNaturalSize,
		attributes,
	};

	return (
		<>
			<BlockControls
				{ ...props }
				imageUrl={ imageUrl }
				canUploadImage={ canUploadImage }
				deviceType={ deviceType }
			/>

			<RootElement name={ name } clientId={ clientId } align={ getDataAlign() }>
				<Element tagName="figure" htmlAttrs={ figureAttributes }>
					{ ( !! imageUrl )
						? <Image { ...imageProps } />
						: <ImagePlaceholder { ...props } canUploadImage={ canUploadImage } />
					}
				</Element>
			</RootElement>
		</>
	);
}

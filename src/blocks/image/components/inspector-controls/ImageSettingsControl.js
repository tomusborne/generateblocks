import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import PanelArea from '../../../../components/panel-area';
import { TextareaControl, TextControl, SelectControl } from '@wordpress/components';
import NumberControl from '../../../../components/number-control';
import getAttribute from '../../../../utils/get-attribute';
import getMediaUrl from '../../../../utils/get-media-url';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function ImageSettingsControls( props ) {
	const {
		state,
		attributes,
		setAttributes,
		media,
		deviceType,
	} = props;

	const {
		isDynamicContent,
		mediaId,
		alt,
		title,
		sizeSlug,
		width,
		height,
		objectFit,
		objectFitTablet,
		objectFitMobile,
		mediaUrl,
	} = attributes;

	const showImageDimensions =
		'Desktop' === deviceType ||
		(
			'Tablet' === deviceType &&
			(
				objectFit ||
				objectFitTablet
			)
		) ||
		(
			'Mobile' === deviceType &&
			(
				objectFit ||
				objectFitTablet ||
				objectFitMobile
			)
		);

	const mediaData = useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		return mediaId && getMedia( mediaId, { context: 'view' } );
	}, [ isDynamicContent, mediaId ] );

	const imageDimensions = useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		return getSettings().imageDimensions || [];
	}, [] );

	const imageSizes = useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		const sizes = getSettings().imageSizes || [];
		return sizes.map( ( size ) => ( { value: size.slug, label: size.name } ) );
	}, [] );

	useEffect( () => {
		if ( isDynamicContent ) {
			setAttributes( {
				width: imageDimensions[ sizeSlug ]?.width || '',
				height: imageDimensions[ sizeSlug ]?.height || '',
			} );
		}
	}, [ isDynamicContent ] );

	return (
		<PanelArea
			{ ...props }
			title={ __( 'Settings', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'backgrounds' ) }
			className={ 'gblocks-panel-label' }
			id={ 'imageSettings' }
			state={ state }
		>
			{
				'Desktop' === deviceType &&
				(
					!! mediaId ||
					isDynamicContent
				) &&
				<SelectControl
					label={ __( 'Size', 'generateblocks' ) }
					value={ sizeSlug }
					options={ imageSizes }
					onChange={ ( value ) => {
						setAttributes( {
							sizeSlug: value,
						} );

						const imageUrl = getMediaUrl( mediaData, value ) || mediaUrl;
						let newWidth = mediaData?.media_details?.sizes[ value ]?.width || width;
						let newHeight = mediaData?.media_details?.sizes[ value ]?.height || height;

						/**
						 * We can't get specific image data for dynamic images, so we'll use the
						 * available sizing options for each sizeSlug.
						 */
						if ( isDynamicContent ) {
							newWidth = imageDimensions[ value ]?.width || '';
							newHeight = imageDimensions[ value ]?.height || '';
						}

						setAttributes( {
							mediaUrl: imageUrl,
							width: newWidth,
							height: newHeight,
						} );
					} }
				/>
			}

			{ showImageDimensions &&
				<div className="gblocks-image-dimensions__row">
					<NumberControl
						{ ...props }
						label={ __( 'Width', 'generateblocks' ) }
						id="gblocks-image-width"
						attributeName="width"
						device={ deviceType }
						units={ [ 'px' ] }
						min="1"
					/>

					<NumberControl
						{ ...props }
						label={ __( 'Height', 'generateblocks' ) }
						id="gblocks-image-height"
						attributeName="height"
						device={ deviceType }
						units={ [ 'px' ] }
						min="1"
					/>
				</div>
			}

			<SelectControl
				label={ __( 'Object-fit', 'generateblocks' ) }
				value={ getAttribute( 'objectFit', props ) }
				options={ [
					{
						label: __( 'Select…', 'generateblocks' ),
						value: '',
					},
					{
						label: __( 'Inherit', 'generateblocks' ),
						value: 'inherit',
					},
					{
						label: __( 'Cover', 'generateblocks' ),
						value: 'cover',
					},
					{
						label: __( 'Contain', 'generateblocks' ),
						value: 'contain',
					},
					{
						label: __( 'Fill', 'generateblocks' ),
						value: 'fill',
					},
					{
						label: __( 'None', 'generateblocks' ),
						value: 'none',
					},
				] }
				onChange={ ( value ) => {
					setAttributes( {
						[ getAttribute( 'objectFit', props, true ) ]: value,
					} );
				} }
			/>

			{ ! isDynamicContent && mediaId &&
				<>
					<TextareaControl
						label={ __( 'Alt text (alternative text)', 'generateblocks' ) }
						help={ __( 'Describe the purpose of the image, leave empty if the image is purely decorative.', 'generateblocks' ) }
						value={ isDynamicContent ? media?.alt_text : alt }
						disabled={ isDynamicContent }
						onChange={ ( value ) => (
							setAttributes( { alt: value } )
						) }
					/>

					<TextControl
						label={ __( 'Title attribute', 'generateblocks' ) }
						help={ __( 'Describe the role of this image on the page.', 'generateblocks' ) }
						value={ isDynamicContent ? media?.title?.rendered : title }
						disabled={ isDynamicContent }
						onChange={ ( value ) => (
							setAttributes( { title: value } )
						) }
					/>
				</>
			}
		</PanelArea>
	);
}

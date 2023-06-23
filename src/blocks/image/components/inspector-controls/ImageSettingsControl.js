import { __ } from '@wordpress/i18n';
import { TextareaControl, TextControl, SelectControl, BaseControl } from '@wordpress/components';
import UnitControl from '../../../../components/unit-control';
import getAttribute from '../../../../utils/get-attribute';
import getMediaUrl from '../../../../utils/get-media-url';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';

export default function ImageSettingsControls( props ) {
	const {
		attributes,
		setAttributes,
		media,
		deviceType,
	} = props;

	const {
		useDynamicData,
		mediaId,
		alt,
		title,
		sizeSlug,
		mediaUrl,
	} = attributes;

	const mediaData = useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		return mediaId && getMedia( mediaId, { context: 'view' } );
	}, [ useDynamicData, mediaId ] );

	const imageSizes = useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		const sizes = getSettings().imageSizes || [];
		return sizes.map( ( size ) => ( { value: size.slug, label: size.name } ) );
	}, [] );

	return (
		<>
			{
				'Desktop' === deviceType &&
				(
					!! mediaId ||
					useDynamicData
				) &&
				<SelectControl
					label={ __( 'Size', 'generateblocks' ) }
					value={ sizeSlug }
					options={ imageSizes }
					onChange={ ( value ) => {
						const imageUrl = getMediaUrl( mediaData, value ) || mediaUrl;

						setAttributes( {
							mediaUrl: imageUrl,
							sizeSlug: value,
						} );
					} }
				/>
			}

			<BaseControl
				help={ __( 'These fields will resize the image using CSS.', 'generateblocks' ) }
			>
				<div className="gblocks-image-dimensions__row">
					<UnitControl
						label={ __( 'Width', 'generateblocks' ) }
						id="gblocks-image-width"
						value={ getAttribute( 'width', { attributes, deviceType } ) }
						placeholder={ getResponsivePlaceholder( 'width', attributes, deviceType ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'width', { attributes, deviceType }, true ) ]: value,
							} );
						} }
						min="1"
					/>

					<UnitControl
						label={ __( 'Height', 'generateblocks' ) }
						id="gblocks-image-height"
						value={ getAttribute( 'height', { attributes, deviceType } ) }
						placeholder={ getResponsivePlaceholder( 'height', attributes, deviceType ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'height', { attributes, deviceType }, true ) ]: value,
							} );
						} }
						min="1"
					/>
				</div>
			</BaseControl>

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

			{ ! useDynamicData && 'Desktop' === deviceType &&
				<>
					<TextareaControl
						label={ __( 'Alt text (alternative text)', 'generateblocks' ) }
						help={ __( 'Describe the purpose of the image, leave empty if the image is purely decorative.', 'generateblocks' ) }
						value={ useDynamicData ? media?.alt_text : alt }
						disabled={ useDynamicData }
						onChange={ ( value ) => (
							setAttributes( { alt: value } )
						) }
					/>

					<TextControl
						label={ __( 'Title attribute', 'generateblocks' ) }
						help={ __( 'Describe the role of this image on the page.', 'generateblocks' ) }
						value={ useDynamicData ? media?.title?.rendered : title }
						disabled={ useDynamicData }
						onChange={ ( value ) => (
							setAttributes( { title: value } )
						) }
					/>
				</>
			}
		</>
	);
}

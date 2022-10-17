import { __ } from '@wordpress/i18n';
import { BaseControl, Button, Notice, TextControl, Tooltip } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';

export default function ImageUrl( { bgImage, setAttributes, isUsingFeaturedImage } ) {
	return (
		<>
			<BaseControl
				id="gblocks-background-image-upload"
				label={ __( 'Image URL', 'generateblocks' ) }
			>
				<div className="gblocks-bg-image-wrapper">
					<TextControl
						type={ 'text' }
						value={ !! bgImage ? bgImage.image.url : '' }
						onChange={ ( value ) => {
							if ( ! value ) {
								setAttributes( { bgImage: null } );
							} else {
								setAttributes( {
									bgImage: {
										id: '',
										image: {
											url: value,
										},
									},
								} );
							}
						} }
					/>

					<div className="gblocks-background-image-action-buttons">
						<MediaUpload
							title={ __( 'Set background image', 'generateblocks' ) }
							onSelect={ ( media ) => {
								let size = generateBlocksDefaults.container.bgImageSize;

								if ( 'undefined' === typeof media.sizes[ size ] ) {
									size = 'full';
								}

								setAttributes( {
									bgImage: {
										id: media.id,
										image: media.sizes[ size ],
									},
								} );
							} }
							onClose={ () => {
								document.querySelector( '.gblocks-bg-image-wrapper input' ).focus();
							} }
							allowedTypes={ [ 'image' ] }
							value={ !! bgImage ? bgImage.id : '' }
							modalClass="editor-gb-container-background__media-modal"
							render={ ( { open } ) => (
								<Tooltip text={ __( 'Open the Media Library', 'generateblocks' ) }>
									<Button
										onClick={ open }
										className="is-secondary is-small"
									>
										{ __( 'Browse', 'generateblocks' ) }
									</Button>
								</Tooltip>
							) }
						/>
					</div>
				</div>
			</BaseControl>

			{ isUsingFeaturedImage &&
				<Notice
					className="gblocks-option-notice"
					status="info"
					isDismissible={ false }
				>
					{ __( 'Using featured image as dynamic background.', 'generateblocks' ) }
				</Notice>
			}
		</>
	);
}

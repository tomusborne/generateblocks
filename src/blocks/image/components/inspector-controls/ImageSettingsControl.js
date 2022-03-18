import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import PanelArea from '../../../../components/panel-area';
import { TextareaControl, TextControl } from '@wordpress/components';

export default function ImageSettingsControls( props ) {
	const {
		state,
		attributes,
		setAttributes,
		media,
	} = props;

	const {
		isDynamicContent,
		mediaId,
		alt,
		title,
	} = attributes;

	return (
		<PanelArea
			{ ...props }
			title={ __( 'Image settings', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className={ 'gblocks-panel-label' }
			id={ 'imageSettings' }
			state={ state }
		>

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

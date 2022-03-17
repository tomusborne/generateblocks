import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import PanelArea from '../../../../components/panel-area';
import { TextareaControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

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
	} = attributes;

	const image = useSelect( ( select ) => {
		return mediaId && select( coreStore ).getMedia( mediaId, { context: 'view' } );
	}, [ mediaId ] );

	useEffect( () => {
		if ( ! isDynamicContent ) {
			const altText = !! image ? image.alt_text : '';

			setAttributes( { alt: altText } );
		}
	}, [ isDynamicContent, mediaId, media, image ] );

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

			<TextareaControl
				label={ __( 'Alt text (alternative text)', 'generateblocks' ) }
				help={ __( 'Describe the purpose of the image, leave empty if the image is purely decorative.', 'generateblocks' ) }
				value={ isDynamicContent ? media?.alt_text : alt }
				disabled={ isDynamicContent }
				onChange={ ( value ) => (
					setAttributes( { alt: value } )
				) }
			/>

		</PanelArea>
	);
}

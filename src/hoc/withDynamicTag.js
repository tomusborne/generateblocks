import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { replaceTags } from '../dynamic-tags/utils';

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			attributes,
		} = props;

		const {
			content,
			htmlAttributes,
			tagName,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const [ contentMode, setContentMode ] = useState( 'edit' );
		const previewEnabled = 'enabled' === generateBlocksEditor?.dynamicTagsPreview;
		const isSavingPost = useSelect( ( select ) => select( 'core/editor' ).isSavingPost() );

		if ( ! previewEnabled && 'preview' === contentMode ) {
			setContentMode( 'edit' );
		}

		const getContentValue = () => {
			if ( 'img' === tagName ) {
				return htmlAttributes?.src;
			}

			if ( content?.originalHTML ) {
				return content.originalHTML;
			}

			return content?.text ?? content;
		};
		const contentValue = getContentValue();

		useEffect( () => {
			if ( ! contentValue || ! contentValue.includes( '{{' ) || ! previewEnabled ) {
				setDynamicTagValue( false );
				return;
			}

			if ( 'edit' === contentMode && 'img' !== tagName ) {
				setDynamicTagValue( false );
				return;
			}

			async function fetchData() {
				const response = await replaceTags( contentValue, context );

				setDynamicTagValue( response );
			}

			fetchData();
		}, [ contentValue, contentMode, context, tagName, isSavingPost ] );

		return (
			<WrappedComponent
				{ ...props }
				dynamicTagValue={ dynamicTagValue }
				contentMode={ contentMode }
				setContentMode={ setContentMode }
			/>
		);
	} );
}

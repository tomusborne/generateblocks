import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import DynamicSourceControl from './inspector-controls/DynamicSourceControl';
import ContentTypeControl from './inspector-controls/ContentTypeControl';

export default ( { attributes, setAttributes } ) => {
	const { isDynamicContent } = attributes;

	return (
		<InspectorControls>
			<PanelArea
				id={ 'dynamicContentControls' }
				title={ __( 'Dynamic content', 'generateblocks' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Enable dynamic content', 'generateblocks' ) }
					checked={ isDynamicContent }
					onChange={ ( value ) => {
						setAttributes( { isDynamicContent: value, content: '' } );
					} }
				/>

				{ isDynamicContent &&
					<>
						<DynamicSourceControl
							dynamicSource={ attributes.dynamicSource }
							postType={ attributes.postType }
							postId={ attributes.postId }
							setAttributes={ setAttributes }
						/>

						<ContentTypeControl
							contentType={ attributes.contentType }
							onChange={ ( option ) => {
								setAttributes( { contentType: option.value } );
							} }
						/>
					</>
				}
			</PanelArea>
		</InspectorControls>
	);
};

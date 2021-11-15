import { InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import { useDispatch } from '@wordpress/data';

export default ( { clientId, attributes, setAttributes } ) => {
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	return (
		<InspectorControls>
			<PanelArea
				id={ 'queryLoopControls' }
				title={ __( 'Query loop', 'generateblocks' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Enable query loop', 'generateblocks' ) }
					checked={ attributes.isQueryLoop }
					onChange={ ( isQueryLoop ) => {
						setAttributes( { isQueryLoop } );
						replaceInnerBlocks( clientId, [] );
					} }
				/>
			</PanelArea>
		</InspectorControls>
	);
};

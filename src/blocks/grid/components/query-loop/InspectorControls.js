import { InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

export default ( { clientId, attributes, setAttributes } ) => {
	const [ isQueryLoop, setIsQueryLoop ] = useState( attributes.isQueryLoop );
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		setAttributes( { isQueryLoop } );
		replaceInnerBlocks( clientId, [] );
	}, [ isQueryLoop ] );

	return (
		<InspectorControls>
			<PanelArea
				id={ 'queryLoopControls' }
				title={ __( 'Query loop', 'generateblocks' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Enable query loop', 'generateblocks' ) }
					checked={ isQueryLoop }
					onChange={ setIsQueryLoop }
				/>
			</PanelArea>
		</InspectorControls>
	);
};

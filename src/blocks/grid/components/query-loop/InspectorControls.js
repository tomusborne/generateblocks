import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import PanelArea from '../../../../components/panel-area';
import { useEffect, useState } from '@wordpress/element';

export default ( { attributes, setAttributes } ) => {
	const [ isQueryLoop, setIsQueryLoop ] = useState( attributes.isQueryLoop );

	useEffect( () => {
		setAttributes( { isQueryLoop } );
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

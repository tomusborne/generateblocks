import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

export default ( { clientId, innerBlockStyles } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	return (
		<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
			<Button
				className="gblocks-add-new-button gblocks-button-container-appender"
				icon={ 'insert' }
				onClick={ () => {
					insertBlocks( createBlock( 'generateblocks/button', innerBlockStyles ), undefined, clientId );
				} }
			/>
		</Tooltip>
	);
};

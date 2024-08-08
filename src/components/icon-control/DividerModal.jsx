import { IconLibrary } from '../icon-library';
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

export function DividerModal( { setIsOpen, onChange } ) {
	const dividers = generateBlocksInfo.svgShapes;

	return (
		<Modal
			title={ __( 'Divider Library', 'generateblocks' ) }
			onRequestClose={ () => setIsOpen( false ) }
			className="gb-icon-library-modal"
			size="large"
		>
			<IconLibrary
				icons={ dividers }
				onInsert={ ( icon ) => {
					onChange( icon );
					setIsOpen( false );
				} }
				iconType="divider"
			/>
		</Modal>
	);
}

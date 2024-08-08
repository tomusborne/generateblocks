import { IconLibrary } from '../icon-library';
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import generalSvgs from '../icon-picker/svgs-general';
import socialSvgs from '../icon-picker/svgs-social';

export function IconModal( { attributes, setIsOpen, onChange } ) {
	const icons = applyFilters(
		'generateblocks.editor.iconSVGSets',
		{
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
		},
		{ attributes }
	);

	return (
		<Modal
			title={ __( 'Icon Library', 'generateblocks' ) }
			onRequestClose={ () => setIsOpen( false ) }
			className="gb-icon-library-modal"
			size="large"
		>
			<IconLibrary
				icons={ icons }
				onInsert={ ( icon ) => {
					onChange( icon );
					setIsOpen( false );
				} }
			/>
		</Modal>
	);
}

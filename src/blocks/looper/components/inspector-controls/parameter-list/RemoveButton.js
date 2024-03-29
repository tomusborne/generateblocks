import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import getIcon from '../../../../../utils/get-icon';

export default function RemoveButton( { id, onClick } ) {
	return (
		<Tooltip text={ __( 'Delete parameter', 'generateblocks-pro' ) }>
			<Button
				className="gblocks-remove-parameter"
				onClick={ () => {
					// eslint-disable-next-line
					if ( window.confirm( __( 'This will permanently delete this parameter.', 'generateblocks' ) ) ) {
						onClick( id );
					}
				} }
				icon={ getIcon( 'trash' ) }
			/>
		</Tooltip>
	);
}

import { Modal, Button, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import '../editor.scss';
import { DynamicTagSelect } from './DynamicTagSelect';

export function DynamicTagModal( { onInsert, renderToggle, tooltip, textValue } ) {
	const [ isOpen, setOpen ] = useState( false );

	function onToggle() {
		setOpen( ! isOpen );
	}

	function Toggle() {
		if ( renderToggle ) {
			return renderToggle( { isOpen, onToggle } );
		}

		const button = <Button
			onClick={ onToggle }
			aria-expanded={ isOpen }
			icon={ getIcon( 'database' ) }
			label={ __( 'Dynamic tags', 'generateblocks' ) }
			size="compact"
		/>;

		return (
			<>
				{ !! tooltip
					? <Tooltip text={ tooltip }>{ button }</Tooltip>
					: button
				}
			</>
		);
	}

	return (
		<>
			<Toggle />

			{ isOpen && (
				<Modal
					title={ __( 'Dynamic tags', 'generateblocks' ) }
					onRequestClose={ onToggle }
					size="medium"
				>
					<DynamicTagSelect
						onInsert={ ( newValue ) => {
							onInsert( newValue );
							onToggle();
						} }
						textValue={ textValue }
					/>
				</Modal>
			) }
		</>
	);
}

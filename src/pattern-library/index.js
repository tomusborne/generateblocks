import { Button, Modal } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { createPortal, useState } from '@wordpress/element';
import { LibraryProvider } from './components/library-provider';
import LibraryLayout from './components/library-layout';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import getIcon from '../utils/get-icon';

// Create a new element for the portal content here so it's only created once.
const portalElement = document.createElement( 'div' );

function PatternLibrary() {
	const [ isOpen, setIsOpen ] = useState( false );
	const container = document.querySelector( '.edit-post-header__settings' );

	if ( ! container ) {
		return null;
	}

	// Insert the new element at the start of the container
	container.insertBefore( portalElement, container.firstChild );

	return (
		<>
			{ !! container && createPortal(
				<Button
					style={ { paddingRight: 'start' } }
					className="gblocks-pattern-library-button"
					onClick={ () => setIsOpen( true ) }
					icon={ getIcon( 'generateblocks' ) }
					label={ __( 'Open Pattern Library', 'generateblocks' ) }
					showTooltip
					isPressed={ isOpen }
				>
					{ __( 'Patterns', 'generateblocks' ) }
				</Button>,
				portalElement
			) }

			{ !! isOpen && (
				<Modal
					className="gblocks-pattern-library-modal"
					isFullScreen
					onRequestClose={ () => setIsOpen( false ) }
				>
					<LibraryProvider>
						<LibraryLayout setIsOpen={ setIsOpen } />
					</LibraryProvider>
				</Modal>
			) }
		</>
	);
}

registerPlugin(
	'gb-pattern-library',
	{
		render: PatternLibrary,
	}
);

import { Button, Modal } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { createPortal, useState } from '@wordpress/element';
import { LibraryProvider } from './components/library-provider';
import LibraryLayout from './components/library-layout';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import getIcon from '../utils/get-icon';

function PatternLibrary() {
	const [ isOpen, setIsOpen ] = useState( false );
	const toolbar = document.querySelector( '.edit-post-header-toolbar__left' ) || document.querySelector( '.editor-document-tools__left' );

	return (
		<>
			{ !! toolbar && createPortal(
				<Button
					variant="primary"
					className="gblocks-pattern-library-button"
					onClick={ () => setIsOpen( true ) }
					icon={ getIcon( 'pattern-library' ) }
					label={ __( 'Open Pattern Library', 'generateblocks' ) }
					showTooltip
					isPressed={ isOpen }
				>
					{ __( 'Patterns', 'generateblocks' ) }
				</Button>,
				toolbar
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

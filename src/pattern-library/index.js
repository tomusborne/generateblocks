import { Button, Modal, PanelBody } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useState, useEffect } from '@wordpress/element';
import { LibraryProvider } from './components/library-provider';
import LibraryLayout from './components/library-layout';
import { __ } from '@wordpress/i18n';
import { PluginSidebar, store as editPostStore } from '@wordpress/edit-post';
import './editor.scss';
import getIcon from '../utils/get-icon';
import { useSelect, useDispatch } from '@wordpress/data';

function PatternLibrary() {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ currentPanel, setCurrentPanel ] = useState( '' );
	const button = document.querySelector( 'button[aria-controls="gblocks-pattern-library-sidebar:gblocks-pattern-library"]' );
	const { getActiveGeneralSidebarName } = useSelect( ( select ) => select( editPostStore ), [] );
	const { openGeneralSidebar } = useDispatch( editPostStore );

	function triggerModal() {
		setIsOpen( true );

		const activePanel = getActiveGeneralSidebarName();
		setCurrentPanel( activePanel ?? '' );
	}

	function closeModal() {
		setIsOpen( false );
		openGeneralSidebar( currentPanel ?? '' );
	}

	useEffect( () => {
		if ( ! button ) {
			return;
		}

		button.addEventListener( 'click', triggerModal );

		return () => {
			button.removeEventListener( 'click', triggerModal );
		};
	}, [ button ] );

	return (
		<PluginSidebar
			name="gblocks-pattern-library"
			title={ __( 'Pattern Library', 'generateblocks-pro' ) }
			icon={ getIcon( 'pattern-library' ) }
		>
			<PanelBody>
				<Button
					className="gblocks-pattern-library-button"
					variant="secondary"
					onClick={ () => setIsOpen( true ) }
					label={ __( 'Open Pattern Library', 'generateblocks' ) }
					showTooltip
					isPressed={ isOpen }
				>
					{ __( 'Launch Pattern Library', 'generateblocks' ) }
				</Button>
			</PanelBody>

			{ !! isOpen && (
				<Modal
					className="gblocks-pattern-library-modal"
					isFullScreen
					onRequestClose={ closeModal }
				>
					<LibraryProvider>
						<LibraryLayout closeModal={ closeModal } />
					</LibraryProvider>
				</Modal>
			) }
		</PluginSidebar>
	);
}

registerPlugin( 'gblocks-pattern-library-sidebar', {
	render: PatternLibrary,
} );

import { BaseControl, Button, Modal, PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { LibraryProvider } from './components/library-provider';
import LibraryLayout from './components/library-layout';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './editor.scss';

function PatternLibrary( content ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<>
			<PanelBody>
				<BaseControl
					label={ __( 'Pattern Library', 'generateblocks' ) }
					id=""
				>
					<br />
					<Button
						className="gblocks-pattern-library-button"
						variant="secondary"
						onClick={ () => setIsOpen( true ) }
						isPressed={ isOpen }
					>
						{ __( 'Open Pattern Library', 'generateblocks' ) }
					</Button>
				</BaseControl>
			</PanelBody>

			{ content }

			{ !! isOpen && (
				<Modal
					className="gblocks-pattern-library-modal"
					isFullScreen
					onRequestClose={ () => setIsOpen( false ) }
				>
					<LibraryProvider>
						<LibraryLayout closeModal={ () => setIsOpen( false ) } />
					</LibraryProvider>
				</Modal>
			) }
		</>
	);
}

addFilter(
	'generateblocks.editor.sidebar',
	'generateblocks/pattern-library',
	PatternLibrary
);

import './editor.scss';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { withTemplateContext } from '../../extend/template-selector/templateContext';
import { Button, Modal, Placeholder } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import LibraryLayout from './components/library-layout';
import { LibraryProvider } from './components/library-provider';

function PatternLibraryEdit( { clientId } ) {
	const { removeBlock } = useDispatch( 'core/block-editor' );
	const [ isOpen, setIsOpen ] = useState( true );

	return (
		<div className="wp-block">
			<Placeholder
				label={ __( 'Pattern Library', 'generateblocks' ) }
				instructions={ __( 'Insert pre-built patterns directly into your content.', 'generateblocks' ) }
				className="gb-select-layout"
			>
				<Button
					variant="primary"
					onClick={ () => setIsOpen( true ) }
				>
					{ __( 'Choose patterns', 'generateblocks' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ () => removeBlock( clientId ) }
				>
					{ __( 'Cancel', 'generateblocks' ) }
				</Button>
			</Placeholder>

			{ isOpen && (
				<Modal
					title={ __( 'Pattern Library', 'generateblocks' ) }
					isFullScreen
					onRequestClose={ ( event ) => {
						if ( 'blur' === event.type ) {
							return;
						}

						removeBlock( clientId );
					} }
				>
					<LibraryProvider clientId={ clientId }>
						<LibraryLayout />
					</LibraryProvider>
				</Modal>
			) }
		</div>
	);
}

export default compose(
	withTemplateContext,
)( PatternLibraryEdit );

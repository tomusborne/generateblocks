import { Button, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import { useLibrary } from './library-provider';

function DefaultMessage( { setShowAddLibrary, setLibraries } ) {
	const content = (
		<>
			<p>{ __( 'This feature requires GenerateBlocks Pro.', 'generateblocks' ) }</p>
		</>
	);

	return applyFilters( 'generateblocks.patternLibrary.addLibraryContent', content, { setShowAddLibrary, setLibraries } );
}

export default function AddLibrary() {
	const [ showAddLibrary, setShowAddLibrary ] = useState( false );
	const { setLibraries } = useLibrary();

	return (
		<>
			<Button
				variant="secondary"
				icon={ plus }
				onClick={ () => setShowAddLibrary( true ) }
				label={ __( 'Add Library', 'generateblocks' ) }
			/>

			{ !! showAddLibrary &&
				<Modal
					title={ __( 'Add Library', 'generateblocks' ) }
					onRequestClose={ () => setShowAddLibrary( false ) }
					className="gblocks-patterns-add-library"
				>
					<DefaultMessage
						setShowAddLibrary={ setShowAddLibrary }
						setLibraries={ setLibraries }
					/>
				</Modal>
			}
		</>
	);
}

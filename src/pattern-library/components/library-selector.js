import { Button, ButtonGroup } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { useLibrary } from './library-provider';
import AddLibrary from './add-library';

export default function LibrarySelector( { readOnly } ) {
	const {
		libraries,
		activeLibrary,
		setActiveLibrary,
		setIsLocal,
		setPublicKey,
		setActiveCategory,
		loading,
	} = useLibrary();

	const visibleLibraries = applyFilters(
		'generateblocks.patternLibrary.libraries',
		libraries
	);

	return (
		<div className="pattern-library-selector">
			<ButtonGroup>
				{ visibleLibraries.map( ( library ) => (
					<Button
						key={ library.id }
						isPressed={ library.id === activeLibrary.id }
						variant="secondary"
						onClick={ () => {
							setActiveLibrary( library );
							setIsLocal( !! library.isLocal );
							setPublicKey( library.publicKey );
							setActiveCategory( '' );
						} }
						style={ {
							pointerEvents: !! loading ? 'none' : '',
						} }
					>
						{ library.name }
					</Button>
				) ) }

				{ ! readOnly && (
					<AddLibrary />
				) }
			</ButtonGroup>
		</div>
	);
}

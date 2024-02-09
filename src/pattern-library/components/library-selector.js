import { Button, ButtonGroup } from '@wordpress/components';
import { useLibrary } from './library-provider';
import AddLibrary from './add-library';

export default function LibrarySelector() {
	const {
		libraries,
		activeLibrary,
		setActiveLibrary,
		setIsLocal,
		setPublicKey,
		setActiveCategory,
		loading,
	} = useLibrary();

	return (
		<div className="pattern-library-selector">
			<ButtonGroup>
				{ libraries.map( ( library ) => (
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

				<AddLibrary />
			</ButtonGroup>
		</div>
	);
}

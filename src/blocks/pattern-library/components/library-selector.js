import { Button, ButtonGroup } from '@wordpress/components';
import { useLibrary } from './library-provider';

export default function LibrarySelector() {
	const {
		libraries,
		activeLibrary,
		setActiveLibrary,
		setIsLocal,
		setPublicKey,
	} = useLibrary();

	return (
		<div className="pattern-library-selector">
			<ButtonGroup>
				{ libraries.map( ( library ) => (
					<Button
						key={ library.id }
						isSmall
						isPressed={ library.id === activeLibrary }
						variant="secondary"
						onClick={ () => {
							setActiveLibrary( library.id );
							setIsLocal( !! library.isLocal );
							setPublicKey( library.publicKey );
						} }
					>
						{ library.name }
					</Button>
				) ) }
			</ButtonGroup>
		</div>
	);
}

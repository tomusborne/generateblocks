import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { useLibrary } from './library-provider';
import { arrowLeft, plus } from '@wordpress/icons';

export default function PatternTree( { pattern } ) {
	const { clientId, setActivePatternId, setHoverPattern } = useLibrary();
	const { insertBlocks, removeBlock } = useDispatch( 'core/block-editor' );

	return (
		<div className="pattern-tree">
			<Button
				icon={ arrowLeft }
				onClick={ () => setActivePatternId( '' ) }
			>
				{ __( 'Return to library' ) }
			</Button>

			<Button
				icon={ plus }
				variant="primary"
				onClick={ () => {
					insertBlocks( parse( pattern.pattern, {} ), undefined, undefined, false );
					removeBlock( clientId );
				} }
			>
				{ sprintf( 'Add: %s', pattern.label ) }
			</Button>

			{ pattern.tree.length > 1 && pattern.tree.map( ( child ) => (
				<Button
					key={ child.id }
					variant="tertiary"
					icon={ plus }
					onClick={ () => {
						insertBlocks( parse( child.pattern, {} ), undefined, undefined, false );
						removeBlock( clientId );
					} }
					onMouseEnter={ () => setHoverPattern( child.id ) }
					onMouseLeave={ () => setHoverPattern( '' ) }
				>
					{ sprintf( 'Add: %s', child.label ) }
				</Button>
			) ) }
		</div>
	);
}

import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { useLibrary } from './library-provider';
import { arrowLeft, Icon } from '@wordpress/icons';

export default function PatternTree( { pattern } ) {
	const { clientId, setActivePatternId, setHoverPattern } = useLibrary();
	const { insertBlocks, removeBlock } = useDispatch( 'core/block-editor' );

	return (
		<div className="pattern-tree">
			<Button
				icon={ <Icon icon={ arrowLeft } /> }
				onClick={ () => setActivePatternId( '' ) }
			>
				{ __( 'Return to library' ) }
			</Button>

			<Button
				icon="plus"
				iconPosition="right"
				onClick={ () => {
					insertBlocks( parse( pattern.pattern, {} ), undefined, undefined, false );
					removeBlock( clientId );
				} }
				onMouseEnter={ () => setHoverPattern( pattern.id ) }
				onMouseLeave={ () => setHoverPattern( '' ) }
			>
				{ sprintf( 'Add to page: %s', pattern.id ) }
			</Button>

			{ pattern.tree && pattern.tree.map( ( child ) => (
				<Button
					key={ child.id }
					icon="plus"
					iconPosition="right"
					onClick={ () => {
						insertBlocks( parse( child.pattern, {} ), undefined, undefined, false );
						removeBlock( clientId );
					} }
					onMouseEnter={ () => setHoverPattern( child.id ) }
					onMouseLeave={ () => setHoverPattern( '' ) }
				>
					{ sprintf( 'Add to page: %s', child.id ) }
				</Button>
			) ) }
		</div>
	);
}

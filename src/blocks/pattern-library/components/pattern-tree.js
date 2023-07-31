import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useLibrary } from './library-provider';
import { plus } from '@wordpress/icons';
import getIcon from '../../../utils/get-icon';
import { toast } from 'react-toastify';

export default function PatternTree( { pattern } ) {
	const { clientId, setHoverPattern, setScrollToPattern } = useLibrary();
	const { insertBlocks, removeBlock } = useDispatch( 'core/block-editor' );
	const { getBlockParents } = useSelect( 'core/block-editor' );

	return (
		<div className="pattern-tree">
			<Button
				icon={ plus }
				className="pattern-tree__insert-button"
				variant="primary"
				onClick={ () => {
					const parentClientId = getBlockParents( clientId, true )[ 0 ] ?? undefined;
					insertBlocks( parse( pattern.pattern, {} ), undefined, parentClientId, false );
					removeBlock( clientId );
				} }
			>
				{ pattern.label }
			</Button>

			{ pattern.tree.length > 1 &&
				<div className="pattern-tree__items">
					{ pattern.tree.map( ( child ) => (
						<div
							key={ child.id }
							className="pattern-tree__item"
						>
							<div className="pattern-tree__item-name">{ child.label }</div>
							<div className="pattern-tree__item-actions">
								<Button
									variant="secondary"
									icon={ plus }
									onClick={ () => {
										const parentClientId = getBlockParents( clientId, true )[ 0 ] ?? undefined;
										insertBlocks( parse( child.pattern, {} ), undefined, parentClientId, false );
										toast( __( 'Pattern part successfully inserted!', 'generateblocks' ) );
									} }
								/>
								<Button
									variant="tertiary"
									icon={ getIcon( 'eye' ) }
									onClick={ () => {
										setScrollToPattern( child.id );
										setHoverPattern( child.id );

										setTimeout( () => setHoverPattern( '' ), 500 );
									} }
								/>
							</div>
						</div>
					) ) }
				</div>
			}
		</div>
	);
}

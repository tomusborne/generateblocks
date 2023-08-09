import { Button, Icon, Tooltip } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useLibrary } from './library-provider';
import { check, plus } from '@wordpress/icons';
import getIcon from '../../../utils/get-icon';
import { toast } from 'react-toastify';
import { useState } from '@wordpress/element';

export default function PatternTree( { pattern } ) {
	const { clientId, setHoverPattern, hoverPattern } = useLibrary();
	const { insertBlocks, removeBlock } = useDispatch( 'core/block-editor' );
	const { getBlockParents } = useSelect( 'core/block-editor' );
	const [ partInserted, setPartInserted ] = useState( '' );

	return (
		<div className="pattern-tree">
			<Tooltip text={ __( 'Insert full pattern', 'generateblocks' ) }>
				<button
					className="pattern-tree__insert-button components-button is-primary"
					onClick={ () => {
						const parentClientId = getBlockParents( clientId, true )[ 0 ] ?? undefined;
						insertBlocks( parse( pattern.pattern, {} ), undefined, parentClientId, false );
						removeBlock( clientId );
					} }
				>
					<span>{ pattern.label }</span>
					<Icon icon={ plus } />
				</button>
			</Tooltip>

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
									icon={ child.id !== partInserted ? plus : check }
									label={ __( 'Insert Pattern Part', 'generateblocks' ) }
									showTooltip={ true }
									onClick={ () => {
										const parentClientId = getBlockParents( clientId, true )[ 0 ] ?? undefined;
										insertBlocks( parse( child.pattern, {} ), undefined, parentClientId, false );
										toast( __( 'Pattern part successfully inserted!', 'generateblocks' ) );
										setPartInserted( child.id );
										setTimeout( () => setPartInserted( '' ), 2000 );
									} }
								/>
								<Button
									variant={ child.id === hoverPattern ? 'primary' : 'tertiary' }
									icon={ child.id === hoverPattern ? getIcon( 'eye-no' ) : getIcon( 'eye' ) }
									label={ __( 'View Pattern Part', 'generateblocks' ) }
									showTooltip={ true }
									onClick={ () => {
										setHoverPattern( hoverPattern !== child.id ? child.id : '' );
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

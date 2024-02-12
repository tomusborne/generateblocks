import { Button } from '@wordpress/components';
import { seen } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useLibrary } from './library-provider';
import { InsertPattern } from './insert-pattern';
import { updateUniqueIds } from '../utils';

export function PatternDetails( {
	pattern,
	patternRef = null,
	children,
	showPreview = true,
	bulkInsertEnabled,
	showTitle = true,
	globalStyleData,
	closeModal,
} ) {
	const {
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();
	const { insertBlocks } = useDispatch( blockEditorStore );
	const { getBlockInsertionPoint } = useSelect( ( select ) => select( blockEditorStore ), [] );
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	return (
		<div className="gb-pattern-details">
			{ !! showTitle && (
				<h3>{ pattern.label }</h3>
			) }

			<div className="gb-pattern-details__actions">
				{ ! bulkInsertEnabled && (
					<InsertPattern
						label={ __( 'Insert', 'generateblocks' ) }
						onClick={ async( e ) => {
							e.stopPropagation();

							const blockInsertionPoint = getBlockInsertionPoint();
							const renderedPattern = parse( pattern.pattern );

							await insertBlocks(
								renderedPattern,
								blockInsertionPoint?.index ?? 0,
								blockInsertionPoint.rootClientId ?? ''
							);

							const updatedBlocks = updateUniqueIds( renderedPattern );

							updatedBlocks.forEach( ( block ) => {
								if ( block.attributes && block.clientId ) {
									updateBlockAttributes( block.clientId, block.attributes );
								}
							} );

							closeModal();
						} }
						patterns={ [ pattern ] }
						globalStyleData={ globalStyleData }
					/>
				) }

				{ ( showPreview && ! bulkInsertEnabled ) && (
					<Button
						variant="tertiary"
						icon={ seen }
						label={ __( 'Preview', 'generateblocks' ) }
						showTooltip
						onClick={ ( e ) => {
							e.stopPropagation();
							setActivePatternId( pattern.id );

							if ( patternRef ) {
								const patternContent = patternRef.current.closest( '.gb-pattern-library__content' );

								if ( patternContent ) {
									setScrollPosition( patternContent.scrollTop );
								}
							}
						} }
					/>
				) }
				{ children }
			</div>
		</div>
	);
}

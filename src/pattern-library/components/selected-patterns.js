import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { lineSolid, seen } from '@wordpress/icons';
import { useRef } from '@wordpress/element';
import { SortableList } from '../../components/dnd';
import { useLibrary } from './library-provider';
import { InsertPattern } from './insert-pattern';
import { updateUniqueIds } from '../utils';

export function SelectedPatterns( { closeModal, globalStyleData } ) {
	const { insertBlocks } = useDispatch( blockEditorStore );
	const {
		selectedPatterns = [],
		selectedPatternsDispatch,
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();
	const { getBlockInsertionPoint } = useSelect( ( select ) => select( blockEditorStore ), [] );
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	if ( ! selectedPatterns.length ) {
		return null;
	}

	const ZeroWidthSpace = () => <>&#8203;</>;

	function SelectedPattern( { item: pattern } ) {
		const ref = useRef( null );

		return (
			<div
				id={ `selected-pattern-${ pattern.id }` }
				className="gb-selected-pattern"
				ref={ ref }
			>
				<span className="gb-selected-pattern__label" title={ pattern.label }>
					{ pattern.label }
				</span>
				<div className="gb-selected-pattern__actions">
					<ZeroWidthSpace />
					<Button
						variant="tertiary"
						icon={ lineSolid }
						label={ __( 'Remove Pattern', 'generateblocks' ) }
						onClick={ () => {
							selectedPatternsDispatch( { type: 'REMOVE', pattern } );
						} }
					/>
					<Button
						variant="tertiary"
						icon={ seen }
						label={ __( 'Preview Pattern', 'generateblocks' ) }
						showTooltip
						onClick={ () => {
							setActivePatternId( pattern.id );
							const patternContent = ref.current.closest( '.gb-pattern-library__content' );

							if ( patternContent ) {
								setScrollPosition( patternContent.scrollTop );
							}
						} }
					/>
				</div>
			</div>
		);
	}

	return (
		<aside className="gb-selected-patterns">
			<h3 className="gb-selected-patterns__headline">
				{ __( 'Selected Patterns', 'generateblocks' ) }
			</h3>
			<SortableList
				className="gb-selected-patterns__list"
				items={ selectedPatterns }
				dragHandleLabel={ __( 'Reorder Pattern', 'generateblocks' ) }
				setItems={ ( items ) => {
					selectedPatternsDispatch( { type: 'SET', patterns: items } );
				} }
				itemComponent={ SelectedPattern }
				dragHandle={ true }
			/>
			<InsertPattern
				className="gb-selected-patterns__insert"
				label={ __( 'Insert All', 'generateblocks' ) }
				patterns={ selectedPatterns }
				globalStyleData={ globalStyleData }
				onClick={ async() => {
					const blockReplacements = selectedPatterns.reduce( ( prev, current ) => prev + current.pattern, '' );
					const blockInsertionPoint = getBlockInsertionPoint();
					const renderedPatterns = parse( blockReplacements );

					await insertBlocks(
						renderedPatterns,
						blockInsertionPoint?.index ?? 0,
						blockInsertionPoint.rootClientId ?? ''
					);

					const updatedBlocks = updateUniqueIds( renderedPatterns );

					updatedBlocks.forEach( ( block ) => {
						if ( block.attributes && block.clientId ) {
							updateBlockAttributes( block.clientId, block.attributes );
						}
					} );

					closeModal();
				} }
			/>
		</aside>
	);
}

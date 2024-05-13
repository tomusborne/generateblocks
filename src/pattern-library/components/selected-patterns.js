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
import { isEmptyContentBlock, updateUniqueIds } from '../utils';

export function SelectedPatterns( { closeModal, globalStyleData, setBulkInsertEnabled, filteredPatterns } ) {
	const { insertBlocks, replaceBlock } = useDispatch( blockEditorStore );
	const {
		selectedPatterns = [],
		selectedPatternsDispatch,
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();
	const { getBlockInsertionPoint, getSelectedBlock } = useSelect( ( select ) => select( blockEditorStore ), [] );
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
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
						disabled={ ! filteredPatterns.find( ( { id } ) => id === pattern.id ) }
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
				{ __( 'Bulk Insert', 'generateblocks' ) }
			</h3>

			{ ! selectedPatterns.length && (
				<p>{ __( 'Select patterns to insert.', 'generateblocks' ) }</p>
			) }

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

			<div style={ { display: 'flex', gap: '5px', justifyContent: 'space-between', marginTop: '1em' } }>
				<InsertPattern
					label={ __( 'Insert All', 'generateblocks' ) }
					patterns={ selectedPatterns }
					globalStyleData={ globalStyleData }
					disabled={ ! selectedPatterns.length }
					onClick={ async() => {
						const blockReplacements = selectedPatterns.reduce( ( prev, current ) => prev + current.pattern, '' );
						const blockInsertionPoint = getBlockInsertionPoint();
						const renderedPatterns = parse( blockReplacements );
						const updatedBlocks = updateUniqueIds( renderedPatterns );
						const selectedBlock = getSelectedBlock();

						updatedBlocks.forEach( ( block ) => {
							if ( block.attributes && block.clientId ) {
								updateBlockAttributes( block.clientId, block.attributes );
							}
						} );

						const isEmptyContent = isEmptyContentBlock( selectedBlock );

						if ( isEmptyContent ) {
							await replaceBlock(
								selectedBlock.clientId,
								updatedBlocks
							);
						} else {
							await insertBlocks(
								updatedBlocks,
								blockInsertionPoint?.index ?? 0,
								blockInsertionPoint.rootClientId ?? ''
							);
						}

						closeModal();
					} }
				/>

				<Button
					variant="secondary"
					onClick={ () => setBulkInsertEnabled( false ) }
					isDestructive
				>
					{ __( 'Cancel', 'generateblocks' ) }
				</Button>
			</div>
		</aside>
	);
}

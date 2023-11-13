import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { lineSolid, seen } from '@wordpress/icons';
import { useLibrary } from './library-provider';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = ( isDragging, draggableStyle ) => ( {
	// some basic styles to make the items look a bit nicer

	// change background colour if dragging
	background: isDragging ? '#f0f0f0' : '#ffffff',
	marginLeft: isDragging ? '-40px' : '',

	// styles we need to apply on draggables
	...draggableStyle,
} );

const getListStyle = ( isDraggingOver ) => ( {
	background: isDraggingOver ? 'lightblue' : '#ffffff',
} );

export function SelectedPatterns() {
	const { replaceBlock } = useDispatch( blockEditorStore );
	const {
		clientId,
		selectedPatterns = [],
		selectedPatternsDispatch,
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();

	if ( ! selectedPatterns.length ) {
		return null;
	}

	const reorder = ( list, startIndex, endIndex ) => {
		const result = Array.from( list );
		const [ removed ] = result.splice( startIndex, 1 );
		result.splice( endIndex, 0, removed );

		return result;
	};

	function onDragEnd( result ) {
		// dropped outside the list
		if ( ! result.destination ) {
			return;
		}

		const reorderedPatterns = reorder(
			selectedPatterns,
			result.source.index,
			result.destination.index
		);

		selectedPatternsDispatch( { type: 'SET', patterns: reorderedPatterns } );
	}

	const verticalDots = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
		>
			<rect
				width="256"
				height="256"
				fill="none"
			/>
			<circle
				cx="128"
				cy="60"
				r="16"
			/>
			<circle
				cx="128"
				cy="128"
				r="16"
			/>
			<circle
				cx="128"
				cy="196"
				r="16"
			/>
		</svg>
	);

	const ZeroWidthSpace = () => <>&#8203;</>;

	// This has to be a div to avoid conflicts with buttons in the native WP UI
	// Appropriate aria attributes are added by the library.
	const ReorderButton = ( props ) => {
		return (
			<div
				className="components-button is-tertiary has-icon"
				{ ...props }
			>
				{ verticalDots }
				<span className="screen-reader-text">
					{ __( 'Reorder Pattern', 'generateblocks' ) }
				</span>
			</div>
		);
	};

	return (
		<aside className="gb-selected-patterns">
			<h3 className="gb-selected-patterns__headline">
				{ __( 'Selected Patterns', 'generateblocks' ) }
			</h3>
			<DragDropContext onDragEnd={ onDragEnd }>
				<Droppable droppableId="droppable">
					{ ( provided, snapshot ) => (
						<ul className="gb-selected-patterns__list" ref={ provided.innerRef } style={ getListStyle( snapshot.isDraggingOver ) }>
							{ selectedPatterns.map( ( pattern, index ) => (
								<Draggable key={ pattern.id } draggableId={ pattern.id } index={ index }>
									{ ( draggableProvided, draggableSnapshot ) => (
										<>
											{ pattern !== null && (
												<li
													id={ `selected-pattern-${ pattern.id }` }
													className="gb-selected-pattern"
													ref={ draggableProvided.innerRef }
													{ ...draggableProvided.draggableProps }
													style={ getItemStyle(
														draggableSnapshot.isDragging,
														draggableProvided.draggableProps.style
													) }
												>
													<ReorderButton { ...draggableProvided.dragHandleProps } />
													<span className="gb-selected-pattern__label">
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
																const modal = provided.innerRef.current.closest( '.components-modal__content' );

																if ( modal ) {
																	setScrollPosition( modal.scrollTop );
																}
															} }
														/>
													</div>
												</li>
											) }
										</>
									) }
								</Draggable>
							) ) }
							{ provided.placeholder }
						</ul>
					) }
				</Droppable>
			</DragDropContext>
			<Button
				variant="primary"
				onClick={ () => {
					// const blockReplacements = selectedPatterns.map( ( [ , pattern ] ) => pattern.pattern ) ?? [];
					const blockReplacements = selectedPatterns.reduce( ( prev, current ) => prev + current.pattern, '' );

					replaceBlock( clientId, parse( blockReplacements, {} ) );
				} }
			>
				{ __( 'Insert All', 'generateblocks' ) }
			</Button>
		</aside>
	);
}

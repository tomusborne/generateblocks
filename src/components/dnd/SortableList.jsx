import { useState, forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
	restrictToVerticalAxis,
	restrictToParentElement,
} from '@dnd-kit/modifiers';
import { SortableListItem } from './SortableListItem.jsx';
import classnames from 'classnames';

import './editor.scss';

export const SortableList = forwardRef( function SortableList( {
	itemComponent,
	onDragStart,
	onDragEnd,
	items,
	setItems,
	dragHandle = true,
	dragHandleLabel = __( 'Reorder Item', 'generateblocks' ),
	className = '',
}, ref ) {
	const [ isDragging, setIsDragging ] = useState( false );
	const [ activeItem, setActiveItem ] = useState( null );
	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		} )
	);

	const ItemComponent = itemComponent;

	function reorderItems( event ) {
		const { active, over } = event;
		const overDisabled = over.data.current?.disabled ?? false;

		if ( active.id !== over.id && ! overDisabled ) {
			const oldIndex = items.findIndex( ( item ) => item.id === active.id );
			const newIndex = items.findIndex( ( item ) => item.id === over.id );

			setItems( arrayMove( items, oldIndex, newIndex ) );
		}
	}

	return (
		<DndContext
			modifiers={ [ restrictToVerticalAxis, restrictToParentElement ] }
			sensors={ sensors }
			collisionDetection={ closestCenter }
			onDragStart={ ( e ) => {
				const { active } = e;
				setIsDragging( true );
				setActiveItem( active );

				if ( onDragStart ) {
					onDragStart( e );
				}
			} }
			onDragEnd={ ( e ) => {
				setIsDragging( false );
				reorderItems( e );
				setActiveItem( null );

				if ( onDragEnd ) {
					onDragEnd( e, activeItem );
				}
			} }
		>
			<ul
				className={ classnames( 'gb-sortable-list', className, isDragging && 'is-dragging' ) }
				ref={ ref }
			>
				<SortableContext
					items={ items }
					strategy={ verticalListSortingStrategy }
				>
					{ items.map( ( item ) => (
						<SortableListItem
							key={ item.id }
							id={ item.id }
							dragHandle={ dragHandle }
							dragHandleLabel={ dragHandleLabel }
							className="gb-sortable-list__item"
							disabled={ item.disabled ?? false }
						>
							<ItemComponent item={ item } />
						</SortableListItem>
					) ) }
				</SortableContext>
			</ul>
		</DndContext>
	);
} );

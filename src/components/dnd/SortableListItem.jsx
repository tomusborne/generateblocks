import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classnames from 'classnames';

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
			cx="91"
			cy="60"
			r="16"
		/>
		<circle
			cx="91"
			cy="128"
			r="16"
		/>
		<circle
			cx="91"
			cy="196"
			r="16"
		/>
		<circle
			cx="161"
			cy="60"
			r="16"
		/>
		<circle
			cx="161"
			cy="128"
			r="16"
		/>
		<circle
			cx="161"
			cy="196"
			r="16"
		/>
	</svg>
);

export function SortableListItem( {
	children,
	id,
	dragHandle = true,
	dragHandleLabel = __( 'Reorder Item', 'generateblocks' ),
	as = 'li',
	className = '',
	disabled = false,
} ) {
	const {
		active,
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable( {
		id,
		disabled,
		data: {
			disabled,
		},
	} );

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};

	if ( active && active.id === id ) {
		style.zIndex = 1;
	}

	const Element = as;

	const elementProps = dragHandle ? {
		ref: setNodeRef,
		style,
	} : {
		ref: setNodeRef,
		style,
		...attributes,
		...listeners,
	};

	return (
		<Element className={ classnames( 'gb-sortable-listitem', className, isDragging && 'is-dragging' ) } { ...elementProps }>
			{ dragHandle && (
				<Button
					className="gb-sortable-listitem__handle"
					variant="tertiary"
					showTooltip={ false }
					icon={ verticalDots }
					label={ dragHandleLabel }
					{ ...attributes }
					{ ...listeners }
				/>
			) }
			{ children }
		</Element>
	);
}

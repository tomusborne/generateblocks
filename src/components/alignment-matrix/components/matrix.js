import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import Cell from './cell';

const cellsLabels = {
	topLeft: __( 'Top left', 'generateblocks' ),
	topCenter: __( 'Top center', 'generateblocks' ),
	topRight: __( 'Top right', 'generateblocks' ),
	centerLeft: __( 'Center left', 'generateblocks' ),
	centerCenter: __( 'Center', 'generateblocks' ),
	centerRight: __( 'Center right', 'generateblocks' ),
	bottomLeft: __( 'Bottom left', 'generateblocks' ),
	bottomCenter: __( 'Bottom center', 'generateblocks' ),
	bottomRight: __( 'Bottom right', 'generateblocks' ),
};

export default function Matrix( {
	onChange,
	activeCell = 'centerCenter',
	isCompact = false,
	isOpen = false,
	direction = '',
} ) {
	const matrixCells = [
		'topLeft',
		'topCenter',
		'topRight',
		'centerLeft',
		'centerCenter',
		'centerRight',
		'bottomLeft',
		'bottomCenter',
		'bottomRight',
	];

	const wrapperClassNames = classNames(
		'gb-matrix',
		{
			'is-compact': isCompact,
			'is-open': isOpen,
			'is-row': 'row' === direction || 'row-reverse' === direction,
			'is-column': 'column' === direction || 'column-reverse' === direction,
		}
	);

	return (
		<div className={ wrapperClassNames }>
			{ matrixCells.map( ( cell ) => (
				<Cell
					key={ cell }
					label={ cellsLabels[ cell ] }
					isCompact={ isCompact }
					isActive={ activeCell === cell }
					onClick={ !! onChange ? () => onChange( cell ) : undefined }
				/>
			) )
			}
		</div>
	);
}

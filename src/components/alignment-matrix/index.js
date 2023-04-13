import { Dropdown, ToolbarButton } from '@wordpress/components';
import './styles.scss';
import { useEffect, useState } from '@wordpress/element';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

function Matrix( {
	onChange,
	activeCell = 'centerCenter',
	isCompact = false,
	isOpen = false,
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

	return (
		<div
			className={ classNames( 'gb-matrix', { 'is-compact': isCompact, 'is-open': isOpen } ) }
		>
			{ matrixCells.map( ( cell ) => (
				<div
					key={ cell }
					className={ classNames( 'gb-matrix-cell', { active: activeCell === cell } ) }
					onClick={ !! onChange ? () => onChange( cell ) : undefined }
					onKeyDown={ !! onChange ? () => onChange( cell ) : undefined }
					role="presentation"
				>
					<span className="gb-matrix-cell-state" />
				</div>
			) )
			}
		</div>
	);
}

function AlignmentMatrix( { options = {}, onChange, value } ) {
	const [ activeCell, setActiveCell ] = useState( '' );

	useEffect( () => {
		onChange( options[ activeCell ] );
	}, [ activeCell ] );

	useEffect( () => {
		setActiveCell( value );
	}, [ value ] );

	return (
		<Dropdown
			className="gb-alignment-matrix"
			contentClassName="gb-alignment-matrix-content"
			popoverProps={ { variant: 'toolbar', placement: 'bottom-start' } }
			renderToggle={ ( { isOpen, onToggle } ) => {
				const openOnArrowDown = ( event ) => {
					if ( ! isOpen && event.keyCode === 40 ) {
						event.preventDefault();
						onToggle();
					}
				};

				return (
					<ToolbarButton
						onClick={ onToggle }
						aria-haspopup="true"
						aria-expanded={ isOpen }
						onKeyDown={ openOnArrowDown }
						label={ __( 'Change content position', 'generateblocks' ) }
						icon={ <Matrix isCompact isOpen={ isOpen } activeCell={ activeCell } /> }
						showTooltip
						disabled={ false }
					/>
				);
			} }
			renderContent={ () => (
				<Matrix
					activeCell={ activeCell }
					onChange={ ( selectedCell ) => {
						setActiveCell( selectedCell );
					} }
				/>
			) }
		/>
	);
}

export default AlignmentMatrix;

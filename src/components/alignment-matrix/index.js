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
		<div
			className={ wrapperClassNames }
		>
			{ matrixCells.map( ( cell ) => (
				<div
					tabIndex={ ! isCompact ? '0' : null }
					key={ cell }
					aria-label={ 'Something' }
					className={ classNames( 'gb-matrix-cell', { active: activeCell === cell } ) }
					onClick={ !! onChange ? () => onChange( cell ) : undefined }
					onKeyDown={ ( e ) => {
						if ( onChange && ( 'Enter' === e.key || ' ' === e.key ) ) {
							onChange( cell );
						}
					} }
					role={ ! isCompact ? 'button' : 'presentation' }
				>
					<span className="gb-matrix-cell-state" />
				</div>
			) )
			}
		</div>
	);
}

function AlignmentMatrix( { options = {}, onChange, value, children, direction } ) {
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
			popoverProps={ { variant: 'toolbar', placement: 'bottom-center' } }
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
						icon={ (
							<Matrix
								isCompact
								isOpen={ isOpen }
								direction={ direction }
								activeCell={ activeCell }
							/>
						) }
						showTooltip
						disabled={ false }
					/>
				);
			} }
			renderContent={ () => (
				<div className="gb-alignment-matrix-content">
					<Matrix
						activeCell={ activeCell }
						onChange={ ( selectedCell ) => {
							setActiveCell( selectedCell );
						} }
					/>
					{ children }
				</div>
			) }
		/>
	);
}

export default AlignmentMatrix;

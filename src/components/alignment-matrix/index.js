import { Dropdown, ToolbarButton } from '@wordpress/components';
import './styles.scss';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Matrix from './components/matrix';

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

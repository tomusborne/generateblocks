import { Dropdown, ToolbarButton } from '@wordpress/components';
import './styles.scss';
import { __ } from '@wordpress/i18n';
import Matrix from './components/matrix';

function AlignmentMatrix( { activeCell, onChange, direction, children } ) {
	return (
		<Dropdown
			className="gb-alignment-matrix"
			contentClassName="gb-alignment-matrix-content"
			popoverProps={ { variant: 'toolbar', placement: 'bottom-center' } }
			focusOnMount={ true }
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
					<div className="gb-alignment-matrix-content-buttons">
						{ children }
					</div>
					<Matrix
						activeCell={ activeCell }
						onChange={ onChange }
					/>
				</div>
			) }
		/>
	);
}

export default AlignmentMatrix;

import { Button } from '@wordpress/components';
import { plus, lineSolid, seen } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useLibrary } from './library-provider';

export function PatternDetails( { pattern, patternRef = null, isSelected = false, children, showPreview = true } ) {
	const {
		clientId,
		setActivePatternId,
		setScrollPosition,
		selectedPatternsDispatch,
	} = useLibrary();
	const { replaceBlock } = useDispatch( blockEditorStore );

	return (
		<div className="gb-pattern-details">
			<h3>{ pattern.label }</h3>
			<div className="gb-pattern-details__actions">
				<Button
					variant="primary"
					icon={ plus }
					onClick={ () => {
						replaceBlock( clientId, parse( pattern.pattern, {} ) );
					} }
				>
					{ __( 'Insert', 'generateblocks' ) }
				</Button>
				<Button
					variant="secondary"
					icon={ isSelected ? lineSolid : plus }
					onClick={ () => {
						const type = isSelected ? 'REMOVE' : 'ADD';
						selectedPatternsDispatch( { type, pattern } );
					} }
				>
					{ isSelected ? __( 'De-select', 'generateblocks' ) : __( 'Select', 'generateblocks' ) }
				</Button>

				{ showPreview && (
					<Button
						variant="tertiary"
						icon={ seen }
						label={ __( 'Preview', 'generateblocks' ) }
						showTooltip
						onClick={ () => {
							setActivePatternId( pattern.id );

							if ( patternRef ) {
								const modal = patternRef.current.closest( '.components-modal__content' );

								if ( modal ) {
									setScrollPosition( modal.scrollTop );
								}
							}
						} }
					/>
				) }
				{ children }
			</div>
		</div>
	);
}

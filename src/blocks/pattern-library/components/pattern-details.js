import { Button } from '@wordpress/components';
import { plus, seen } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useLibrary } from './library-provider';

export function PatternDetails( { pattern, patternRef = null, children, showPreview = true, bulkInsertEnabled } ) {
	const {
		clientId,
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();
	const { replaceBlock } = useDispatch( blockEditorStore );

	return (
		<div className="gb-pattern-details">
			<h3>{ pattern.label }</h3>
			<div className="gb-pattern-details__actions">
				{ ! bulkInsertEnabled && (
					<Button
						variant="primary"
						icon={ plus }
						onClick={ ( e ) => {
							e.stopPropagation();
							replaceBlock( clientId, parse( pattern.pattern, {} ) );
						} }
					>
						{ __( 'Insert', 'generateblocks' ) }
					</Button>
				) }

				{ ( showPreview && ! bulkInsertEnabled ) && (
					<Button
						variant="tertiary"
						icon={ seen }
						label={ __( 'Preview', 'generateblocks' ) }
						showTooltip
						onClick={ ( e ) => {
							e.stopPropagation();
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

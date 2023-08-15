import { Button } from '@wordpress/components';
import { desktop, mobile, plus, seen, tablet } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useLibrary } from './library-provider';

export function PatternDetails( { pattern } ) {
	const { replaceBlock } = useDispatch( blockEditorStore );
	const { clientId, setActivePatternId, activePatternId, previewIframeWidth, setPreviewIframeWidth } = useLibrary();

	return (
		<div className="gb-pattern-details">
			{ ! activePatternId && <h3>{ pattern.label }</h3> }
			<div className="gb-pattern-details__actions">
				<Button
					variant="secondary"
					icon={ plus }
					onClick={ () => {
						replaceBlock( clientId, parse( pattern.pattern, {} ) );
					} }
				>
					{ __( 'Add', 'generateblocks' ) }
				</Button>

				{ !! activePatternId &&
					<>
						<Button
							variant={ '100%' === previewIframeWidth ? 'primary' : 'tertiary' }
							icon={ desktop }
							label={ __( 'Desktop', 'generateblocks' ) }
							showTooltip
							onClick={ () => setPreviewIframeWidth( '100%' ) }
						/>
						<Button
							variant={ '900px' === previewIframeWidth ? 'primary' : 'tertiary' }
							icon={ tablet }
							label={ __( 'Tablet', 'generateblocks' ) }
							showTooltip
							onClick={ () => setPreviewIframeWidth( '900px' ) }
						/>
						<Button
							variant={ '400px' === previewIframeWidth ? 'primary' : 'tertiary' }
							icon={ mobile }
							label={ __( 'Mobile', 'generateblocks' ) }
							showTooltip
							onClick={ () => setPreviewIframeWidth( '400px' ) }
						/>
					</>
				}

				{ ! activePatternId &&
					<Button
						variant="tertiary"
						icon={ seen }
						label={ __( 'Preview', 'generateblocks' ) }
						showTooltip
						onClick={ () => setActivePatternId( pattern.id ) }
					/>
				}
			</div>
		</div>
	);
}

import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useRef } from '@wordpress/element';
import { lineSolid, seen } from '@wordpress/icons';
import { useLibrary } from './library-provider';

export function SelectedPatterns() {
	const { replaceBlock } = useDispatch( blockEditorStore );
	const ref = useRef();
	const {
		clientId,
		selectedPatterns,
		setSelectedPatterns,
		setActivePatternId,
		setScrollPosition,
	} = useLibrary();
	const selectedPatternsList = Object.entries( selectedPatterns );

	if ( ! selectedPatternsList.length ) {
		return null;
	}

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
				cx="128"
				cy="60"
				r="16"
			/>
			<circle
				cx="128"
				cy="128"
				r="16"
			/>
			<circle
				cx="128"
				cy="196"
				r="16"
			/>
		</svg>
	);

	const ZeroWidthSpace = () => <>&#8203;</>;

	return (
		<aside className="gb-selected-patterns">
			<h3 className="gb-selected-patterns__headline">
				{ __( 'Selected Patterns', 'generateblocks' ) }
			</h3>
			<ul className="gb-selected-patterns__list" ref={ ref }>
				{ selectedPatternsList.map( ( [ id, pattern ] ) => (
					<li className="gb-selected-pattern" key={ id }>
						<span className="gb-selected-pattern__label">
							{ pattern.label }
						</span>
						<div className="gb-selected-pattern__actions">
							<ZeroWidthSpace />
							<Button
								variant="tertiary"
								icon={ lineSolid }
								label={ __( 'Remove Pattern', 'generateblocks' ) }
								onClick={ () => {
									const { [ pattern.id ]: removed, ...newSelectedPatterns } = selectedPatterns;
									setSelectedPatterns( {
										...newSelectedPatterns,
									} );
								} }
							/>
							<Button
								variant="tertiary"
								icon={ seen }
								label={ __( 'Preview Pattern', 'generateblocks' ) }
								showTooltip
								onClick={ () => {
									setActivePatternId( pattern.id );
									const modal = ref.current.closest( '.components-modal__content' );

									if ( modal ) {
										setScrollPosition( modal.scrollTop );
									}
								} }
							/>
							<Button
								variant="tertiary"
								icon={ verticalDots }
								label={ __( 'Reorder Pattern', 'generateblocks' ) }
								showTooltip
							/>
						</div>
					</li>
				) ) }
			</ul>
			<Button
				variant="primary"
				onClick={ () => {
					const blockReplacements = selectedPatternsList.map( ( [ , pattern ] ) => pattern.pattern ) ?? [];
					replaceBlock( clientId, parse( blockReplacements.join( '' ), {} ) );
				} }
			>
				{ __( 'Insert All', 'generateblocks' ) }
			</Button>
		</aside>
	);
}

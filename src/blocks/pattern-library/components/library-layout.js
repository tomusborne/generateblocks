import { Button } from '@wordpress/components';
import { close, arrowLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import CategoryList from './category-list';
import LibrarySelector from './library-selector';
import { useLibrary } from './library-provider';
import PatternList from './pattern-list';
import PatternSearch from './pattern-search';
import { SelectedPatterns } from './selected-patterns';
import { PatternDetailsHeader } from './pattern-details-header';
import RequiredComponents from './required-components';
import LibraryCache from './library-cache';
import ManageLibraries from './manage-libraries';

export default function LibraryLayout() {
	const {
		clientId,
		activeLibrary,
		activePatternId,
		setActivePatternId,
		patterns,
		requiredClasses,
		setRequiredClasses,
		setScrollPosition,
		scrollPosition,
	} = useLibrary();
	const { removeBlock } = useDispatch( blockEditorStore );
	const [ bulkInsertEnabled, setBulkInsertEnabled ] = useState( false );
	const activePattern = patterns?.find( ( pattern ) => activePatternId === pattern.id );

	return (
		<div className="pattern-library">
			<div className="pattern-library__header">
				<div className="pattern-library__header--title">
					{ ! activePatternId
						? <h1>{ __( 'Pattern Library', 'generateblocks' ) }</h1>
						: <h1>{ activePattern.label }</h1>
					}
				</div>

				<div className="pattern-library__header--action">
					{ ! activePatternId
						? (
							<>
								<LibrarySelector />
								<Button
									variant="primary"
									onClick={ () => setBulkInsertEnabled( ! bulkInsertEnabled ) }
								>
									{ bulkInsertEnabled ? __( 'Cancel', 'generateblocks' ) : __( 'Bulk Insert…', 'generateblocks' ) }
								</Button>
							</>
						)
						: <PatternDetailsHeader pattern={ activePattern } />
					}
				</div>

				<div className="pattern-library__header--close">
					{ ! activePatternId
						? (
							<>
								<LibraryCache />
								<ManageLibraries />
								<Button
									variant="tertiary"
									icon={ close }
									label={ __( 'Close Pattern Library', 'generateblocks' ) }
									showTooltip={ true }
									onClick={ () => removeBlock( clientId ) }
								/>
							</>
						) : (
							<Button
								icon={ arrowLeft }
								onClick={ () => {
									setActivePatternId( '' );
									setScrollPosition( scrollPosition );
								} }
							>
								{ __( 'Return to library' ) }
							</Button>
						)
					}
				</div>
			</div>

			<div className="pattern-library-layout">
				<RequiredComponents
					activeLibrary={ activeLibrary }
					requiredClasses={ requiredClasses }
					setRequiredClasses={ setRequiredClasses }
				>
					<div className="library-sidebar">
						{ ! activePatternId &&
							<>
								<PatternSearch />
								<CategoryList />
								<SelectedPatterns />
							</>
						}
					</div>
					<div
						className="library-content"
						style={ {
							paddingLeft: !! activePatternId ? 0 : null,
						} }
					>
						<PatternList bulkInsertEnabled={ bulkInsertEnabled } />
					</div>
				</RequiredComponents>
			</div>
		</div>
	);
}

import CategoryList from './category-list';
import LibrarySelector from './library-selector';
import { useLibrary } from './library-provider';
import PatternList from './pattern-list';
import PatternSearch from './pattern-search';
import { Button } from '@wordpress/components';
import { close, arrowLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PatternDetails } from './pattern-details';

export default function LibraryLayout() {
	const { clientId, activePatternId, setActivePatternId, patterns } = useLibrary();
	const { removeBlock } = useDispatch( blockEditorStore );
	const activePattern = patterns.find( ( pattern ) => activePatternId === pattern.id );

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
						? <LibrarySelector />
						: <PatternDetails pattern={ activePattern } />
					}
				</div>

				<div className="pattern-library__header--close">
					{ ! activePatternId
						? (
							<Button
								variant="tertiary"
								icon={ close }
								label={ __( 'Close Pattern Library', 'generateblocks' ) }
								showTooltip={ true }
								onClick={ () => removeBlock( clientId ) }
							/>
						) : (
							<Button
								icon={ arrowLeft }
								onClick={ () => setActivePatternId( '' ) }
							>
								{ __( 'Return to library' ) }
							</Button>
						)
					}
				</div>
			</div>

			<div className="pattern-library-layout">
				<div className="library-sidebar">
					{ ! activePatternId &&
						<>
							<PatternSearch />
							<CategoryList />
						</>
					}
				</div>
				<div
					className="library-content"
					style={ {
						paddingLeft: !! activePatternId ? 0 : null,
					} }
				>
					<PatternList />
				</div>
			</div>
		</div>
	);
}

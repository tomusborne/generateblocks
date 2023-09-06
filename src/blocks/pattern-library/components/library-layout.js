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
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

function RequiredComponents( { isActive, children } ) {
	const [ showRefresh, setShowRefresh ] = useState( false );
	return (
		<>
			{ isActive &&
				<div style={ { maxWidth: '450px', margin: '0 auto' } }>
					<h3>In order to use the library you need to import required components.</h3>
					<p>Click the button below to import. Read more.</p>
					{ ! showRefresh &&
						<Button
							variant="primary"
							onClick={ () => {
								apiFetch( {
									path: '/generateblocks-pro/v1/pattern-library/import-required-components',
									method: 'GET',
								} ).then( () => {
									setShowRefresh( true );
								} );
							} }
						>
							Import
						</Button>
					}
					{ showRefresh &&
						<Button
							variant="secondary"
							onClick={ () => {
								window.location.reload();
							} }
						>
							Refresh page
						</Button>
					}
				</div>
			}

			{ ! isActive && children }
		</>
	);
}

export default function LibraryLayout() {
	const { clientId, activeLibrary, activePatternId, setActivePatternId, patterns } = useLibrary();
	const { removeBlock } = useDispatch( blockEditorStore );
	const activePattern = patterns.find( ( pattern ) => activePatternId === pattern.id );
	const requiredMessageIsActive = (
		'gb_default_pro_library' === activeLibrary &&
		! generateBlocksInfo.hasImportedRequiredComponents
	);

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
				<RequiredComponents isActive={ requiredMessageIsActive }>
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
				</RequiredComponents>
			</div>
		</div>
	);
}

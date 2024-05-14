import { Button } from '@wordpress/components';
import { close, arrowLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import CategoryList from './category-list';
import LibrarySelector from './library-selector';
import { useLibrary } from './library-provider';
import PatternList from './pattern-list';
import PatternSearch from './pattern-search';
import { SelectedPatterns } from './selected-patterns';
import { PatternDetailsHeader } from './pattern-details-header';
import LibraryCache from './library-cache';
import ManageLibraries from './manage-libraries';
import getIcon from '../../utils/get-icon';
import { doAction } from '@wordpress/hooks';

const searchCache = {};

export default function LibraryLayout( { closeModal } ) {
	const {
		activePatternId,
		setActivePatternId,
		patterns,
		setScrollPosition,
		scrollPosition,
		activeCategory,
		search,
		setSearch,
		isLocal,
		activeLibrary,
		selectedPatterns,
	} = useLibrary();
	const [ bulkInsertEnabled, setBulkInsertEnabled ] = useState( false );
	const [ filteredPatterns, setFilteredPatterns ] = useState( patterns );
	const [ globalStyleCSS, setGlobalStyleCSS ] = useState( '' );
	const [ globalStyleData, setGlobalStyleData ] = useState( [] );
	const [ cacheIsClearing, setCacheIsClearing ] = useState( false );
	const activePattern = patterns.find( ( pattern ) => activePatternId === pattern.id );
	const patternContentRef = useRef();

	function filterPatterns( value ) {
		return patterns.filter( ( pattern ) => {
			const viewingAll = activeCategory === '';
			const stringMatch = pattern.label.toLowerCase().includes( value.toLowerCase() );
			const categoryMatch = pattern.categories.includes( activeCategory );

			return viewingAll ? stringMatch : stringMatch && categoryMatch;
		} );
	}

	useEffect( () => {
		if ( activeCategory === '' ) {
			setFilteredPatterns( patterns );
		} else {
			setFilteredPatterns( filterPatterns( search ) );
		}

		if ( patternContentRef.current ) {
			patternContentRef.current.scrollTop = 0;
		}
	}, [ patterns, activeCategory ] );

	function maybeGetCachedSearchResult( value ) {
		const category = activeCategory === '' ? 'all' : activeCategory;
		const library = activeLibrary?.id || '';

		if ( ! searchCache[ library ] || ! searchCache[ library ][ category ] ) {
			searchCache[ library ] = searchCache[ library ] || {};
			searchCache[ library ][ category ] = searchCache[ library ][ category ] || {};
		}

		// Check if the value exists in the cache
		if ( ! searchCache[ library ][ category ][ value ] ) {
			return false;
		}

		return searchCache[ library ][ category ][ value ];
	}

	const contentStyles = {};

	if ( activePatternId ) {
		contentStyles.gridColumn = '1 / -1';
	}

	doAction(
		'generateblocks.patterns.patternsList',
		{ activeLibrary, setGlobalStyleCSS, setGlobalStyleData, isLocal, cacheIsClearing }
	);

	return (
		<div className="gb-pattern-library">
			<div className="gb-pattern-library__header">
				<div className="gb-pattern-library__header-title">
					{ ! activePatternId
						? <h1>{ getIcon( 'generateblocks' ) } { __( 'Pattern Library', 'generateblocks' ) }</h1>
						: <h1>{ activePattern.label }</h1>
					}
				</div>

				<div className="gb-pattern-library__header-action">
					{ ! activePatternId
						? <LibrarySelector />
						: (
							<PatternDetailsHeader
								pattern={ activePattern }
								bulkInsertEnabled={ bulkInsertEnabled }
								globalStyleData={ globalStyleData }
								closeModal={ closeModal }
							/>
						)
					}
				</div>

				<div className="gb-pattern-library__header-close">
					{ ! activePatternId
						? (
							<>
								<LibraryCache
									setCacheIsClearing={ setCacheIsClearing }
									cacheIsClearing={ cacheIsClearing }
								/>
								<ManageLibraries />
								<Button
									variant="tertiary"
									icon={ close }
									label={ __( 'Close Pattern Library', 'generateblocks' ) }
									showTooltip={ true }
									onClick={ closeModal }
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
			<div className="gb-pattern-library__sidebar">
				{ ! activePatternId &&
				<>
					<PatternSearch onChange={ ( value ) => {
						setSearch( value );

						const category = activeCategory === '' ? 'all' : activeCategory;

						// Check if result has been cached already
						const cachedResult = maybeGetCachedSearchResult( value );

						if ( cachedResult ) {
							setFilteredPatterns( cachedResult );
							return;
						}

						const newPatternList = filterPatterns( value );

						const library = activeLibrary?.id;

						if ( library ) {
							searchCache[ library ][ category ][ value ] = newPatternList;
						}

						setFilteredPatterns( newPatternList );
					} } />

					<CategoryList
						bulkInsertEnabled={ bulkInsertEnabled }
						selectedPatterns={ selectedPatterns }
					/>

					{ ! bulkInsertEnabled ? (
						<Button
							variant="primary"
							onClick={ () => setBulkInsertEnabled( true ) }
						>
							{ __( 'Bulk Insert', 'generateblocks' ) }
						</Button>
					) : (
						<SelectedPatterns
							closeModal={ closeModal }
							globalStyleData={ globalStyleData }
							setBulkInsertEnabled={ setBulkInsertEnabled }
							filteredPatterns={ filteredPatterns }
						/>
					) }
				</>
				}
			</div>
			<div
				className="gb-pattern-library__content"
				style={ contentStyles }
				ref={ patternContentRef }
			>
				<PatternList
					patterns={ filteredPatterns }
					bulkInsertEnabled={ bulkInsertEnabled }
					closeModal={ closeModal }
					globalStyleCSS={ globalStyleCSS }
					globalStyleData={ globalStyleData }
				/>
			</div>
		</div>
	);
}

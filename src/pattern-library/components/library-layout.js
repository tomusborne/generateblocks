import { Button } from '@wordpress/components';
import { close, arrowLeft } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState, useEffect, memo, useRef } from '@wordpress/element';
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

const searchCache = {};

export default function LibraryLayout( { setIsOpen } ) {
	const {
		activeLibrary,
		activePatternId,
		setActivePatternId,
		patterns,
		requiredClasses,
		setRequiredClasses,
		setScrollPosition,
		scrollPosition,
		activeCategory,
		search,
		setSearch,
	} = useLibrary();
	const [ bulkInsertEnabled, setBulkInsertEnabled ] = useState( false );
	const [ filteredPatterns, setFilteredPatterns ] = useState( patterns );
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

		if ( ! searchCache[ category ] ) {
			searchCache[ category ] = {};
		}

		if ( ! searchCache[ category ][ value ] ) {
			return false;
		}

		return searchCache[ category ][ value ];
	}

	const contentStyles = {};

	if ( activePatternId ) {
		contentStyles.gridColumn = '1 / -1';
	}

	const MemoizedCategoryList = memo( CategoryList );

	return (
		<div className="gb-pattern-library">
			<div className="gb-pattern-library__header">
				<div className="gb-pattern-library__header-title">
					{ ! activePatternId
						? <h1>{ __( 'Pattern Library', 'generateblocks' ) }</h1>
						: <h1>{ activePattern.label }</h1>
					}
				</div>

				<div className="gb-pattern-library__header-action">
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

				<div className="gb-pattern-library__header-close">
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
									onClick={ () => setIsOpen( false ) }
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
			<RequiredComponents
				activeLibrary={ activeLibrary }
				requiredClasses={ requiredClasses }
				setRequiredClasses={ setRequiredClasses }
			>
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

							searchCache[ category ][ value ] = newPatternList;

							setFilteredPatterns( newPatternList );
						} } />
						<MemoizedCategoryList />
						<SelectedPatterns />
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
					/>
				</div>
			</RequiredComponents>
		</div>
	);
}

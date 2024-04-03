import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useMemo, useRef, useState, useEffect, memo } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PatternDetails } from './pattern-details';
import classnames from 'classnames';

export default function PatternList( {
	bulkInsertEnabled = false,
	patterns = [],
	closeModal,
	globalStyleCSS,
	globalStyleData,
} ) {
	const ref = useRef();
	const loadMoreRef = useRef();
	const {
		activePatternId,
		loading,
		itemsPerPage,
		itemCount,
		setItemCount,
		scrollPosition,
		selectedPatterns,
		selectedPatternsDispatch,
	} = useLibrary();

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	const hide = loading ? { opacity: 0 } : {};
	const [ visiblePatterns, setVisiblePatterns ] = useState( [] );
	const [ loadMore, setLoadMore ] = useState( false );

	useEffect( () => {
		setVisiblePatterns( patterns.slice( 0, itemCount ) );
	}, [ itemCount, patterns ] );

	/**
	 * Set up our infinite scroll.
	 */
	useEffect( () => {
		const intersectionObserver = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						setLoadMore( true );
					}
				} );
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.01,
			}
		);

		if ( loadMoreRef.current ) {
			intersectionObserver.observe( loadMoreRef.current );
		}

		return () => {
			if ( intersectionObserver ) {
				intersectionObserver.disconnect();
			}
		};
	}, [] );

	/**
	 * Load more patterns when we reach the bottom.
	 */
	useEffect( () => {
		if ( ! loadMore ) {
			return;
		}

		if ( activePattern ) {
			setLoadMore( false );
			return;
		}

		setItemCount( itemCount + itemsPerPage );
		setLoadMore( false );
	}, [ loadMore ] );

	/**
	 * Scroll to the last remembered scroll position.
	 * This is used to remember where we were if we preview a pattern and return to the list.
	 */
	useEffect( () => {
		if ( ref.current && ! activePattern ) {
			const patternContent = ref.current.closest( '.gb-pattern-library__content' );

			if ( patternContent ) {
				patternContent.scrollTop = scrollPosition;
			}
		}
	}, [ scrollPosition, activePattern ] );

	const PatternDetailsMemo = memo( PatternDetails );

	return (
		<>
			{ loading && ! activePatternId &&
				<div className="loading-library"><Spinner />
					{ __( 'Loading library', 'generateblocks' ) }
				</div>
			}

			{ ! loading && ! patterns.length && ! activePatternId &&
				<div className="loading-library">
					{ __( 'No patterns found.', 'generateblocks' ) }
				</div>
			}

			{ !! activePattern &&
				<Pattern
					isLoading={ loading }
					isActive={ true }
					pattern={ activePattern }
					globalStyleCSS={ globalStyleCSS }
				/>
			}

			<ul
				ref={ ref }
				className={ classnames( 'patterns-wrapper', bulkInsertEnabled && 'gb-bulk-insert' ) }
				style={ {
					...hide,
					display: !! activePattern ? 'none' : '',
				} }
			>
				{ visiblePatterns.map( ( pattern ) => {
					const isSelected = selectedPatterns.some( ( { id } ) => id === pattern.id ) ?? false;

					return (
						<li
							key={ pattern.id }
							className={ classnames( 'gb-pattern-wrapper', 'gb-selectable', isSelected && bulkInsertEnabled && 'is-selected' ) }
						>
							{ bulkInsertEnabled && (
								<Button
									className="gb-selectable__toggle"
									label={ isSelected
										? __( 'Deselect this pattern', 'generateblocks' )
										: __( 'Select this pattern', 'generate-blocks' )
									}
									onClick={ ( e ) => {
										e.stopPropagation();
										const type = isSelected ? 'REMOVE' : 'ADD';
										selectedPatternsDispatch( { type, pattern } );
									} }
								/>
							) }
							{ ( bulkInsertEnabled || isSelected ) && (
								<Button
									className="check"
									onClick={ ( e ) => {
										e.stopPropagation();
										selectedPatternsDispatch( { type: 'REMOVE', pattern } );
									} }
									onBlur={ ( e ) => e.stopPropagation() }
									tabIndex="-1"
								>
									<span className="media-modal-icon"></span>
									<span className="screen-reader-text">
										{ __( 'Deselect', 'generateblocks' ) }
									</span>
								</Button>
							) }
							<Pattern
								isLoading={ loading }
								pattern={ pattern }
								globalStyleCSS={ globalStyleCSS }
							/>

							<PatternDetailsMemo
								pattern={ pattern }
								patternRef={ ref }
								bulkInsertEnabled={ bulkInsertEnabled }
								globalStyleData={ globalStyleData }
								closeModal={ closeModal }
							/>
						</li>
					);
				} ) }
			</ul>

			<div
				ref={ loadMoreRef }
				style={ { marginTop: '10px' } }
				className="gblocks-patterns-load-more"
			/>
		</>
	);
}

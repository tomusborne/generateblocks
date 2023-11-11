import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useMemo, useRef, useState, useEffect } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PatternDetails } from './pattern-details';

export default function PatternList() {
	const ref = useRef();
	const loadMoreRef = useRef();
	const {
		patterns,
		activePatternId,
		setActivePatternId,
		loading,
		itemsPerPage,
		itemCount,
		setItemCount,
		scrollPosition,
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
			const modal = ref.current.closest( '.components-modal__content' );

			if ( modal ) {
				modal.scrollTop = scrollPosition;
			}
		}
	}, [ scrollPosition, activePattern ] );

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
					activePatternId={ activePatternId }
					{ ...activePattern }
				/>
			}

			<div
				ref={ ref }
				className="patterns-wrapper"
				style={ {
					...hide,
					display: !! activePattern ? 'none' : '',
				} }
			>
				{ visiblePatterns && visiblePatterns.map( ( pattern ) => (
					<div key={ pattern.id } className="gb-pattern-wrapper">
						<Pattern
							isLoading={ loading }
							setActivePattern={ setActivePatternId }
							{ ...pattern }
						/>

						<PatternDetails
							pattern={ pattern }
							patternRef={ ref }
						/>
					</div>
				) ) }
			</div>

			<div
				ref={ loadMoreRef }
				style={ { marginTop: '10px' } }
				className="gblocks-patterns-load-more"
			/>
		</>
	);
}

import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useMemo, useRef, useState, useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PatternDetails } from './pattern-details';
import Pagination from './library-pagination';

export default function PatternList() {
	const ref = useRef();
	const {
		patterns,
		activePatternId,
		setActivePatternId,
		loading,
		paginationOffset,
	} = useLibrary();

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	const hide = loading ? { opacity: 0 } : {};
	const itemsPerPage = 12;
	const [ visiblePatterns, setVisiblePatterns ] = useState( [] );

	useEffect( () => {
		const endOffset = paginationOffset + itemsPerPage;
		setVisiblePatterns( patterns.slice( paginationOffset, endOffset ) );
	}, [ paginationOffset, patterns ] );

	return (
		<>
			{ loading && ! activePatternId &&
				<div className="loading-library"><Spinner />
					{ __( 'Loading collection…', 'generateblocks' ) }
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

			<div ref={ ref } className="patterns-wrapper" style={ hide }>
				{ ! activePattern && visiblePatterns && visiblePatterns.map( ( pattern ) => (
					<div key={ pattern.id } className="gb-pattern-wrapper">
						<Pattern
							isLoading={ loading }
							setActivePattern={ setActivePatternId }
							{ ...pattern }
						/>

						<PatternDetails
							pattern={ pattern }
						/>
					</div>
				) ) }
			</div>

			{ ! activePattern &&
				<div
					style={ {
						display: patterns.length <= itemsPerPage || loading ? 'none' : '',
						marginTop: '2em',
					} }
				>
					<Pagination
						items={ patterns }
						itemsPerPage={ itemsPerPage }
						wrapperRef={ ref }
					/>
				</div>
			}
		</>
	);
}

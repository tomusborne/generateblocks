import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PatternDetails } from './pattern-details';

export default function PatternList() {
	const ref = useRef();
	const {
		patterns,
		activePatternId,
		setActivePatternId,
		loading,
		setLoading,
	} = useLibrary();
	const firstUpdate = useRef( true );
	const patternHeight = 250;

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	useEffect( () => {
		if ( firstUpdate.current ) {
			firstUpdate.current = false;
			return;
		}

		setLoading( true );

		const timer = setTimeout( () => {
			setLoading( false );
		}, 500 );

		return () => clearTimeout( timer );
	}, [ activePatternId ] );

	const hide = loading ? { opacity: 0 } : {};

	return (
		<>
			{ loading && ! activePatternId &&
				<div className="loading-library"><Spinner />
					{ __( 'Loading collection…', 'generateblocks' ) }
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
				{ ! activePattern && patterns && patterns.map( ( pattern ) => (
					<div key={ pattern.id } className="gb-pattern-wrapper">
						<Pattern
							pattern={ pattern.pattern }
							isLoading={ loading }
							patternHeight={ patternHeight }
							setActivePattern={ setActivePatternId }
							{ ...pattern }
						/>

						<PatternDetails
							pattern={ pattern }
						/>
					</div>
				) ) }
			</div>
		</>
	);
}

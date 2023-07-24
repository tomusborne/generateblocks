import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

export default function PatternList() {
	const ref = useRef();
	const {
		patterns,
		activePatternId,
		setActivePatternId,
		hoverPattern,
		activeCategory,
	} = useLibrary();
	const [ patternWidth, setPatternWidth ] = useState( 0 );
	const [ loading, setLoading ] = useState( true );

	useEffect( () => {
		if ( ref.current?.clientWidth ) {
			setPatternWidth( ( ref.current?.clientWidth - 32 ) / 2 );
		}
	}, [ ref.current?.clientWidth ] );

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	useEffect( () => {
		const timer = setTimeout( () => {
			setLoading( false );
		}, 1000 );

		return () => clearTimeout( timer );
	}, [] );

	useEffect( () => {
		setLoading( true );

		const timer = setTimeout( () => {
			setLoading( false );
		}, 700 );

		return () => clearTimeout( timer );
	}, [ activePatternId, activeCategory ] );

	const hide = loading ? { opacity: 0 } : {};

	return (
		<>
			{ loading && <div className="loading-library"><Spinner /></div> }

			{ activePattern && ref.current?.clientWidth &&
				<Pattern
					isLoading={ loading }
					patternHover={ hoverPattern }
					width={ ref.current?.clientWidth }
					{ ...activePattern }
				/>
			}

			<div ref={ ref } className="patterns-wrapper" style={ hide }>
				{ ! activePattern && patterns && patterns.map( ( pattern ) => (
					<Pattern
						key={ pattern.id }
						isLoading={ loading }
						width={ patternWidth }
						setActivePattern={ setActivePatternId }
						{ ...pattern }
					/>
				) ) }
			</div>
		</>
	);
}

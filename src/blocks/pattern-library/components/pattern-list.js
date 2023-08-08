import Pattern from './pattern';
import { useLibrary } from './library-provider';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import Masonry from 'react-responsive-masonry';

export default function PatternList() {
	const ref = useRef();
	const {
		patterns,
		activePatternId,
		setActivePatternId,
		hoverPattern,
		loading,
		setLoading,
	} = useLibrary();
	const [ patternWidth, setPatternWidth ] = useState( 0 );
	const firstUpdate = useRef( true );

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
				{ ! activePattern &&
					<Masonry columnsCount={ 2 } gutter={ 32 }>
						{ patterns && patterns.map( ( pattern ) => (
							<Pattern
								key={ pattern.id }
								isLoading={ loading }
								width={ patternWidth }
								setActivePattern={ setActivePatternId }
								{ ...pattern }
							/>
						) ) }
					</Masonry>
				}
			</div>
		</>
	);
}

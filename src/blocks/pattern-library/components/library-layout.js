import CategoryList from './category-list';
import LibrarySelector from './library-selector';
import { useLibrary } from './library-provider';
import PatternList from './pattern-list';
import PatternSearch from './pattern-search';
import { useMemo } from '@wordpress/element';
import PatternTree from './pattern-tree';

export default function LibraryLayout() {
	const { clientId, activePatternId, patterns } = useLibrary();

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	return (
		<div className="pattern-library-layout">
			{ ! activePatternId &&
				<LibrarySelector />
			}

			<div className="library-sidebar">
				{ ! activePatternId &&
					<>
						<PatternSearch />
						<CategoryList />
					</>
				}
				{ activePattern &&
					<PatternTree pattern={ activePattern } clientId={ clientId } />
				}
			</div>
			<div className="library-content">
				<PatternList />
			</div>
		</div>
	);
}

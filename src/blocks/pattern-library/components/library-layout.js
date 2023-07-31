import CategoryList from './category-list';
import LibrarySelector from './library-selector';
import { useLibrary } from './library-provider';
import PatternList from './pattern-list';
import PatternSearch from './pattern-search';
import { useMemo } from '@wordpress/element';
import PatternTree from './pattern-tree';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from '@wordpress/components';
import { close, arrowLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function LibraryLayout() {
	const { clientId, activePatternId, patterns, setActivePatternId } = useLibrary();
	const { removeBlock } = useDispatch( 'core/block-editor' );

	const activePattern = useMemo( () => {
		const found = patterns.filter( ( pattern ) => ( pattern.id === activePatternId ) );
		return found[ 0 ] || undefined;
	}, [ activePatternId ] );

	return (
		<div className="pattern-library">
			<div className="pattern-library__header">
				<div className="pattern-library-layhout__header--title">
					{ ! activePatternId
						? <h1>{ __( 'Pattern Library', 'generateblocks' ) }</h1>
						: (
							<Button
								icon={ arrowLeft }
								onClick={ () => setActivePatternId( '' ) }
							>
								{ __( 'Return to library' ) }
							</Button>
						)
					}
				</div>

				{ ! activePatternId &&
					<LibrarySelector />
				}

				<div className="pattern-library-layout__header--close">
					<Button
						variant="tertiary"
						icon={ close }
						onClick={ () => removeBlock( clientId ) }
					/>
				</div>
			</div>

			<div className="pattern-library-layout">
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
				<ToastContainer
					position="bottom-left"
					theme="dark"
					progressStyle={ { backgroundColor: '#555555' } }
				/>
			</div>
		</div>
	);
}

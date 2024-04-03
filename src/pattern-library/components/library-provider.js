
import { createContext, useContext, useEffect, useState, useReducer } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const LibraryContext = createContext( undefined );

export async function fetchLibraries( isEnabled = true ) {
	return await apiFetch( {
		path: addQueryArgs( '/generateblocks/v1/pattern-library/libraries', {
			is_enabled: isEnabled,
		} ),
		method: 'GET',
	} );
}

async function fetchLibraryCategories( libraryId, isLocal, publicKey ) {
	const pro = isLocal ? '-pro' : '';
	try {
		const response = await apiFetch( {
			path: addQueryArgs( `/generateblocks${ pro }/v1/pattern-library/categories`, {
				libraryId,
				isLocal,
			} ),
			method: 'GET',
			headers: {
				'X-GB-Public-Key': publicKey,
			},
		} );

		return response?.response ?? [];
	} catch ( error ) {
		return [];
	}
}

async function fetchLibraryPatterns( libraryId, categoryId, search, isLocal, publicKey ) {
	const pro = isLocal ? '-pro' : '';
	try {
		const response = await apiFetch( {
			path: addQueryArgs( `/generateblocks${ pro }/v1/pattern-library/patterns`, {
				libraryId,
				categoryId,
				search,
				isLocal,
			} ),
			method: 'GET',
			headers: {
				'X-GB-Public-Key': publicKey,
			},
		} );

		return response?.response ?? [];
	} catch ( error ) {
		return [];
	}
}

export function LibraryProvider( { children } ) {
	const [ libraries, setLibraryData ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ search, setSearch ] = useState( '' );
	const [ activeLibrary, setActiveLibrary ] = useState( '' );
	const [ publicKey, setPublicKey ] = useState( '' );
	const [ isLocal, setIsLocal ] = useState( false );
	const [ activeCategory, setActiveCategory ] = useState( '' );
	const [ activePatternId, setActivePatternId ] = useState( '' );
	const [ hoverPattern, setHoverPattern ] = useState( '' );
	const [ loading, setLoading ] = useState( false );
	const [ previewIframeWidth, setPreviewIframeWidth ] = useState( '100%' );
	const itemsPerPage = 15;
	const [ itemCount, setItemCount ] = useState( itemsPerPage );
	const [ scrollPosition, setScrollPosition ] = useState( 0 );

	function selectedPatternsReducer( state, action ) {
		switch ( action.type ) {
			case 'ADD':
				return [ ...state, action.pattern ];
			case 'REMOVE':
				return state.filter( ( selectedPattern ) => selectedPattern.id !== action.pattern.id );
			case 'SET':
				return action.patterns;
			default:
				return state;
		}
	}

	const [ selectedPatterns, selectedPatternsDispatch ] = useReducer( selectedPatternsReducer, [] );
	const defaultContext = {
		libraries,
		search,
		setSearch,
		activeLibrary,
		setActiveLibrary,
		activeCategory,
		setActiveCategory,
		activePatternId,
		setActivePatternId,
		selectedPatterns,
		selectedPatternsDispatch,
		categories,
		hoverPattern,
		setHoverPattern,
		patterns,
		isLocal,
		setIsLocal,
		setPublicKey,
		loading,
		setLoading,
		previewIframeWidth,
		setPreviewIframeWidth,
		setLibraryCategories,
		setLibraryPatterns,
		setLibraries,
		itemsPerPage,
		itemCount,
		setItemCount,
		scrollPosition,
		setScrollPosition,
	};

	async function setLibraryCategories() {
		const { data } = await fetchLibraryCategories( activeLibrary?.id, isLocal, publicKey );

		// We only want to show categories that have patterns in this current library of collections.
		const categoriesInPatterns = new Set( patterns.flatMap( ( obj ) => obj.categories ) );
		const categoriesWithPatterns = data.filter( ( category ) => categoriesInPatterns.has( category.id ) );

		setCategories( categoriesWithPatterns ?? [] );

		const intialCategory = categoriesWithPatterns.find( ( category ) => (
			generateBlocksPatternLibrary.defaultOpenCategory === category.name
		) ) ?? '';

		setActiveCategory( intialCategory?.id ?? '' );
	}

	async function setLibraryPatterns() {
		setLoading( true );
		setPatterns( [] );

		// Fetch all patterns for the active library.
		const { data: fetchedPatterns } = await fetchLibraryPatterns( activeLibrary?.id, '', '', isLocal, publicKey );
		setPatterns( fetchedPatterns ?? [] );

		// Reset.
		setItemCount( itemsPerPage );
		setScrollPosition( 0 );
		setLoading( false );
	}

	async function setLibraries() {
		const { data } = await fetchLibraries();
		setLibraryData( data ?? [] );

		const initialLibrary = data.find( ( library ) => (
			generateBlocksPatternLibrary.defaultOpenLibrary === library.id
		) ) ?? data[ 0 ] ?? {};
		setActiveLibrary( initialLibrary ?? false );
		setPublicKey( initialLibrary?.publicKey ?? '' );
		setIsLocal( initialLibrary?.isLocal ?? false );
	}

	useEffect( () => {
		( async function() {
			setLibraries();
		}() );
	}, [] );

	useEffect( () => {
		if ( activeLibrary.id ) {
			setLibraryCategories();
		} else {
			setCategories( [] );
		}
	}, [ activeLibrary?.id, patterns ] );

	useEffect( () => {
		if ( activeLibrary.id ) {
			setLibraryPatterns();
		} else {
			setPatterns( [] );
		}
	}, [ activeLibrary?.id, publicKey ] );

	return (
		<LibraryContext.Provider value={ defaultContext }>
			{ children }
		</LibraryContext.Provider>
	);
}

export function useLibrary() {
	const context = useContext( LibraryContext );

	if ( ! context ) {
		throw new Error( __( 'useLibrary hook must be wrapped by a LibraryProvider.', 'generateblocks' ) );
	}

	return context;
}

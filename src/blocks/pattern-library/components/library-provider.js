
import { createContext, useContext, useEffect, useState, useReducer } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'lodash';

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

async function fetchRequiredClasses( activeLibrary ) {
	const requiredClassesApiData = applyFilters(
		'generateblocks.editor.patternLibrary.requiredClassesApiData',
		{},
		{ activeLibrary }
	);

	if ( isEmpty( requiredClassesApiData ) ) {
		return [];
	}

	try {
		const response = await apiFetch( {
			path: addQueryArgs(
				'/generateblocks-pro/v1/pattern-library/get-required-classes',
				requiredClassesApiData
			),
			method: 'GET',
			headers: {
				'X-GB-Public-Key': activeLibrary.publicKey,
			},
		} );

		if ( response ) {
			return response.response;
		}
	} catch ( error ) {
		return [];
	}
}

export function LibraryProvider( { clientId, children } ) {
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
	const [ requiredClasses, setRequiredClasses ] = useState( [] );
	const itemsPerPage = 12;
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
		clientId,
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
		setIsLocal,
		setPublicKey,
		loading,
		setLoading,
		previewIframeWidth,
		setPreviewIframeWidth,
		setLibraryCategories,
		setLibraryPatterns,
		setLibraries,
		requiredClasses,
		setRequiredClasses,
		itemsPerPage,
		itemCount,
		setItemCount,
		scrollPosition,
		setScrollPosition,
	};

	async function setLibraryCategories() {
		const { data } = await fetchLibraryCategories( activeLibrary?.id, isLocal, publicKey );
		const { data: allPatterns } = await fetchLibraryPatterns( activeLibrary?.id, '', '', isLocal, publicKey );

		// We only want to show categories that have patterns in this current library of collections.
		const categoriesInPatterns = new Set( allPatterns.flatMap( ( obj ) => obj.categories ) );
		const categoriesWithPatterns = data.filter( ( category ) => categoriesInPatterns.has( category.id ) );

		setCategories( categoriesWithPatterns ?? [] );
	}

	async function setLibraryPatterns() {
		setLoading( true );
		setPatterns( [] );

		// Check for required global classes.
		if ( ! isLocal ) {
			const { data: fetchedRequiredClasses } = await fetchRequiredClasses( activeLibrary );
			setRequiredClasses( fetchedRequiredClasses );
		} else {
			setRequiredClasses( [] );
		}

		// Fetch patterns for the active library.
		const { data: fetchedPatterns } = await fetchLibraryPatterns( activeLibrary?.id, activeCategory, search, isLocal, publicKey );
		setPatterns( fetchedPatterns ?? [] );

		// Reset.
		setItemCount( itemsPerPage );
		setScrollPosition( 0 );
		setLoading( false );
	}

	async function setLibraries() {
		const { data } = await fetchLibraries();

		setLibraryData( data ?? [] );

		setActiveLibrary( data.length ? data[ 0 ] : false );
		setPublicKey( data.length ? data[ 0 ].publicKey : '' );
		setIsLocal( data.length && !! data[ 0 ].isLocal );
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
	}, [ activeLibrary?.id ] );

	useEffect( () => {
		if ( activeLibrary.id ) {
			setLibraryPatterns();
		} else {
			setPatterns( [] );
		}
	}, [ activeLibrary?.id, activeCategory, search, publicKey ] );

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

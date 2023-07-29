
import { createContext, useContext, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const LibraryContext = createContext( undefined );

async function fetchLibraries() {
	return await apiFetch( {
		path: '/generateblocks/v1/pattern-library/libraries?is_enabled=true',
		method: 'GET',
	} );
}

async function fetchLibraryCategories( libraryId, isLocal, publicKey ) {
	const pro = isLocal ? '-pro' : '';
	const response = await apiFetch( {
		path: addQueryArgs( `/generateblocks${ pro }/v1/pattern-library/categories`, {
			libraryId,
		} ),
		method: 'GET',
		headers: {
			'X-GB-Public-Key': publicKey,
			'X-GB-Library-Collection': btoa( libraryId ),
		},
	} );

	if ( response ) {
		return response.response;
	}

	return [];
}

async function fetchLibraryPatterns( libraryId, categoryId, search, isLocal, publicKey ) {
	const pro = isLocal ? '-pro' : '';
	const response = await apiFetch( {
		path: addQueryArgs( `/generateblocks${ pro }/v1/pattern-library/patterns`, {
			libraryId,
			categoryId,
			search,
		} ),
		method: 'GET',
		headers: {
			'X-GB-Public-Key': publicKey,
			'X-GB-Library-Collection': btoa( libraryId ),
		},
	} );

	if ( response ) {
		return response.response;
	}

	return [];
}

export function LibraryProvider( { clientId, children } ) {
	const [ libraries, setLibraries ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ search, setSearch ] = useState( '' );
	const [ activeLibrary, setActiveLibrary ] = useState( '' );
	const [ publicKey, setPublicKey ] = useState( '' );
	const [ isLocal, setIsLocal ] = useState( false );
	const [ activeCategory, setActiveCategory ] = useState( '' );
	const [ activePatternId, setActivePatternId ] = useState( '' );
	const [ hoverPattern, setHoverPattern ] = useState( '' );
	const [ scrollToPattern, setScrollToPattern ] = useState( '' );
	const [ loading, setLoading ] = useState( true );
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
		categories,
		hoverPattern,
		setHoverPattern,
		patterns,
		setIsLocal,
		setPublicKey,
		loading,
		setLoading,
		scrollToPattern,
		setScrollToPattern,
	};

	useEffect( () => {
		( async function() {
			const { data } = await fetchLibraries();

			setLibraries( data );
			setActiveLibrary( data[ 0 ].id );
			setPublicKey( data[ 0 ].publicKey );
			setIsLocal( !! data[ 0 ].isLocal );
		}() );
	}, [] );

	useEffect( () => {
		( async function() {
			if ( activeLibrary ) {
				setLoading( true );
				const { data } = await fetchLibraryCategories( activeLibrary, isLocal, publicKey );
				setCategories( data );
				setTimeout( () => setLoading( false ), 500 );
			}
		}() );
	}, [ activeLibrary ] );

	useEffect( () => {
		( async function() {
			if ( activeLibrary ) {
				setLoading( true );
				const { data } = await fetchLibraryPatterns( activeLibrary, activeCategory, search, isLocal, publicKey );
				setPatterns( data );
				setTimeout( () => setLoading( false ), 500 );
			}
		}() );
	}, [ activeLibrary, activeCategory, search, publicKey ] );

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

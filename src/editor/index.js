import wpDomReady from '@wordpress/dom-ready';

import './stores.js';
import './disable-blocks.js';
import './editor.scss';

wpDomReady( () => {
	const searchParam = new URLSearchParams( window.location.search );
	searchParam.delete( 'gb-styles-search' );
	window.history.replaceState( null, '', `${ window.location.pathname }?${ searchParam.toString() }` );
} );

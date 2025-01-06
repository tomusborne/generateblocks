const SELECTOR = 'a[data-gb-prefetch][href]';

function fetchPrefetchedPage( url ) {
	return fetch( url )
		.then( ( response ) => {
			if ( ! response.ok ) {
				throw new Error( 'Network error' );
			}
			return response.text();
		} )
		.catch( ( error ) => {
			console.error( 'Error fetching prefetched page:', error ); // eslint-disable-line no-console
		} );
}

function scrollIfNeeded( container ) {
	const rect = container.getBoundingClientRect();
	const isTopInView = rect.top >= 0 && rect.top <= ( window.innerHeight || document.documentElement.clientHeight );

	if ( ! isTopInView ) {
		container.scrollIntoView( { behavior: 'smooth', block: 'start' } );
	}
}

function updatePostsContainer( region = '', prefetchedContent = '' ) {
	const container = document.querySelector( `[data-gb-router-region="${ region }"]` );
	if ( ! container || ! prefetchedContent ) {
		throw new Error( 'Missing container or prefetched content' );
	}
	const paginationContainer = container.parentNode.querySelector( '.gb-query-loop-pagination' );

	const prefetchedContainer = document.createElement( 'div' );
	prefetchedContainer.innerHTML = prefetchedContent;

	const prefetchedPosts = prefetchedContainer.querySelector( `[data-gb-router-region="${ region }"]` );
	const pagination = prefetchedPosts.parentNode.querySelector( '.gb-query-loop-pagination' );

	if ( prefetchedPosts && container ) {
		container.innerHTML = prefetchedPosts.innerHTML;
		scrollIfNeeded( container );
		paginationContainer.innerHTML = pagination.innerHTML;
	} else {
		console.error( 'Unable to update posts container: Missing elements' ); // eslint-disable-line no-console
	}
}

const store = {};

document.body.addEventListener( 'mouseenter', function( e ) {
	const prefetchLink = e.target.closest( SELECTOR );
	if ( prefetchLink ) {
		const isStored = store[ prefetchLink.href ] ?? false;

		if ( isStored ) {
			return;
		}

		const link = document.createElement( 'link' );
		link.rel = 'prefetch';
		link.href = prefetchLink.href;
		document.head.appendChild( link );

		store[ prefetchLink.href ] = true;
	}
}, true );

document.addEventListener( 'click', ( e ) => {
	const target = e.target.closest( SELECTOR );

	if ( target && target.href ) {
		const region = target.getAttribute( 'data-gb-router-target' );

		if ( ! region ) {
			return;
		}

		e.preventDefault(); // Prevent default link behavior
		const url = target.href;
		fetchPrefetchedPage( url )
			.then( ( prefetchedContent ) => {
				// Update the list of posts with content from the prefetched page
				updatePostsContainer( region, prefetchedContent );
				// Navigate to the prefetched URL using History API
				history.pushState( null, '', url );
			} );
	}
} );

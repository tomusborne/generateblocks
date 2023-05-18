import { render, createRoot } from '@wordpress/element';

export default function( root, component ) {
	if ( undefined !== createRoot ) {
		createRoot( root ).render( component );
	} else {
		render( component, root );
	}
}

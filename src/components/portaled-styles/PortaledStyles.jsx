import { createPortal, useState, useEffect } from '@wordpress/element';

export function PortaledStyles( { css } ) {
	const [ targetElement, setTargetElement ] = useState( null );

	useEffect( () => {
		const element = document.querySelector( '.editor-styles-wrapper' );

		if ( element && css ) {
			let insertedDiv = document.querySelector( '.gb-block-styles' );

			if ( ! insertedDiv ) {
				const newDiv = document.createElement( 'div' );
				newDiv.className = 'gb-block-styles';
				element.insertBefore( newDiv, element.firstChild );
				insertedDiv = newDiv;
			}

			setTargetElement( insertedDiv );
		}
	}, [ css ] );

	if ( ! targetElement ) {
		return null;
	}

	return createPortal(
		<style>{ css }</style>,
		targetElement
	);
}

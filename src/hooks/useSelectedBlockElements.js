import { useSelect } from '@wordpress/data';
import { useLayoutEffect, useState } from '@wordpress/element';

export function useSelectedBlockElements() {
	const {
		getSelectedBlockClientIds,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const clientIds = getSelectedBlockClientIds();
	const [ elements, setElements ] = useState( [] );

	useLayoutEffect( () => {
		if ( ! clientIds.length ) {
			return;
		}

		const queryDocument = document.querySelector( 'iframe[name="editor-canvas"]' )?.contentDocument || document;
		const editorStylesWrapper = queryDocument.querySelector( '.editor-styles-wrapper' );

		setElements( clientIds.map( ( clientId ) => {
			if ( null === editorStylesWrapper ) {
				return null;
			}

			return editorStylesWrapper.querySelector( `[data-block="${ clientId }"]:not(.gb-is-root-block)` );
		} ).filter( ( element ) => null !== element ) );
	}, [ clientIds ] );

	return elements;
}

export function useSelectedBlockElement() {
	const {
		getSelectedBlockClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const clientId = getSelectedBlockClientId();
	const [ element, setElement ] = useState( null );

	useLayoutEffect( () => {
		if ( ! clientId ) {
			return;
		}

		const queryDocument = document.querySelector( 'iframe[name="editor-canvas"]' )?.contentDocument || document;
		const editorStylesWrapper = queryDocument.querySelector( '.editor-styles-wrapper' );

		setElement( editorStylesWrapper.querySelector( `[data-block="${ clientId }"]:not(.gb-is-root-block)` ) ?? null );
	}, [ clientId ] );

	return element;
}

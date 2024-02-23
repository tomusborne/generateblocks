import { useReducer, useMemo, useRef, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

function reducer( state, action ) {
	return {
		...state,
		[ action.type ]: action.value,
	};
}

export function useStyleIndicator( computedStyles, panelControls, content = '', deviceAttributes = {} ) {
	const [ controlGlobalStyle, dispatchControlGlobalStyle ] = useReducer( reducer, panelControls );

	const styleSources = applyFilters(
		'generateblocks.editor.panel.computedStyleSources',
		{},
		computedStyles,
		Object.keys( controlGlobalStyle ),
		deviceAttributes,
	);
	const hasGlobalStyle = useMemo( () => {
		return Object.values( controlGlobalStyle ).some( ( control ) => control === true );
	}, [ controlGlobalStyle ] );

	const prevContentLength = useRef( 0 );
	const currentContentLength = content ? content.length : 0;
	const contentWasUpdated = prevContentLength.current !== currentContentLength;

	useEffect( () => {
		prevContentLength.current = currentContentLength;
	}, [ content ] );

	return { dispatchControlGlobalStyle, styleSources, hasGlobalStyle, contentWasUpdated };
}

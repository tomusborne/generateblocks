import { useState, useMemo, useRef, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

export function useStyleIndicator( computedStyles, panelControls, content = '' ) {
	const [ controlGlobalStyle, setControlGlobalStyle ] = useState( panelControls );

	const styleSources = applyFilters(
		'generateblocks.editor.panel.computedStyleSources',
		{},
		computedStyles,
		Object.keys( controlGlobalStyle ),
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

	return [ setControlGlobalStyle, styleSources, hasGlobalStyle, contentWasUpdated ];
}

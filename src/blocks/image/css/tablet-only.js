import buildCSS from '../../../utils/build-css';

import { applyFilters } from '@wordpress/hooks';

export default function DesktopCSS( props ) {
	const cssObj = applyFilters( 'generateblocks.editor.tabletOnlyCSS', [], props, 'image' );

	return buildCSS( cssObj );
}

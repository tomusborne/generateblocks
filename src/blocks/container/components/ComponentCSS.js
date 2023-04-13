import { memo } from '@wordpress/element';
import DesktopCSS from '../css/desktop';
import TabletCSS from '../css/tablet';
import TabletOnlyCSS from '../css/tablet-only';
import MobileCSS from '../css/mobile';
import MainCSS from '../css/main';
import shouldRebuildCSS from '../../../utils/should-rebuild-css';
import StyleTag from '../../../components/style-tag';

function ComponentCSS( props ) {
	const {
		isBlockPreview = false,
	} = props?.attributes;

	if ( isBlockPreview ) {
		return null;
	}

	return (
		<>
			<StyleTag><MainCSS { ...props } /></StyleTag>
			<StyleTag mediaQuery="desktop"><DesktopCSS { ...props } /></StyleTag>
			<StyleTag mediaQuery="tablet"><TabletCSS { ...props } /></StyleTag>
			<StyleTag mediaQuery="tablet_only"><TabletOnlyCSS { ...props } /></StyleTag>
			<StyleTag mediaQuery="mobile"><MobileCSS { ...props } /></StyleTag>
		</>
	);
}

export default memo( ComponentCSS, shouldRebuildCSS );

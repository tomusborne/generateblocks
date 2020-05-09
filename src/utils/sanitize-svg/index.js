export default function sanitizeSVG( svg ) {
	return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } ); // eslint-disable-line no-undef
}

import { Path, SVG } from '@wordpress/primitives';

export default function ImagePlaceholder() {
	return (
		<div className="wp-block-post-featured-image__placeholder">
			<SVG
				className="components-placeholder__illustration"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 60 60"
				preserveAspectRatio="none"
			>
				<Path vectorEffect="non-scaling-stroke" d="M60 60 0 0" />
			</SVG>
		</div>
	);
}

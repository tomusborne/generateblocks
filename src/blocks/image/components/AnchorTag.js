export default function AnchorTag( props ) {
	const {
		href,
		target,
		relNoFollow,
		relSponsored,
		children,
		disabled,
	} = props;

	const relAttributes = [];

	if ( target ) {
		relAttributes.push( 'noopener', 'noreferrer' );
	}

	if ( relNoFollow ) {
		relAttributes.push( 'nofollow' );
	}

	if ( relSponsored ) {
		relAttributes.push( 'sponsored' );
	}

	return (
		<>
			{ !! href
				? <a
					href={ disabled ? undefined : href }
					target={ target }
					rel={ relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null }
				>
					{ children }
				</a> : children
			}
		</>
	);
}

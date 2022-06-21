/* eslint-disable jsx-a11y/anchor-is-valid, react/jsx-no-target-blank */
export default function AnchorTag( props ) {
	const {
		href,
		openInNewWindow,
		relNoFollow,
		relSponsored,
		children,
		disabled,
	} = props;

	const relAttributes = [];

	if ( openInNewWindow ) {
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
				? (
					<a
						href={ disabled ? undefined : href }
						target={ openInNewWindow ? '_blank' : undefined }
						rel={ relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null }
					>
						{ children }
					</a>
				) : children
			}
		</>
	);
}

/* eslint-enable jsx-a11y/anchor-is-valid, react/jsx-no-target-blank */

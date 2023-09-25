import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

function DefaultMessage() {
	return (
		<div style={ { maxWidth: '450px', margin: '0 auto', textAlign: 'center' } }>
			<h3>{ __( 'Collection is not enabled.', 'generateblocks' ) }</h3>
		</div>
	);
}

export default function RequiredComponents( { activeLibrary, children } ) {
	const [ isEnabled, setIsEnabled ] = useState( false );
	const Message = applyFilters( 'generateblocks.pattern-library.collection.content', DefaultMessage, () => setIsEnabled( true ) );

	if (
		! isEnabled &&
		'gb_default_free_library' !== activeLibrary &&
		! applyFilters( 'generateblocks.pattern-library.collection.enabled', false, activeLibrary )
	) {
		return <Message />;
	}

	return ( children );
}

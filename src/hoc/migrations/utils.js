import isBlockVersionLessThan from '../../utils/check-block-version';

function migrationPipe( existingAttributes, callbacks = [] ) {
	return callbacks.reduce( ( resultAttrs, callback ) => {
		const result = callback( resultAttrs, existingAttributes );
		return Object.assign( {}, result );
	}, {} );
}

function updateBlockVersion( newBlockVersion ) {
	return function( attrs, existingAttrs ) {
		if ( isBlockVersionLessThan( existingAttrs.blockVersion, newBlockVersion ) ) {
			attrs.blockVersion = newBlockVersion;
		}

		return attrs;
	};
}

export {
	migrationPipe,
	updateBlockVersion,
};

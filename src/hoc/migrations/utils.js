import { isEmpty } from 'lodash';
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

function addToAttrsObject( { attrs = {}, attributeName, existingAttrs = {}, newAttrs = {}, oldAttrs = {} } ) {
	if ( isEmpty( newAttrs ) ) {
		return attrs;
	}

	return {
		...attrs,
		[ attributeName ]: {
			...existingAttrs,
			...attrs[ attributeName ],
			...newAttrs,
		},
		...oldAttrs,
	};
}

function setIsDynamic( attrs, existingAttrs ) {
	if ( ! existingAttrs.isDynamic ) {
		attrs.isDynamic = true;
	}

	return attrs;
}

export {
	migrationPipe,
	updateBlockVersion,
	addToAttrsObject,
	setIsDynamic,
};

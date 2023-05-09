import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import { migrationPipe, updateBlockVersion, setIsDynamic } from './migrations/utils';
import migrateDimensions from './migrations/migrateDimensions';
import { isEmpty } from 'lodash';

/**
 * Migrate our stack and fillHorizontal space attributes to their devices.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.4.0
 */
export function migrateStackFill( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			if ( existingAttrs.stack || existingAttrs.fillHorizontalSpace ) {
				if ( existingAttrs.stack ) {
					attrs.stackTablet = true;
					attrs.stackMobile = true;
				}

				if ( existingAttrs.fillHorizontalSpace ) {
					attrs.fillHorizontalSpaceTablet = true;
					attrs.fillHorizontalSpaceMobile = true;
				}
			}
		}

		return attrs;
	};
}

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const defaults = getBlockType( 'generateblocks/button-container' )?.attributes;

			const newAttributes = migrationPipe(
				attributes,
				[
					setIsDynamic,
					migrateStackFill( {
						blockVersionLessThan: 2,
					} ),
					migrateDimensions( {
						blockVersionLessThan: 3,
						defaults,
						attributesToMigrate: [
							'marginTop',
							'marginRight',
							'marginBottom',
							'marginLeft',
						],
					} ),
					updateBlockVersion( 3 ),
				]
			);

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import { migrationPipe, updateBlockVersion, setIsDynamic } from './migrations/utils';
import { isEmpty } from 'lodash';
import migrateSpacing from './migrations/migrateSpacing';

/**
 * Migrate our stack and fillHorizontal space attributes to their devices.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @return {Object} Updated attributes.
 * @since 1.4.0
 */
export function migrateStackFill( { blockVersionLessThan } ) {
	return function( attrs, existingAttrs, mode ) {
		if ( 'css' === mode ) {
			return attrs;
		}

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

export const currentBlockVersion = 3;

/**
 * Migrate our Button Container attributes.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The block attributes.
 * @param {Object} Props.defaults   The block defaults.
 * @param {string} Props.mode       The migration mode.
 * @return {Object} Updated attributes.
 * @since 1.8.0
 */
export function migrateButtonContainerAttributes( { attributes, defaults, mode = '' } ) {
	return migrationPipe(
		attributes,
		[
			setIsDynamic,
			migrateStackFill( {
				blockVersionLessThan: 2,
			} ),
			migrateSpacing( {
				blockVersionLessThan: 3,
				defaults,
				attributesToMigrate: [
					'marginTop',
					'marginRight',
					'marginBottom',
					'marginLeft',
				],
			} ),
			updateBlockVersion( currentBlockVersion ),
		],
		mode
	);
}

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const newAttributes = migrateButtonContainerAttributes( {
				attributes,
				defaults: getBlockType( 'generateblocks/button-container' )?.attributes,
			} );

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

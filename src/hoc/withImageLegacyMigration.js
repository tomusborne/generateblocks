import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { migrationPipe, updateBlockVersion } from './migrations/utils';
import migrateSpacing from './migrations/migrateSpacing';
import migrateBorders from './migrations/migrateBorders';
import { isEmpty } from 'lodash';

export const currentBlockVersion = 2;

/**
 * Migrate our Image attributes.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The block attributes.
 * @param {Object} Props.defaults   The block defaults.
 * @param {string} Props.mode       The migration mode.
 * @return {Object} Updated attributes.
 * @since 1.8.0
 */
export function migrateImageAttributes( { attributes, defaults, mode } ) {
	return migrationPipe(
		attributes,
		[
			migrateSpacing( {
				blockVersionLessThan: 2,
				defaults,
				attributesToMigrate: [
					'paddingTop',
					'paddingRight',
					'paddingBottom',
					'paddingLeft',
					'marginTop',
					'marginRight',
					'marginBottom',
					'marginLeft',
				],
			} ),
			migrateBorders( {
				blockVersionLessThan: 2,
				defaults,
				attributesToMigrate: [
					'borderSizeTop',
					'borderSizeRight',
					'borderSizeBottom',
					'borderSizeLeft',
					'borderRadiusTopRight',
					'borderRadiusBottomRight',
					'borderRadiusBottomLeft',
					'borderRadiusTopLeft',
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
			const newAttributes = migrateImageAttributes( {
				attributes,
				defaults: getBlockType( 'generateblocks/image' )?.attributes,
			} );

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

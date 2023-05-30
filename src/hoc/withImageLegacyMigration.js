import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { migrationPipe, updateBlockVersion } from './migrations/utils';
import migrateSpacing from './migrations/migrateSpacing';
import migrateBorders from './migrations/migrateBorders';
import { isEmpty } from 'lodash';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			const defaults = getBlockType( 'generateblocks/image' )?.attributes;

			const newAttributes = migrationPipe(
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
					updateBlockVersion( 2 ),
				]
			);

			if ( ! isEmpty( newAttributes ) ) {
				setAttributes( newAttributes );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

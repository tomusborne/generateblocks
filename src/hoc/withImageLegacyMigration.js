import { useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { migrationPipe, updateBlockVersion } from './migrations/utils';
import migrateDimensions from './migrations/migrateDimensions';
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
					migrateDimensions( {
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

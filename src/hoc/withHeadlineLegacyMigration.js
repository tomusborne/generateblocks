import { useEffect } from '@wordpress/element';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import flexboxAlignment from '../utils/flexbox-alignment';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		const {
			blockVersion,
			hasIcon,
			iconVerticalAlignment,
			alignment,
		} = attributes;

		useEffect( () => {
			// Set our layout attributes for old Button blocks.
			// @since 1.7.0
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 2 ) ) {
				const flexAttributes = {};

				if ( hasIcon ) {
					flexAttributes.display = 'flex';
				}

				[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
					if ( attributes[ 'inlineWidth' + device ] ) {
						flexAttributes[ 'display' + device ] = hasIcon ? 'inline-flex' : 'inline-block';
					}

					if ( hasIcon ) {
						if ( 'above' !== attributes[ 'iconLocation' + device ] && attributes[ 'alignment' + device ] ) {
							flexAttributes[ 'justifyContent' + device ] = flexboxAlignment( alignment + device );
						}

						if ( 'inline' === attributes[ 'iconLocation' + device ] && attributes[ 'iconVerticalAlignment' + device ] ) {
							flexAttributes[ 'alignItems' + device ] = flexboxAlignment( iconVerticalAlignment + device );
						}

						if ( 'above' === attributes[ 'iconLocation' + device ] ) {
							flexAttributes[ 'flexDirection' + device ] = 'column';
						}
					}
				} );

				if ( Object.keys( flexAttributes ).length ) {
					setAttributes( flexAttributes );
				}
			}

			// Update block version flag if it's out of date.
			if ( isBlockVersionLessThan( blockVersion, 2 ) ) {
				setAttributes( { blockVersion: 2 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

import { useEffect } from '@wordpress/element';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			// This block used to be static. Set it to dynamic by default from now on.
			if ( 'undefined' === typeof attributes.isDynamic || ! attributes.isDynamic ) {
				setAttributes( { isDynamic: true } );
			}

			// Set our responsive stack and fill options if set on desktop.
			// @since 1.4.0.
			if ( 'undefined' === typeof attributes.blockVersion || attributes.blockVersion < 2 ) {
				if ( attributes.stack || attributes.fillHorizontalSpace ) {
					if ( attributes.stack ) {
						setAttributes( {
							stackTablet: true,
							stackMobile: true,
						} );
					}

					if ( attributes.fillHorizontalSpace ) {
						setAttributes( {
							fillHorizontalSpaceTablet: true,
							fillHorizontalSpaceMobile: true,
						} );
					}
				}
			}

			// Update block version flag if it's out of date.
			const blockVersion = 2;

			if ( 'undefined' === typeof attributes.blockVersion || attributes.blockVersion < blockVersion ) {
				setAttributes( { blockVersion } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};

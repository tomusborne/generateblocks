import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			clientId,
			attributes,
			setAttributes,
		} = props;

		const { insertBlocks } = useDispatch( 'core/block-editor' );
		const { getBlocksByClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

		useEffect( () => {
			const thisBlock = getBlocksByClientId( clientId )[ 0 ];

			if ( thisBlock ) {
				const childBlocks = thisBlock.innerBlocks;

				if ( 0 === childBlocks.length ) {
					insertBlocks(
						createBlock( 'generateblocks/button', generateBlocksStyling.button ),
						undefined,
						clientId
					);
				}
			}

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

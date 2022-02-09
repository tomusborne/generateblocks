import { Fragment } from '@wordpress/element';
import DesktopCSS from '../css/desktop';
import TabletCSS from '../css/tablet';
import TabletOnlyCSS from '../css/tablet-only';
import MobileCSS from '../css/mobile';
import MainCSS from '../css/main';
import { memo } from '@wordpress/element';

function ComponentCSS( props ) {
	const { deviceType } = props;

	return (
		<Fragment>

			<MainCSS { ...props } />

			{ deviceType &&
				<Fragment>
					{ 'Desktop' === deviceType &&
						<DesktopCSS { ...props } />
					}

					{ ( 'Tablet' === deviceType || 'Mobile' === deviceType ) &&
						<TabletCSS { ...props } />
					}

					{ 'Tablet' === deviceType &&
						<TabletOnlyCSS { ...props } />
					}

					{ 'Mobile' === deviceType &&
						<MobileCSS { ...props } />
					}
				</Fragment>
			}
		</Fragment>
	);
}

function compareAttributes( prevAttributes, nextAttributes ) {
	return Object.keys( prevAttributes ).every( ( key ) => {
		if ( Array.isArray( prevAttributes[ key ] ) ) {
			return prevAttributes[ key ].length === nextAttributes[ key ].length
		} else {
			return prevAttributes[ key ] === nextAttributes[ key ];
		}
	} );
}

export function shouldRebuildCSS( prevProps, nextProps ) {
	return (
		prevProps.deviceType === nextProps.deviceType &&
		prevProps.clientId === nextProps.clientId &&
		compareAttributes( prevProps.attributes, nextProps.attributes )
	);
}

export default memo( ComponentCSS, shouldRebuildCSS );

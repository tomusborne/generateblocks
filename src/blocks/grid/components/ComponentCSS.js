import { memo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import MainCSS from '../css/main';
import DesktopCSS from '../css/desktop';
import TabletCSS from '../css/tablet';
import TabletOnlyCSS from '../css/tablet-only';
import MobileCSS from '../css/mobile';
import shouldRebuildCSS from '../../../utils/should-rebuild-css';

function ComponentCSS( props ) {
	const deviceType = useSelect( ( select ) => {
		const { getDeviceType } = select( 'core/editor' ) || {};

		if ( 'function' === typeof getDeviceType ) {
			return getDeviceType();
		}

		const {
			__experimentalGetPreviewDeviceType: experimentalGetPreviewDeviceType,
		} = select( 'core/edit-post' );

		if ( 'function' === typeof experimentalGetPreviewDeviceType ) {
			return experimentalGetPreviewDeviceType();
		}

		return '';
	}, [] );

	const {
		isBlockPreview = false,
	} = props?.attributes;

	if ( isBlockPreview ) {
		return null;
	}

	return (
		<>
			<MainCSS { ...props } />

			{ deviceType &&
				<>
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
				</>
			}
		</>
	);
}

export default memo( ComponentCSS, shouldRebuildCSS );

import { memo } from '@wordpress/element';
import DesktopCSS from '../css/desktop';
import TabletCSS from '../css/tablet';
import TabletOnlyCSS from '../css/tablet-only';
import MobileCSS from '../css/mobile';
import MainCSS from '../css/main';
import shouldRebuildCSS from '../../../utils/should-rebuild-css';

function ComponentCSS( props ) {
	const { deviceType } = props;

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

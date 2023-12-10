import { InspectorControls } from '@wordpress/block-editor';
import { useContext, useState, useEffect } from '@wordpress/element';

import ControlsContext from '../../block-context';
import ResponsiveTabs from './controls/responsive-tabs';
import TypographyControls from './controls/typography';
import SpacingControls from './controls/spacing';
import BorderControls from './controls/borders';
import ColorsControls from './controls/colors';
import IconControls from './controls/icon';
import SettingsPanel from './controls/settings-panel';
import BackgroundPanel from './controls/background-panel';
import ShapesPanel from './controls/shapes-panel';
import LayoutControls from './controls/layout';
import SizingControls from './controls/sizing';
import getDeviceType from '../../utils/get-device-type';
import { useSelectedBlockElement } from '../../hooks';

export default function GenerateBlocksInspectorControls( { attributes, setAttributes, children } ) {
	const device = getDeviceType();
	const {
		supports: {
			responsiveTabs,
			settingsPanel,
			layout,
			typography,
			spacing,
			borders,
			colors,
			backgroundPanel,
			shapesPanel,
			icon,
			sizingPanel,
		},
	} = useContext( ControlsContext );
	const selectedBlockElement = useSelectedBlockElement();
	const selectedBlockElementClientId = selectedBlockElement ? selectedBlockElement?.dataset.block : 0;
	const [ computedStyles, setComputedStyles ] = useState( {} );

	useEffect( () => {
		if ( selectedBlockElement ) {
			setComputedStyles( getComputedStyle( selectedBlockElement ) );
		}
	}, [ selectedBlockElementClientId ] );

	return (
		<InspectorControls>
			{ responsiveTabs && <ResponsiveTabs /> }

			{ settingsPanel.enabled && !! children &&
				<SettingsPanel>{ children }</SettingsPanel>
			}

			{ layout.enabled &&
				<LayoutControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ sizingPanel.enabled &&
				<SizingControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ spacing.enabled &&
				<SpacingControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ borders.enabled &&
				<BorderControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ typography.enabled && ! attributes.removeText &&
				<TypographyControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ colors.enabled && 'Desktop' === device &&
				<ColorsControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ backgroundPanel.enabled && 'Desktop' === device &&
				<BackgroundPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ shapesPanel.enabled && ( 'Desktop' === device || attributes?.shapeDividers.length > 0 ) &&
				<ShapesPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}

			{ icon.enabled && ( 'Desktop' === device || !! attributes.icon ) &&
				<IconControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
				/>
			}
		</InspectorControls>
	);
}

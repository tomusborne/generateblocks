import { InspectorControls } from '@wordpress/block-editor';
import { useContext } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import ControlsContext from '../../block-context';
import ResponsiveTabs from './controls/responsive-tabs/responsive-tabs';
import TypographyControls from './controls/typography';
import SpacingControls from './controls/spacing';
import ColorsControls from './controls/colors';
import IconControls from './controls/icon';
import ElementControls from './controls/element';
import BackgroundGradient from './controls/background-gradient';
import SettingsPanel from './controls/settings-panel';
import LayoutControls from './controls/layout';

export default function GenerateBlocksInspectorControls( { attributes, setAttributes, computedStyles, children } ) {
	const [ device ] = useDeviceType();
	const {
		supports: {
			responsiveTabs,
			settingsPanel,
			layout,
			typography,
			spacing,
			colors,
			backgroundGradient,
			icon,
			htmlTags,
		},
	} = useContext( ControlsContext );

	return (
		<InspectorControls>
			{ responsiveTabs && <ResponsiveTabs /> }

			{ settingsPanel.enabled && !! children &&
				<SettingsPanel>{ children }</SettingsPanel>
			}

			{ htmlTags.enabled && 'Desktop' === device && ! attributes.isCaption &&
				<ElementControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}

			{ layout.enabled &&
				<LayoutControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}

			{ typography.enabled && ! attributes.removeText &&
				<TypographyControls
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

			{ colors.enabled &&
				<ColorsControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}

			{ backgroundGradient.enabled &&
				<BackgroundGradient
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}

			{ icon.enabled && ( 'Desktop' === device || !! attributes.icon ) &&
				<IconControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</InspectorControls>
	);
}

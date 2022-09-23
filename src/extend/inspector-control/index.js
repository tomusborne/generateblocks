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

export default function GenerateBlocksInspectorControls( { attributes, setAttributes, computedStyles } ) {
	const [ device ] = useDeviceType();
	const {
		supports: {
			responsiveTabs,
			typography,
			spacing,
			colors,
			hasIcon,
			htmlTags,
		},
	} = useContext( ControlsContext );

	return (
		<InspectorControls>
			{ responsiveTabs && <ResponsiveTabs /> }

			{ htmlTags.enabled && 'Desktop' === device && ! attributes.isCaption &&
				<ElementControls
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

			{ hasIcon && ( 'Desktop' === device || !! attributes.icon ) &&
				<IconControls
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</InspectorControls>
	);
}

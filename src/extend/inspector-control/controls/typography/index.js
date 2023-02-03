import PanelArea from '../../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import FontSize from './components/font-size';
import FontWeight from './components/font-weight';
import TextTransform from './components/text-transform';
import LetterSpacing from './components/letter-spacing';
import LineHeight from './components/line-height';
import FontFamily from './components/font-family';
import Alignment from './components/alignment';
import getAttribute from '../../../../utils/get-attribute';
import FlexControl from '../../../../components/flex-control';
import getDeviceType from '../../../../utils/get-device-type';
import './editor.scss';

export default function Typography( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { id, supports: { typography } } = useContext( ControlsContext );
	const isDesktop = 'Desktop' === device;

	return (
		<PanelArea
			title={ __( 'Typography', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'typography' ) }
			className="gblocks-panel-label"
			id={ `${ id }Typography` }
		>
			{ typography.alignment &&
				<Alignment
					value={ getAttribute( 'alignment', { attributes, deviceType: device } ) }
					onChange={ ( value ) => setAttributes( { [ getAttribute( 'alignment', { attributes, deviceType: device }, true ) ]: value } ) }
				/>
			}

			{ !! isDesktop && ( typography.fontWeight || typography.textTransform ) &&
				<FlexControl>
					<FontWeight
						value={ attributes.fontWeight }
						onChange={ ( value ) => setAttributes( { fontWeight: value } ) }
					/>

					<TextTransform
						value={ attributes.textTransform }
						onChange={ ( textTransform ) => setAttributes( { textTransform } ) }
					/>
				</FlexControl>
			}

			{ typography.fontSize &&
				<FontSize
					attributes={ attributes }
					setAttributes={ setAttributes }
					computedStyles={ computedStyles }
					device={ device }
				/>
			}

			{ typography.lineHeight &&
				<LineHeight
					attributes={ attributes }
					setAttributes={ setAttributes }
					device={ device }
				/>
			}

			{ typography.letterSpacing &&
				<LetterSpacing
					attributes={ attributes }
					setAttributes={ setAttributes }
					device={ device }
				/>
			}

			{ typography.fontFamily && isDesktop &&
				<FontFamily
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</PanelArea>
	);
}

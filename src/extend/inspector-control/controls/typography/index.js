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
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import './editor.scss';

export default function Typography( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { id, supports: { typography: typographySupports } } = useContext( ControlsContext );
	const { typography } = attributes;
	const isDesktop = 'Desktop' === device;

	return (
		<PanelArea
			title={ __( 'Typography', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'typography' ) }
			className="gblocks-panel-label"
			id={ `${ id }Typography` }
		>
			{ typographySupports.alignment &&
				<Alignment
					value={ getAttribute( 'textAlign', { attributes: typography, deviceType: device } ) }
					onChange={ ( value ) => {
						setAttributes( {
							typography: {
								[ getAttribute( 'textAlign', { attributes: typography, deviceType: device }, true ) ]: value,
							},
						} );
					} }
				/>
			}

			{ !! isDesktop && ( typographySupports.fontWeight || typographySupports.textTransform ) &&
				<FlexControl>
					<FontWeight
						value={ typography?.fontWeight }
						onChange={ ( value ) => {
							setAttributes( {
								typography: {
									[ getAttribute( 'fontWeight', { attributes: typography, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>

					<TextTransform
						value={ typography?.textTransform }
						onChange={ ( value ) => {
							setAttributes( {
								typography: {
									[ getAttribute( 'textTransform', { attributes: typography, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				</FlexControl>
			}

			{ typographySupports.fontSize &&
				<FontSize
					value={ getAttribute( 'fontSize', { attributes: typography, deviceType: device } ) }
					placeholder={ getResponsivePlaceholder( 'fontSize', typography, device, computedStyles.fontSize ) }
					onChange={ ( value ) => {
						setAttributes( {
							typography: {
								[ getAttribute( 'fontSize', { attributes: typography, deviceType: device }, true ) ]: value,
							},
						} );
					} }
				/>
			}

			{ typographySupports.lineHeight &&
				<LineHeight
					defaultUnit="em"
					value={ getAttribute( 'lineHeight', { attributes: typography, deviceType: device } ) }
					placeholder={ getResponsivePlaceholder( 'lineHeight', typography, device, computedStyles.lineHeight ) }
					onChange={ ( value ) => {
						setAttributes( {
							typography: {
								[ getAttribute( 'lineHeight', { attributes: typography, deviceType: device }, true ) ]: value,
							},
						} );
					} }
				/>
			}

			{ typographySupports.letterSpacing &&
				<LetterSpacing
					defaultUnit="em"
					value={ getAttribute( 'letterSpacing', { attributes: typography, deviceType: device } ) }
					placeholder={ getResponsivePlaceholder( 'letterSpacing', typography, device, computedStyles.letterSpacing ) }
					onChange={ ( value ) => {
						setAttributes( {
							typography: {
								[ getAttribute( 'letterSpacing', { attributes: typography, deviceType: device }, true ) ]: value,
							},
						} );
					} }
				/>
			}

			{ typographySupports.fontFamily && isDesktop &&
				<FontFamily
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</PanelArea>
	);
}

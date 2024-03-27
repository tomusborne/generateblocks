import { __ } from '@wordpress/i18n';
import { useContext, useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
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
import { useStyleIndicator, useDeviceAttributes } from '../../../../hooks';
import { getContentAttribute } from '../../../../utils/get-content-attribute';
import './editor.scss';

export default function Typography( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { id, blockName, supports: { typography: typographySupports } } = useContext( ControlsContext );
	const panelRef = useRef( null );
	const contentValue = getContentAttribute( attributes, blockName );
	const [ deviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const { typography } = attributes;
	const isDesktop = 'Desktop' === device;
	const panelControls = {
		fontFamily: false,
		fontSize: false,
		fontWeight: false,
		letterSpacing: false,
		lineHeight: false,
		textAlign: false,
		textTransform: false,
	};
	const {
		dispatchControlGlobalStyle,
		styleSources,
		hasGlobalStyle,
		contentWasUpdated,
	} = useStyleIndicator( computedStyles, panelControls, contentValue, deviceAttributes );

	const {
		fontFamily = '',
		fontSize = '',
		fontWeight = '',
		letterSpacing = '',
		lineHeight = '',
		textAlign = '',
		textTransform = '',
	} = deviceAttributes.typography;

	function getLabel( defaultLabel, rules ) {
		return applyFilters(
			'generateblocks.editor.control.label',
			defaultLabel,
			rules,
			styleSources,
			dispatchControlGlobalStyle,
			contentWasUpdated,
		);
	}

	const labels = {
		fontFamily: getLabel(
			__( 'Font Family', 'generateblocks' ),
			{ fontFamily },
		),
		fontSize: getLabel(
			__( 'Font Size', 'generateblocks' ),
			{ fontSize },
		),
		fontWeight: getLabel(
			__( 'Font Weight', 'generateblocks' ),
			{ fontWeight },
		),
		letterSpacing: getLabel(
			__( 'Letter Spacing', 'generateblocks' ),
			{ letterSpacing },
		),
		lineHeight: getLabel(
			__( 'Line Height', 'generateblocks' ),
			{ lineHeight },
		),
		textAlign: getLabel(
			__( 'Text Alignment', 'generateblocks' ),
			{ textAlign },
		),
		textTransform: getLabel(
			__( 'Transform', 'generateblocks' ),
			{ textTransform },
		),
	};

	return (
		<PanelArea
			title={ __( 'Typography', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'typography' ) }
			className="gblocks-panel-label"
			ref={ panelRef }
			hasGlobalStyle={ hasGlobalStyle }
			id={ `${ id }Typography` }
		>
			{ typographySupports.alignment &&
				<Alignment
					label={ labels.textAlign }
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
						label={ labels.fontWeight }
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
						label={ labels.textTransform }
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
					label={ labels.fontSize }
					value={ getAttribute( 'fontSize', { attributes: typography, deviceType: device } ) }
					placeholder={ getResponsivePlaceholder( 'fontSize', typography, device, parseInt( computedStyles.fontSize ) || '' ) }
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
					label={ labels.lineHeight }
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
					label={ labels.letterSpacing }
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
					label={ labels.fontFamily }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</PanelArea>
	);
}

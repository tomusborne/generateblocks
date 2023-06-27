import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import { Tooltip, Button } from '@wordpress/components';
import MinHeight from './components/MinHeight';
import getAttribute from '../../../../utils/get-attribute';
import Width from './components/Width';
import MaxWidth from './components/MaxWidth';
import Height from './components/Height';
import MinWidth from './components/MinWidth';
import MaxHeight from './components/MaxHeight';
import './editor.scss';
import getDeviceType from '../../../../utils/get-device-type';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';

export default function Sizing( props ) {
	const { id, supports: { sizingPanel } } = useContext( ControlsContext );
	const device = getDeviceType();
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		useGlobalMaxWidth = false,
		useInnerContainer = false,
		isGrid = false,
		sizing,
	} = attributes;

	function getValue( name ) {
		return sizing && sizing[ getAttribute( name, { attributes, deviceType: device }, true ) ]
			? sizing[ getAttribute( name, { attributes, deviceType: device }, true ) ]
			: '';
	}

	return (
		<PanelArea
			title={ __( 'Sizing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'sizing' ) }
			className="gblocks-panel-label"
			id={ `${ id }Sizing` }
		>
			<div className="gblocks-sizing-fields">
				{ sizingPanel.width &&
					<Width
						value={ getValue( 'width' ) }
						placeholder={ getResponsivePlaceholder( 'width', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'width', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.height &&
					<Height
						value={ getValue( 'height' ) }
						placeholder={ getResponsivePlaceholder( 'height', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'height', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minWidth &&
					<MinWidth
						value={ getValue( 'minWidth' ) }
						placeholder={ getResponsivePlaceholder( 'minWidth', attributes.sizing, device ) }
						disabled={ isGrid }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'minWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minHeight &&
					<MinHeight
						value={ getValue( 'minHeight' ) }
						placeholder={ getResponsivePlaceholder( 'minHeight', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'minHeight', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.maxWidth &&
					<MaxWidth
						value={ getValue( 'maxWidth' ) }
						placeholder={ getResponsivePlaceholder( 'maxWidth', attributes.sizing, device ) }
						overrideValue={ !! useGlobalMaxWidth ? generateBlocksInfo.globalContainerWidth : null }
						disabled={ useInnerContainer || isGrid || ( useGlobalMaxWidth && 'Desktop' === device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'maxWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
						overrideAction={ () => {
							if ( ! sizingPanel.useGlobalMaxWidth || useInnerContainer || isGrid || 'Desktop' !== device || getValue( 'maxWidth' ) ) {
								return null;
							}

							return (
								<Tooltip text={ __( 'Use global max-width', 'generateblocks' ) }>
									<Button
										icon={ getIcon( 'globe' ) }
										variant={ !! useGlobalMaxWidth ? 'primary' : '' }
										onClick={ () => {
											setAttributes( {
												useGlobalMaxWidth: useGlobalMaxWidth ? false : true,
											} );
										} }
									/>
								</Tooltip>
							);
						} }
					/>
				}

				{ sizingPanel.maxHeight &&
					<MaxHeight
						value={ getValue( 'maxHeight' ) }
						placeholder={ getResponsivePlaceholder( 'maxHeight', attributes.sizing, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									[ getAttribute( 'maxHeight', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}
			</div>
		</PanelArea>
	);
}

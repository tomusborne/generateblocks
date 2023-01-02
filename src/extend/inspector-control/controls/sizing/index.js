import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import { Tooltip, Button } from '@wordpress/components';
import { globe } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import MinHeight from './components/MinHeight';
import getAttribute from '../../../../utils/get-attribute';
import Width from './components/Width';
import MaxWidth from './components/MaxWidth';
import Height from './components/Height';
import MinWidth from './components/MinWidth';
import MaxHeight from './components/MaxHeight';
import './editor.scss';
import getDeviceType from '../../../../utils/get-device-type';

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

	function getUnits( context ) {
		return applyFilters(
			'generateblocks.editor.sizingUnits',
			[ 'px', 'em', '%', 'rem', 'vw', 'vh', 'ch' ],
			context
		);
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
						desktopValue={ sizing?.width }
						tabletValue={ sizing?.widthTablet }
						units={ getUnits( 'width' ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
									[ getAttribute( 'width', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.height &&
					<Height
						value={ getValue( 'height' ) }
						desktopValue={ sizing?.height }
						tabletValue={ sizing?.heightTablet }
						units={ getUnits( 'height' ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
									[ getAttribute( 'height', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minWidth &&
					<MinWidth
						value={ getValue( 'minWidth' ) }
						desktopValue={ sizing?.minWidth }
						tabletValue={ sizing?.minWidthTablet }
						units={ getUnits( 'minWidth' ) }
						disabled={ isGrid }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
									[ getAttribute( 'minWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.minHeight &&
					<MinHeight
						value={ getValue( 'minHeight' ) }
						desktopValue={ sizing?.minHeight }
						tabletValue={ sizing?.minHeightTablet }
						units={ getUnits( 'minHeight' ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
									[ getAttribute( 'minHeight', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.maxWidth &&
					<MaxWidth
						value={ getValue( 'maxWidth' ) }
						desktopValue={ sizing?.maxWidth }
						tabletValue={ sizing?.maxWidthTablet }
						units={ getUnits( 'maxWidth' ) }
						overrideValue={ !! useGlobalMaxWidth ? generateBlocksInfo.globalContainerWidth : null }
						disabled={ useInnerContainer || isGrid || ( useGlobalMaxWidth && 'Desktop' === device ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
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
										icon={ globe }
										isPrimary={ !! useGlobalMaxWidth }
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
						desktopValue={ sizing?.maxHeight }
						tabletValue={ sizing?.maxHeightTablet }
						units={ getUnits( 'maxHeight' ) }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
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

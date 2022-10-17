import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import { ToggleControl } from '@wordpress/components';
import MinHeight from './components/MinHeight';
import getAttribute from '../../../../utils/get-attribute';
import { useDeviceType } from '../../../../hooks';
import Width from './components/Width';
import MaxWidth from './components/MaxWidth';
import Height from './components/Height';
import MinWidth from './components/MinWidth';
import MaxHeight from './components/MaxHeight';
import './editor.scss';

export default function Sizing( props ) {
	const { id, supports: { sizingPanel } } = useContext( ControlsContext );
	const [ device ] = useDeviceType();
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		useGlobalContainerWidth = false,
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
						desktopValue={ sizing?.width }
						tabletValue={ sizing?.widthTablet }
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
						useGlobalContainerWidth={ useGlobalContainerWidth }
						disabled={ useInnerContainer || useGlobalContainerWidth || isGrid }
						onChange={ ( value ) => {
							setAttributes( {
								sizing: {
									...sizing,
									[ getAttribute( 'maxWidth', { attributes, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				}

				{ sizingPanel.maxHeight &&
					<MaxHeight
						value={ getValue( 'maxHeight' ) }
						desktopValue={ sizing?.maxHeight }
						tabletValue={ sizing?.maxHeightTablet }
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

			{ sizingPanel.useGlobalMaxWidth && ! useInnerContainer && ! isGrid &&
				<ToggleControl
					label={ __( 'Use Global max-width', 'generateblocks' ) }
					className={ 'gblocks-global-container-width' }
					checked={ !! useGlobalContainerWidth }
					onChange={ ( value ) => {
						setAttributes( {
							useGlobalContainerWidth: value,
						} );
					} }
				/>
			}
		</PanelArea>
	);
}

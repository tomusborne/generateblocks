import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import Display from './components/Display';
import isFlexItem from '../../../../utils/is-flex-item';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';

export default function Layout( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();
	const { id, supports: { layout } } = useContext( ControlsContext );

	const componentProps = {
		attributes,
		deviceType: device,
	};

	return (
		<PanelArea
			title={ __( 'Layout', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'layout' ) }
			className="gblocks-panel-label"
			id={ `${ id }Layout` }
		>
			{ layout.display &&
				<Display
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ isFlexItem( { device, attributes } ) &&
				<>
					{ layout.flexDirection &&
						<LayoutControl
							value={ getAttribute( 'flexDirection', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'flexDirection', componentProps, true ) ]: value !== getAttribute( 'flexDirection', componentProps ) ? value : '',
							} ) }
							label={ __( 'Direction', 'generateblocks' ) }
							attributeName="flexDirection"
							directionValue={ getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' ) }
						/>
					}

					{ layout.alignItems &&
						<LayoutControl
							value={ getAttribute( 'alignItems', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'alignItems', componentProps, true ) ]: value !== getAttribute( 'alignItems', componentProps ) ? value : '',
							} ) }
							label={ __( 'Align Items', 'generateblocks' ) }
							attributeName="alignItems"
							directionValue={ getResponsivePlaceholder( 'alignItems', attributes, device, 'row' ) }
						/>
					}

					{ layout.justifyContent &&
						<LayoutControl
							value={ getAttribute( 'justifyContent', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'justifyContent', componentProps, true ) ]: value !== getAttribute( 'justifyContent', componentProps ) ? value : '',
							} ) }
							label={ __( 'Justify Content', 'generateblocks' ) }
							attributeName="justifyContent"
							directionValue={ getResponsivePlaceholder( 'justifyContent', attributes, device, 'row' ) }
						/>
					}

					{ layout.flexWrap &&
						<LayoutControl
							value={ getAttribute( 'flexWrap', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'flexWrap', componentProps, true ) ]: value !== getAttribute( 'flexWrap', componentProps ) ? value : '',
							} ) }
							label={ __( 'Wrap', 'generateblocks' ) }
							attributeName="flexWrap"
							directionValue={ getResponsivePlaceholder( 'flexWrap', attributes, device, 'row' ) }
						/>
					}
				</>
			}
		</PanelArea>
	);
}

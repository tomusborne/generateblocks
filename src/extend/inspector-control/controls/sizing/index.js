import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import UnitControl from '../../../../components/unit-control';
import { ToggleControl } from '@wordpress/components';

export default function Sizing( props ) {
	const { id, supports: { sizing } } = useContext( ControlsContext );

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		useGlobalContainerWidth,
		useInnerContainer,
	} = attributes;

	if ( 'container' === id && useInnerContainer ) {
		return null;
	}

	return (
		<PanelArea
			title={ __( 'Sizing', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'spacing' ) }
			className="gblocks-panel-label"
			id={ `${ id }Sizing` }
		>
			{ sizing.maxWidth &&
				<UnitControl
					label={ __( 'Maximum Width', 'generateblocks' ) }
					id="gblocks-max-width"
					attributeName="maxWidth"
					attributes={ attributes }
					setAttributes={ setAttributes }
					min="1"
					units={ [ 'px', '%', 'vw', 'rem' ] }
					overrideValue={ !! useGlobalContainerWidth ? generateBlocksInfo.globalContainerWidth : null }
					disabled={ !! useGlobalContainerWidth }
				/>
			}

			{ sizing.useGlobalMaxWidth &&
				<ToggleControl
					label={ __( 'Use Global Container Width', 'generateblocks' ) }
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

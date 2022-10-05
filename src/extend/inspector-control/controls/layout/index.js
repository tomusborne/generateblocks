import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import isFlexItem from '../../../../utils/is-flex-item';
import getAttribute from '../../../../utils/get-attribute';
import { SelectControl } from '@wordpress/components';

export default function Layout( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();
	const { id, supports: { layout } } = useContext( ControlsContext );

	const componentProps = {
		setAttributes,
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
				<SelectControl
					label={ __( 'Display', 'generateblocks' ) }
					value={ getAttribute( 'display', componentProps ) }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'block', value: 'block' },
						{ label: 'inline-block', value: 'inline-block' },
						{ label: 'flex', value: 'flex' },
						{ label: 'inline-flex', value: 'inline-flex' },
						{ label: 'inline', value: 'inline' },
						{ label: 'none', value: 'none' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							[ getAttribute( 'display', componentProps, true ) ]: value,
						} );
					} }
				/>
			}

			{ isFlexItem( { device, attributes } ) &&
				<>
					{ layout.flexDirection &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Direction', 'generateblocks' ) }
							attributeName="flexDirection"
						/>
					}

					{ layout.alignItems &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Align Items', 'generateblocks' ) }
							attributeName="alignItems"
						/>
					}

					{ layout.justifyContent &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Justify Content', 'generateblocks' ) }
							attributeName="justifyContent"
						/>
					}

					{ layout.flexWrap &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Wrap', 'generateblocks' ) }
							attributeName="flexWrap"
						/>
					}
				</>
			}
		</PanelArea>
	);
}

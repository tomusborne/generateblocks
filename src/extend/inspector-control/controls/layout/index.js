import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import isFlexItem from '../../../../utils/is-flex-item';

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
				<LayoutControl
					{ ...componentProps }
					label={ __( 'Display', 'generateblocks' ) }
					attributeName="display"
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'block', value: 'block' },
						{ label: 'inline-block', value: 'inline-block' },
						{ label: 'flex', value: 'flex' },
						{ label: 'inline-flex', value: 'inline-flex' },
						{ label: 'inline', value: 'inline' },
						{ label: 'none', value: 'none' },
					] }
				/>
			}

			{ isFlexItem( { device, attributes } ) &&
				<>
					{ layout.flexDirection &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Flex Direction', 'generateblocks' ) }
							attributeName="flexDirection"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Row', 'generateblocks' ), value: 'row' },
								{ label: __( 'Column', 'generateblocks' ), value: 'column' },
								{ label: __( 'Row (reverse)', 'generateblocks' ), value: 'row-reverse' },
								{ label: __( 'Column (reverse)', 'generateblocks' ), value: 'column-reverse' },
							] }
						/>
					}

					{ layout.flexWrap &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Flex Wrap', 'generateblocks' ) }
							attributeName="flexWrap"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'No Wrap', 'generateblocks' ), value: 'nowrap' },
								{ label: __( 'Wrap', 'generateblocks' ), value: 'wrap' },
								{ label: __( 'Wrap (reverse)', 'generateblocks' ), value: 'wrap-reverse' },
							] }
						/>
					}

					{ layout.alignItems &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Align Items', 'generateblocks' ) }
							attributeName="alignItems"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Stretch', 'generateblocks' ), value: 'stretch' },
							] }
						/>
					}

					{ layout.justifyContent &&
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Justify Content', 'generateblocks' ) }
							attributeName="justifyContent"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Space Between', 'generateblocks' ), value: 'space-between' },
								{ label: __( 'Space Around', 'generateblocks' ), value: 'space-around' },
							] }
						/>
					}
				</>
			}
		</PanelArea>
	);
}

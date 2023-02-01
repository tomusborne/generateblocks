import { __ } from '@wordpress/i18n';
import NumberControl from '../../../../../components/number-control';

export default function LineHeight( { attributes, setAttributes, device } ) {
	return (
		<NumberControl
			label={ __( 'Line Height', 'generateblocks' ) }
			attributeName="lineHeight"
			units={ [ 'px', 'em', '%' ] }
			device={ device }
			attributes={ attributes }
			setAttributes={ setAttributes }
			presets={
				[
					{
						unit: 'em',
						data: [
							{
								label: __( 'Small', 'generateblocks' ),
								value: 0.8,
							},
							{
								label: __( 'Medium', 'generateblocks' ),
								value: 1,
							},
							{
								label: __( 'Large', 'generateblocks' ),
								value: 1.5,
							},
						],
					},
				]
			}
			min="0"
			step={ .1 }
		/>
	);
}

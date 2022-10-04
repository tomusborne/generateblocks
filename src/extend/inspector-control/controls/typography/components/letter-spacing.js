import { __ } from '@wordpress/i18n';
import NumberControl from '../../../../../components/number-control';

export default function LetterSpacing( { attributes, setAttributes, device } ) {
	return (
		<NumberControl
			label={ __( 'Letter Spacing', 'generateblocks' ) }
			attributeName="letterSpacing"
			unit="em"
			units={ [ 'em' ] }
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
								value: -0.02,
							},
							{
								label: __( 'Medium', 'generateblocks' ),
								value: 0.02,
							},
							{
								label: __( 'Large', 'generateblocks' ),
								value: 0.05,
							},
						],
					},
				]
			}
			min={ -1 }
			step={ .01 }
		/>
	);
}

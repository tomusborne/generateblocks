import NumberControl from '../../../../../components/number-control';
import { __ } from '@wordpress/i18n';

export default function FontSize( { attributes, computedStyles, setAttributes, device } ) {
	return (
		<NumberControl
			label={ __( 'Font Size', 'generateblocks' ) }
			attributeName="fontSize"
			units={ [ 'px', 'em', '%' ] }
			defaultPlaceholder={
				computedStyles.fontSize && 'px' === attributes.fontSizeUnit
					? computedStyles.fontSize
					: ''
			}
			presets={
				[
					{
						unit: 'px',
						data: [ 13, 17, 25, 35 ],
					},
				]
			}
			min="1"
			attributes={ attributes }
			setAttributes={ setAttributes }
			device={ device }
		/>
	);
}

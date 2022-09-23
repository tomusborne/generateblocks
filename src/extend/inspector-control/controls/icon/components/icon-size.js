import { __ } from '@wordpress/i18n';
import NumberControl from '../../../../../components/number-control';
import { useDeviceType } from '../../../../../hooks';

export default function IconSize( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();

	return (
		<NumberControl
			attributes={ attributes }
			setAttributes={ setAttributes }
			label={ __( 'Icon Size', 'generateblocks' ) }
			attributeName="iconSize"
			units={ [ 'px', 'em' ] }
			device={ device }
			presets={
				[
					{
						unit: 'em',
						data: [ 0.7, 1, 1.5, 2 ],
					},
				]
			}
			presetUnit="em"
			min="1"
			step={ 'em' === attributes.iconSizeUnit ? .1 : 1 }
		/>
	);
}

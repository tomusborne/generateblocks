import IconLocation from './icon-location';
import IconAlignment from './icon-alignment';
import IconPadding from './icon-padding';

export default function IconStyles( props ) {
	const {
		locationOptions,
		iconLocation,
		iconVerticalAlignment,
		attributes,
		setAttributes,
		onChangeLocation,
		onChangeAlignment,
	} = props;

	return (
		<>
			<IconLocation value={ iconLocation } onChange={ onChangeLocation } options={ locationOptions } />

			{ 'inline' === iconLocation &&
				<IconAlignment value={ iconVerticalAlignment } onChange={ onChangeAlignment } />
			}

			<IconPadding
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
}

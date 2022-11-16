import IconLocation from './icon-location';
import IconPadding from './icon-padding';

export default function IconStyles( props ) {
	const {
		locationOptions,
		iconLocation,
		attributes,
		setAttributes,
		onChangeLocation,
	} = props;

	return (
		<>
			<IconLocation value={ iconLocation } onChange={ onChangeLocation } options={ locationOptions } />
			<IconPadding attributes={ attributes } setAttributes={ setAttributes } />
		</>
	);
}

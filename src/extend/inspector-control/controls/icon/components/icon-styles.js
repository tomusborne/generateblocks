import IconLocation from './icon-location';
import IconAlignment from './icon-alignment';
import IconPadding from './icon-padding';

export default function IconStyles( props ) {
	const {
		iconLocation,
		iconVerticalAlignment,
		attributes,
		setAttributes,
		onChangeLocation,
		onChangeAlignment,
	} = props;

	return (
		<>
			<IconLocation value={ iconLocation } onChange={ onChangeLocation } />

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

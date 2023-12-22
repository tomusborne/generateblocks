import UnitControl from '../../../../../components/unit-control';

export default function FontSize( { value, placeholder, onChange, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-font-size"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

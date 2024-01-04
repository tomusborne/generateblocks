import UnitControl from '../../../../../components/unit-control';

export default function Width( { value, placeholder, onChange, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-width"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

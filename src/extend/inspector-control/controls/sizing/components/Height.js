import UnitControl from '../../../../../components/unit-control';

export default function Height( { value, onChange, placeholder, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-height"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

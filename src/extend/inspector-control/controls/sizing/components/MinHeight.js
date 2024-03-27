import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( { value, onChange, placeholder, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-min-height"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

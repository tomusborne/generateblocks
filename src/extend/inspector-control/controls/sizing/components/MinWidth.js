import UnitControl from '../../../../../components/unit-control';

export default function MinWidth( { value, onChange, disabled, placeholder, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-min-width"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
			disabled={ disabled }
		/>
	);
}

import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( {
	value,
	onChange,
	disabled,
	overrideValue,
	overrideAction,
	placeholder,
	label,
} ) {
	return (
		<>
			<UnitControl
				label={ label }
				id="gblocks-max-width"
				overrideValue={ overrideValue }
				disabled={ disabled }
				value={ value }
				placeholder={ placeholder }
				onChange={ onChange }
				overrideAction={ overrideAction }
			/>
		</>
	);
}

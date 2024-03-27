import UnitControl from '../../../../../components/unit-control';

export default function MaxHeight( { value, onChange, placeholder, label } ) {
	return (
		<>
			<UnitControl
				label={ label }
				id="gblocks-max-height"
				value={ value }
				placeholder={ placeholder }
				onChange={ onChange }
			/>
		</>
	);
}

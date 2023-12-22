import UnitControl from '../../../../../components/unit-control';

export default function LineHeight( { value, placeholder, onChange, defaultUnit, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-line-height"
			defaultUnit={ defaultUnit }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

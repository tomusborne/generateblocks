import UnitControl from '../../../../../components/unit-control';

export default function LetterSpacing( { value, placeholder, onChange, defaultUnit, label } ) {
	return (
		<UnitControl
			label={ label }
			id="gblocks-letter-spacing"
			defaultUnit={ defaultUnit }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}

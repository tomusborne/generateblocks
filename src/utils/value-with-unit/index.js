import isNumeric from '../is-numeric';

export default function valueWithUnit( value, unit ) {
	if ( ! value && 0 !== value ) {
		return false;
	}

	return isNumeric( value ) && unit
		? value + unit
		: value;
}

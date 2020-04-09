export default function valueWithUnit( value, unit ) {
	if ( ! value && 0 !== value ) {
		return false;
	}

	return value + unit;
}

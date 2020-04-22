export default function flexboxAlignment( value ) {
	if ( 'left' === value || 'top' === value ) {
		return 'flex-start';
	}

	if ( 'right' === value || 'bottom' === value ) {
		return 'flex-end';
	}

	return value;
}

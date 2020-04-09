export default function flexboxAlignment( value ) {
	if ( 'left' === value ) {
		return 'flex-start';
	}

	if ( 'right' === value ) {
		return 'flex-end';
	}

	return value;
}

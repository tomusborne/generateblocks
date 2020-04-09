export default function buildCSS( cssObj ) {
	let css = '';

	for ( const [ key, value ] of Object.entries( cssObj ) ) {
		if ( value.length < 1 ) {
			continue;
		}

		var temp_output = key + '{';
		var elements_added = 0;

		for ( const [ index, properties ] of Object.entries( value ) ) {
			for ( const [ attribute, val ] of Object.entries( properties ) ) {
				if ( ! val && 0 !== val ) {
					continue;
				}

				elements_added++;
				temp_output += attribute + ': ' + val + ';';
			}
		}

		temp_output += '}';

		if ( elements_added > 0 ) {
			css += temp_output;
		}
	}

	return css;
}

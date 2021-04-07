export default function getResponsivePlaceholder( name, attributes, device, fallback ) {
	let responsivePlaceholder = attributes[ name ];

	if ( 'Mobile' === device && attributes[ name + 'Tablet' ] ) {
		responsivePlaceholder = attributes[ name + 'Tablet' ];
	}

	if ( '' === responsivePlaceholder ) {
		responsivePlaceholder = fallback;
	}

	return responsivePlaceholder;
}

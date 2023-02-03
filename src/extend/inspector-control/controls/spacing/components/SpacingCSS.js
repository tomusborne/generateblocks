import addToCSS from '../../../../../utils/add-to-css';
import valueWithUnit from '../../../../../utils/value-with-unit';

export default function SpacingCSS( css, selector, attributes, device = '' ) {
	const {
		marginUnit,
	} = attributes;

	const fallback = '' === device ? '0' : '';

	const styles = {
		'margin-top': valueWithUnit( attributes[ 'marginTop' + device ], 'auto' !== attributes[ 'marginTop' + device ] ? marginUnit : '' ),
		'margin-right': valueWithUnit( attributes[ 'marginRight' + device ], 'auto' !== attributes[ 'marginRight' + device ] ? marginUnit : '' ) || fallback,
		'margin-bottom': valueWithUnit( attributes[ 'marginBottom' + device ], 'auto' !== attributes[ 'marginBottom' + device ] ? marginUnit : '' ),
		'margin-left': valueWithUnit( attributes[ 'marginLeft' + device ], 'auto' !== attributes[ 'marginLeft' + device ] ? marginUnit : '' ) || fallback,
	};

	return (
		addToCSS( css, selector, styles )
	);
}

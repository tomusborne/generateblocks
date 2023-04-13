import AlignmentMatrix from '../../../components/alignment-matrix';
import templates from './templates';

function getTemplate( direction ) {
	if ( direction && ! templates.hasOwnProperty( direction ) ) {
		return {};
	}

	return templates[ direction || 'row' ];
}

function findActiveCell( activeTemplate, display, alignItems, justifyContent ) {
	if ( 'flex' !== display ) {
		return '';
	}

	return Object.entries( activeTemplate ).reduce( ( activeCell, [ key, cell ] ) => {
		if ( cell.alignItems === alignItems && cell.justifyContent === justifyContent ) {
			return key;
		}

		return activeCell;
	}, '' );
}

function AlignmentMatrixControl( { attributes, setAttributes } ) {
	const activeTemplate = getTemplate( attributes.flexDirection );
	const activeCell = findActiveCell(
		activeTemplate,
		attributes.display,
		attributes.alignItems,
		attributes.justifyContent
	);

	return (
		<AlignmentMatrix
			value={ activeCell }
			options={ activeTemplate }
			onChange={ setAttributes }
		/>
	);
}

export default AlignmentMatrixControl;

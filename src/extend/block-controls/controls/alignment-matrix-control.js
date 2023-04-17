import AlignmentMatrix from '../../../components/alignment-matrix';
import templates from './templates';
import useDeviceAttributes from '../../../hooks/useDeviceAttributes';
import getIcon from '../../../utils/get-icon';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const activeTemplate = getTemplate( deviceAttributes.flexDirection );
	const activeCell = findActiveCell(
		activeTemplate,
		deviceAttributes.display,
		deviceAttributes.alignItems,
		deviceAttributes.justifyContent
	);

	const isDefault = (
		'' === deviceAttributes.display ||
		'block' === deviceAttributes.display
	);
	const isFlex = 'flex' === deviceAttributes.display;
	const isRow = (
		'row' === deviceAttributes.flexDirection ||
		'row-reverse' === deviceAttributes.flexDirection
	);
	const isColumn = (
		'column' === deviceAttributes.flexDirection ||
		'column-reverse' === deviceAttributes.flexDirection
	);

	return (
		<AlignmentMatrix
			value={ activeCell }
			direction={ isFlex && deviceAttributes.flexDirection }
			options={ activeTemplate }
			onChange={ setDeviceAttributes }
		>
			<div style={ { display: 'flex', justifyContent: 'space-between', marginTop: '8px' } }>
				<Button
					isSmall
					isPressed={ isDefault }
					label={ __( 'Default behavior', 'generateblocks' ) }
					onClick={ () => {
						setDeviceAttributes( { display: '' } );
					} }
				>
					{ getIcon( 'container-default' ) }
				</Button>
				<Button
					isSmall
					label={ __( 'Arrange blocks horizontally', 'generateblocks' ) }
					isPressed={ isFlex && isRow }
					onClick={ () => {
						setDeviceAttributes( { display: 'flex', flexDirection: 'row' } );
					} }
				>
					{ getIcon( 'container-flex-row' ) }
				</Button>
				<Button
					isSmall
					label={ __( 'Arrange blocks vertically', 'generateblocks' ) }
					isPressed={ isFlex && isColumn }
					onClick={ () => {
						setDeviceAttributes( { display: 'flex', flexDirection: 'column' } );
					} }
				>
					{ getIcon( 'container-flex-column' ) }
				</Button>
			</div>
		</AlignmentMatrix>
	);
}

export default AlignmentMatrixControl;

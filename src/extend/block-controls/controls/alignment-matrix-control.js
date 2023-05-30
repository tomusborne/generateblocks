import AlignmentMatrix from '../../../components/alignment-matrix';
import templates from './templates';
import useDeviceAttributes from '../../../hooks/useDeviceAttributes';
import getIcon from '../../../utils/get-icon';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState, useContext } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import getUniqueBlockNames from '../../../utils/get-unique-block-names';
import ControlsContext from '../../../block-context';

function AlignmentMatrixControl( { attributes, setAttributes } ) {
	const [ activeCell, setActiveCell ] = useState( '' );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const { clientId } = useContext( ControlsContext );
	const {
		display,
		flexDirection,
		alignItems,
		justifyContent,
	} = deviceAttributes;

	const directionTemplate = templates[ flexDirection || 'column' ];

	const isDefault = '' === display || 'block' === display;
	const isFlex = 'flex' === display;
	const isRow = 'row' === flexDirection || 'row-reverse' === flexDirection;
	const isColumn = 'column' === flexDirection || 'column-reverse' === flexDirection;

	useEffect( () => {
		if ( activeCell ) {
			const uniqueBlockNames = getUniqueBlockNames( getBlock( clientId )?.innerBlocks );
			const direction = 1 === uniqueBlockNames.length && 'generateblocks/button' === uniqueBlockNames[ 0 ]
				? 'row'
				: 'column';

			setDeviceAttributes( {
				...directionTemplate[ activeCell ],
				display: 'flex',
				flexDirection: ! flexDirection ? direction : flexDirection,
			} );
		}
	}, [
		activeCell,
		flexDirection,
	] );

	const realActiveCell = useMemo( () => (
		Object
			.entries( directionTemplate )
			.reduce( ( realCell, [ key, cell ] ) => {
				if ( cell.alignItems === alignItems && cell.justifyContent === justifyContent ) {
					return key;
				}

				return realCell;
			}, '' )
	), [ flexDirection, alignItems, justifyContent ] );

	return (
		<AlignmentMatrix
			activeCell={ realActiveCell }
			onChange={ setActiveCell }
			direction={ isFlex && flexDirection }
		>
			<>
				<Button
					isPressed={ isDefault }
					label={ __( 'Default', 'generateblocks' ) }
					onClick={ () => {
						setActiveCell( '' );
						setDeviceAttributes( {
							display: '',
							flexDirection: '',
							alignItems: '',
							justifyContent: '',
						} );
					} }
				>
					{ getIcon( 'container-default' ) }
				</Button>
				<Button
					label={ __( 'Arrange blocks vertically', 'generateblocks' ) }
					isPressed={ isFlex && isColumn }
					onClick={ () => {
						setDeviceAttributes( { display: 'flex', flexDirection: 'column' } );
					} }
				>
					{ getIcon( 'container-flex-column' ) }
				</Button>
				<Button
					label={ __( 'Arrange blocks horizontally', 'generateblocks' ) }
					onClick={ () => {
						setDeviceAttributes( { display: 'flex', flexDirection: 'row' } );
					} }
					isPressed={ isFlex && isRow }
				>
					{ getIcon( 'container-flex-row' ) }
				</Button>
			</>
		</AlignmentMatrix>
	);
}

export default AlignmentMatrixControl;

import ApplyFilters from '../apply-filters/';

import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { useEffect, useState } from '@wordpress/element';

export default function PanelArea( props ) {
	const {
		title = false,
		initialOpen = false,
		icon,
		className,
		id,
		state,
		showPanel = true,
		children,
	} = props;

	const [ openPanels, setOpenPanels ] = useState( JSON.parse( localStorage.getItem( 'generateblocksPanels' ) ) || [] );

	useEffect( () => {
		localStorage.setItem( 'generateblocksPanels', JSON.stringify( openPanels ) );
	}, [ openPanels ] );

	const show = applyFilters( 'generateblocks.editor.showPanel', showPanel, id, props );

	if ( ! show ) {
		return null;
	}

	let hasChildren = true;

	if ( '' === children ) {
		hasChildren = false;
	}

	// If we have items in the panel, make sure they're not empty.
	if ( 'object' === typeof children ) {
		hasChildren = Object.values( children ).some( ( x ) => ( x !== null && x !== false && x !== '' ) );
	}

	if ( ! hasChildren ) {
		return null;
	}

	return (
		<ApplyFilters name={ 'generateblocks.panel.' + id } props={ props } state={ state }>
			{ title ? (
				<PanelBody
					title={ title }
					initialOpen={ initialOpen || ( Array.isArray( openPanels ) && openPanels.includes( id ) ) }
					icon={ icon }
					className={ className }
					onToggle={ () => {
						const panels = JSON.parse( localStorage.getItem( 'generateblocksPanels' ) );

						if ( panels.includes( id ) ) {
							setOpenPanels( panels.filter( ( panel ) => panel !== id ) );
						} else {
							setOpenPanels( [ ...panels, id ] );
						}
					} }
				>
					{
						applyFilters( 'generateblocks.editor.panelContents', children, id, props )
					}
				</PanelBody>
			) : (
				<PanelBody>
					{
						applyFilters( 'generateblocks.editor.panelContents', children, id, props )
					}
				</PanelBody>
			) }
		</ApplyFilters>
	);
}

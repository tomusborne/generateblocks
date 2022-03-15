import ApplyFilters from '../apply-filters/';

import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

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

	let panelData = JSON.parse( localStorage.getItem( 'generateblocksPanels' ) ) || [];
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

	const thisPanelData = panelData.filter( ( panel ) => id === panel.id );

	return (
		<ApplyFilters name={ 'generateblocks.panel.' + id } props={ props } state={ state }>
			{ title ? (
				<PanelBody
					title={ title }
					initialOpen={ thisPanelData.length > 0
						? thisPanelData[ 0 ].open
						: initialOpen
					}
					icon={ icon }
					className={ className }
					onToggle={ () => {
						// Fetch latest localStorage.
						// useState would be better, but it was acting strange with localStorage.
						panelData = JSON.parse( localStorage.getItem( 'generateblocksPanels' ) );

						const newPanelData = panelData.filter(
							( panel ) => id === panel.id
						).length > 0
							? panelData.map( ( panel ) =>
								id === panel.id
									? { ...panel, open: !! panel.open ? false : true }
									: panel
							)
							: [
								...panelData,
								{
									id,
									open: true,
								},
							];

						localStorage.setItem(
							'generateblocksPanels',
							JSON.stringify( newPanelData )
						);
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

import ApplyFilters from '../apply-filters/';

import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import useLocalStorageState from 'use-local-storage-state';

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

	const [ panels, setPanels ] = useLocalStorageState(
		'generateblocksPanels', {
			ssr: true,
			defaultValue: {},
		}
	);

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
					initialOpen={
						'undefined' !== typeof panels[ id ]
							? panels[ id ]
							: initialOpen
					}
					icon={ icon }
					className={ className }
					onToggle={ () => {
						const isOpen = panels[ id ] ||
							(
								'undefined' === typeof panels[ id ] &&
								initialOpen
							);

						setPanels( {
							...panels,
							[ id ]: ! isOpen,
						} );
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

import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { forwardRef, useContext } from '@wordpress/element';
import ApplyFilters from '../apply-filters/';
import objectIsEmpty from '../../utils/object-is-empty';
import useLocalStorageState from 'use-local-storage-state';
import ControlsContext from '../../block-context';
import classnames from 'classnames';

const PanelArea = forwardRef( function PanelArea( props, ref ) {
	const { blockName } = useContext( ControlsContext );
	const {
		icon,
		className,
		id,
		state,
		children,
		title = false,
		initialOpen = false,
		showPanel = true,
		hasGlobalStyle = false,
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

	if ( ! children || objectIsEmpty( children ) ) {
		return null;
	}

	return (
		<ApplyFilters
			name="generateblocks.editor.panel"
			blockName={ blockName }
			state={ state }
			panelRef={ ref }
			{ ...props }
		>
			<ApplyFilters
				name={ 'generateblocks.panel.' + id }
				props={ props }
				state={ state }
			>
				{ title ? (
					<PanelBody
						ref={ ref }
						title={ title }
						initialOpen={
							'undefined' !== typeof panels[ id ]
								? panels[ id ]
								: initialOpen
						}
						icon={ icon }
						className={ classnames( className, hasGlobalStyle && 'has-global-style' ) }
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
		</ApplyFilters>
	);
} );

export default PanelArea;

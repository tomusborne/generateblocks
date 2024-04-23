import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { PluginSidebar, store as editPostStore } from '@wordpress/edit-post';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import './editor.scss';
import { Button } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import classnames from 'classnames';

function SidebarItems( props ) {
	const { name, children } = props;

	return (
		applyFilters(
			name,
			children || '',
			props,
		)
	);
}

function Icon() {
	return (
		<svg viewBox="0 0 50 60.12" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.686 31.622V18.918a.077.077 0 0 1 .05-.072l6.5-2.313 6.5-2.313 9.682-3.445L39.1 7.33a.067.067 0 0 0 .036-.028.074.074 0 0 0 .014-.044V.076a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.097.097 0 0 0-.013.046V52.067c0 .026.013.048.032.062s.044.018.069.009l3.267-1.163 3.267-1.163c.015-.005.028-.015.036-.028s.014-.028.014-.044V37.999l.001-6.377c-.001 0 0 0 0 0z" /><path d="m23.949 29.976 13-4.625 13-4.625c.015-.005.028-.015.036-.028s.015-.028.015-.044V8.056a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044V60.045c0 .026.013.048.032.062a.076.076 0 0 0 .069.009l6.475-2.304 6.475-2.304 6.525-2.322 6.525-2.322 6.5-2.313 6.5-2.313c.015-.005.028-.015.036-.028s.014-.025.014-.041V27.193a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-6.45 2.295L37 31.711a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044v6.272a.077.077 0 0 1-.05.072l-6.45 2.295L24 42.715a.075.075 0 0 1-.101-.071V30.046c0-.016.005-.031.014-.044a.08.08 0 0 1 .036-.026z" /></svg>
	);
}

function SidebarHeader( props ) {
	return (
		<>
			<div className="gblocks-editor-sidebar-header__inner">
				{ applyFilters(
					'generateblocks.editor.sidebarHeader',
					props.children || '',
					props,
				) }
			</div>
		</>

	);
}

function EditorSidebar() {
	const [ activePanel, setActivePanel ] = useState( '' );
	const { openGeneralSidebar } = useDispatch( editPostStore );

	return (
		<PluginSidebar
			name="gblocks-editor-sidebar"
			className="gblocks-editor-sidebar"
			title={ __( 'GenerateBlocks', 'generateblocks-pro' ) }
			icon={ <Icon /> }
			headerClassName={ classnames( 'gblocks-editor-sidebar-header', {
				[ `gblocks-editor-sidebar-header--${ activePanel }` ]: activePanel,
			} ) }
			header={
				<SidebarHeader
					activePanel={ activePanel }
					setActivePanel={ setActivePanel }
				>
					<span className="gblocks-editor-sidebar-header__title">
						{ __( 'GenerateBlocks', 'generateblocks' ) }
					</span>
					<Button
						onClick={ () => openGeneralSidebar( 'edit-post/block' ) }
						icon={ closeSmall }
						label={ __( 'Close', 'generateblocks-pro' ) }
					/>
				</SidebarHeader>
			}
		>
			<SidebarItems
				name="generateblocks.editor.sidebar"
				activePanel={ activePanel }
				setActivePanel={ setActivePanel }
			/>
		</PluginSidebar>
	);
}

registerPlugin( 'gblocks-editor-sidebar', {
	render: EditorSidebar,
} );

import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { Icon, desktop, tablet, mobile } from '@wordpress/icons';
import { memo, useCallback, useEffect, render } from '@wordpress/element';
import { useDeviceType } from '../../../../hooks';
import './editor.scss';

function DeviceButton( { deviceKey, label, isActive, onClick, icon } ) {
	return (
		<Tooltip text={ label }>
			<Button isPressed={ isActive } onClick={ () => onClick( deviceKey ) }>
				<Icon icon={ icon } />
			</Button>
		</Tooltip>
	);
}

const MemoizedDeviceButton = memo( DeviceButton );

const devices = [
	{
		key: 'Desktop',
		label: __( 'Show options for all devices', 'generateblocks' ),
		icon: desktop,
	},
	{
		key: 'Tablet',
		label: __( 'Show options for tablet devices', 'generateblocks' ),
		icon: tablet,
	},
	{
		key: 'Mobile',
		label: __( 'Show options for mobile devices', 'generateblocks' ),
		icon: mobile,
	},
];

function ResponsiveTabButtons() {
	const [ deviceType, setDeviceType ] = useDeviceType();
	const onClickDeviceButton = useCallback( setDeviceType, [] );

	return (
		<>
			{ devices && devices.map( ( device ) => (
				<MemoizedDeviceButton
					key={ device.key }
					deviceKey={ device.key }
					label={ device.label }
					isActive={ deviceType === device.key }
					icon={ device.icon }
					onClick={ onClickDeviceButton }
				/>
			) ) }
		</>
	);
}

function ResponsiveTabs() {
	useEffect( () => {
		const BlockInspectorControls = document.querySelector( '.block-editor-block-inspector' );
		const ResponsiveTabsElement = document.querySelector( '.gb-responsive-tabs' );

		if ( ! BlockInspectorControls || ResponsiveTabsElement ) {
			return;
		}

		const panelHeader = document.querySelector( '.edit-post-sidebar .edit-post-sidebar__panel-tabs' );
		const panelHeaderHeight = panelHeader ? `${ panelHeader.offsetHeight }px` : 0;
		const buttonWrapper = document.createElement( 'div' );
		buttonWrapper.classList.add( 'gb-responsive-tabs' );
		buttonWrapper.style.top = panelHeaderHeight;
		BlockInspectorControls.prepend( buttonWrapper );

		render(
			<ResponsiveTabButtons />,
			document.querySelector( '.gb-responsive-tabs' )
		);
	}, [] );

	return null;
}

export default memo( ResponsiveTabs );

import { Dropdown, ToggleControl, ToolbarButton } from '@wordpress/components';
import { link } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

const POPOVER_PROPS = {
	className: 'block-editor-block-settings-menu__popover',
	position: 'bottom right',
};

function DisabledInputMessage( marginBottom = false ) {
	const styles = {
		width: '300px',
		'font-style': 'italic',
		'margin-bottom': ( marginBottom ? '15px' : '0' ),
	};

	return (
		<div style={ styles }>
			{ __( 'This button is using a dynamic link.', 'generateblocks' ) }
		</div>
	);
}

function LinkDropdownContent( props ) {
	const {
		attributes,
		setAttributes,
		name,
	} = props;

	const {
		href,
		relNoFollow,
		relSponsored,
		dynamicLinkType,
		useDynamicData,
		url,
	} = attributes;

	const hasDynamicLink = useDynamicData && dynamicLinkType;
	const targetAttribute = 'generateblocks/button' === name
		? 'target'
		: 'openInNewWindow';
	const targetValue = attributes[ targetAttribute ];
	const urlValue = 'generateblocks/button' === name
		? url
		: href;

	return (
		<>
			{ ! useDynamicData
				? (
					<URLInput
						className={ 'gblocks-link-url' }
						value={ urlValue }
						onChange={ ( value ) => ( setAttributes( { href: value } ) ) }
					/>
				)
				: <DisabledInputMessage marginBottom={ !! dynamicLinkType } />
			}

			{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', attributes ) }

			{ ( !! urlValue || hasDynamicLink ) &&
				<>
					<ToggleControl
						label={ __( 'Open link in a new tab', 'generateblocks' ) }
						checked={ targetValue || '' }
						onChange={ ( value ) => (
							setAttributes( { [ targetAttribute ]: value } )
						) }
					/>

					<ToggleControl
						label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
						checked={ relNoFollow || '' }
						onChange={ ( value ) => (
							setAttributes( { relNoFollow: value } )
						) }
					/>

					<ToggleControl
						label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
						checked={ relSponsored || '' }
						onChange={ ( value ) => (
							setAttributes( { relSponsored: value } )
						) }
					/>
				</>
			}
		</>
	);
}

export default function Index( props ) {
	const { attributes, name } = props;
	const { url, href } = attributes;

	const urlValue = 'generateblocks/button' === name
		? url
		: href;

	const buttonLabel = ! urlValue
		? __( 'Add Link', 'generateblocks' )
		: __( 'Change Link', 'generateblocks' );

	return (
		<Dropdown
			popoverProps={ POPOVER_PROPS }
			contentClassName="gblocks-link-control-dropdown"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<ToolbarButton
					icon={ link }
					label={ buttonLabel }
					onClick={ onToggle }
					aria-expanded={ isOpen }
					isPressed={ !! urlValue }
				/>
			) }
			renderContent={ () => ( <LinkDropdownContent { ...props } /> ) }
		/>
	);
}

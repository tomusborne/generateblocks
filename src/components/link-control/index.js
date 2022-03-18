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
			{  __( 'This button is using a dynamic link.', 'generateblocks' ) }
		</div>
	);
}

function LinkDropdownContent( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		href,
		target,
		relNoFollow,
		relSponsored,
		dynamicLinkType,
		isDynamicContent,
		hasDynamicLink,
	} = attributes;

	return (
		<>
			{ ! isDynamicContent
				? <URLInput
					className={ 'gblocks-link-url' }
					value={ href }
					onChange={ ( value ) => ( setAttributes( { href: value } ) ) }
				/>
				: <DisabledInputMessage marginBottom={ !! dynamicLinkType } />
			}

			{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', attributes ) }

			{ ( !! href || hasDynamicLink ) &&
				<>
					<ToggleControl
						label={ __( 'Open link in a new tab', 'generateblocks' ) }
						checked={ target || '' }
						onChange={ ( value ) => (
							setAttributes( { target: ( value ? '_blank' : undefined ) } )
						) }
					/>

					<ToggleControl
						label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
						checked={ relNoFollow || '' }
						onChange={ ( value ) => (
							setAttributes( { relNoFollow: ( value ? 'nofollow' : undefined ) } )
						) }
					/>

					<ToggleControl
						label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
						checked={ relSponsored || '' }
						onChange={ ( value ) => (
							setAttributes( { relSponsored: ( value ? 'sponsored' : undefined ) } )
						) }
					/>
				</>
			}
		</>
	);
}

export default function Index( props ) {
	const { url } = props;

	const buttonLabel = ! url
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
					isPressed={ !! url }
				/>
			) }
			renderContent={ () => ( <LinkDropdownContent { ...props } /> ) }
		/>
	);
}

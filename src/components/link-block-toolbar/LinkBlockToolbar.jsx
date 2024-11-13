import { __ } from '@wordpress/i18n';
import { ToolbarButton, Dropdown } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { link } from '@wordpress/icons';
import { URLControls } from '../../components/url-controls';

export function LinkBlockToolbar( { tagName, setAttributes, htmlAttributes, context } ) {
	const POPOVER_PROPS = {
		position: 'bottom right',
	};

	if ( 'a' !== tagName ) {
		return null;
	}

	const url = htmlAttributes?.href ?? '';

	return (
		<BlockControls group="inline">
			<Dropdown
				contentClassName="gblocks-button-link-dropdown"
				popoverProps={ POPOVER_PROPS }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<ToolbarButton
						icon={ link }
						label={ ! url ? __( 'Add Link', 'generateblocks' ) : __( 'Change Link', 'generateblocks' ) }
						onClick={ onToggle }
						aria-expanded={ isOpen }
						isPressed={ !! url }
					/>
				) }
				renderContent={ () => (
					<>
						<URLControls
							htmlAttributes={ htmlAttributes }
							setAttributes={ setAttributes }
							context={ context }
							tagName={ tagName }
						/>
					</>
				) }
			/>
		</BlockControls>
	);
}

import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarButton, Dropdown, ToggleControl } from '@wordpress/components';
import { BlockControls, URLInput } from '@wordpress/block-editor';
import { link } from '@wordpress/icons';

export function LinkBlockToolbar( { tagName, setAttributes, htmlAttributes } ) {
	const POPOVER_PROPS = {
		position: 'bottom right',
	};

	if ( 'a' !== tagName ) {
		return null;
	}

	const url = htmlAttributes?.href ?? '';
	const target = htmlAttributes?.target ?? '';
	const rel = htmlAttributes?.rel ?? '';

	return (
		<BlockControls>
			<ToolbarGroup>
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
							<URLInput
								className={ 'gblocks-button-link' }
								value={ url }
								onChange={ ( value ) => {
									setAttributes( {
										htmlAttributes: {
											...htmlAttributes,
											href: value,
										},
									} );
								} }
							/>

							<ToggleControl
								label={ __( 'Open link in a new tab', 'generateblocks' ) }
								checked={ target || '' }
								onChange={ ( value ) => {
									const newHtmlAttributes = { ...htmlAttributes };

									if ( value ) {
										newHtmlAttributes.target = '_blank';
									} else {
										delete newHtmlAttributes.target;
									}

									setAttributes( {
										htmlAttributes: newHtmlAttributes,
									} );
								} }
							/>

							<ToggleControl
								label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
								checked={ rel?.includes( 'nofollow' ) || '' }
								onChange={ ( value ) => {
									const newHtmlAttributes = { ...htmlAttributes };
									const relItems = rel ? rel.split( ' ' ) : [];

									if ( value && ! relItems.includes( 'nofollow' ) ) {
										relItems.push( 'nofollow' );
									}

									if ( ! value && relItems.includes( 'nofollow' ) ) {
										relItems.splice( relItems.indexOf( 'nofollow' ), 1 );
									}

									if ( relItems.length > 0 ) {
										newHtmlAttributes.rel = relItems.join( ' ' );
									} else {
										delete newHtmlAttributes.rel;
									}

									setAttributes( {
										htmlAttributes: newHtmlAttributes,
									} );
								} }
							/>

							<ToggleControl
								label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
								checked={ rel?.includes( 'sponsored' ) || '' }
								onChange={ ( value ) => {
									const newHtmlAttributes = { ...htmlAttributes };
									const relItems = rel ? rel.split( ' ' ) : [];

									if ( value && ! relItems.includes( 'sponsored' ) ) {
										relItems.push( 'sponsored' );
									}

									if ( ! value && relItems.includes( 'sponsored' ) ) {
										relItems.splice( relItems.indexOf( 'sponsored' ), 1 );
									}

									if ( relItems.length > 0 ) {
										newHtmlAttributes.rel = relItems.join( ' ' );
									} else {
										delete newHtmlAttributes.rel;
									}

									setAttributes( {
										htmlAttributes: newHtmlAttributes,
									} );
								} }
							/>
						</>
					) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

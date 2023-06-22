import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function UnitDropdown( { value, onChange, units = [], disabled } ) {
	if ( ! units.length ) {
		return null;
	}

	return (
		<>
			<DropdownMenu
				className="gblocks-unit-control-units"
				label={ __( 'Select a unit', 'generateblocks' ) }
				icon={ null }
				toggleProps={ {
					children: value,
					disabled,
				} }
				popoverProps={ {
					className: 'gblocks-unit-control-popover',
					focusOnMount: true,
					noArrow: false,
				} }
			>
				{ ( { onClose } ) => (
					<>
						<MenuGroup>
							{ units.map( ( unit ) => (
								<MenuItem
									key={ unit }
									onClick={ () => {
										onChange( unit );
										onClose();
									} }
									isSelected={ unit === value }
									variant={ unit === value ? 'primary' : '' }
								>
									{ unit }
								</MenuItem>
							) ) }
						</MenuGroup>
					</>
				) }
			</DropdownMenu>
		</>
	);
}

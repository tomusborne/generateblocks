import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../../utils/get-icon';

export default function StyleDropdown( { id, value, onChange } ) {
	const currentIcon = {
		none: getIcon( 'border-none' ),
		solid: getIcon( 'border-solid' ),
		dashed: getIcon( 'border-dashed' ),
		dotted: getIcon( 'border-dotted' ),
	};

	return (
		<>
			<DropdownMenu
				className={ 'gblocks-border-style ' + id }
				icon={ currentIcon[ value ] || getIcon( 'border-default' ) }
				label={ __( 'Select a style', 'generateblocks' ) }
			>
				{ ( { onClose } ) => (
					<>
						<MenuGroup>
							<MenuItem
								icon={ getIcon( 'border-default' ) }
								className="border-default"
								onClick={ () => {
									onChange( '' );
									onClose();
								} }
							>
								{ __( 'Default', 'generateblocks' ) }
							</MenuItem>
							<MenuItem
								icon={ getIcon( 'border-none' ) }
								className="border-none"
								onClick={ () => {
									onChange( 'none' );
									onClose();
								} }
							>
								{ __( 'None', 'generateblocks' ) }
							</MenuItem>
							<MenuItem
								icon={ getIcon( 'border-solid' ) }
								className="border-solid"
								onClick={ () => {
									onChange( 'solid' );
									onClose();
								} }
							>
								{ __( 'Solid', 'generateblocks' ) }
							</MenuItem>
							<MenuItem
								icon={ getIcon( 'border-dashed' ) }
								className="border-dashed"
								onClick={ () => {
									onChange( 'dashed' );
									onClose();
								} }
							>
								{ __( 'Dashed', 'generateblocks' ) }
							</MenuItem>
							<MenuItem
								icon={ getIcon( 'border-dotted' ) }
								className="border-dotted"
								onClick={ () => {
									onChange( 'dotted' );
									onClose();
								} }
							>
								{ __( 'Dotted', 'generateblocks' ) }
							</MenuItem>
						</MenuGroup>
					</>
				) }
			</DropdownMenu>
		</>
	);
}

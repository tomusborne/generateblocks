import { __ } from '@wordpress/i18n';
import { Button, TextControl, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { close, settings } from '@wordpress/icons';

export default function LibraryForm( props ) {
	const {
		id,
		name,
		domain,
		publicKey,
		isEnabled,
		isDefault,
		onChange,
		onDelete,
	} = props;
	const [ isEdit, setIsEdit ] = useState( ! name );

	return (
		<div className="gblocks-library-item">
			<span className="gblocks-library-item__name">
				{ name }

				{ ! isDefault &&
					<>
						<span className="gblocks-library-item__actions--edit">
							<Button
								variant={ isEdit ? 'primary' : 'secondary' }
								showTooltip
								label={ __( 'Edit Collection', 'generateblocks' ) }
								icon={ settings }
								onClick={ () => setIsEdit( ! isEdit ) }
							/>
						</span>

						<span className="gblocks-library-item__actions--delete">
							<Button
								variant="secondary"
								showTooltip
								label={ __( 'Delete Collection', 'generateblocks' ) }
								icon={ close }
								onClick={ () => onDelete( id ) }
								isDestructive
							/>
						</span>
					</>
				}
			</span>
			<span className="gblocks-library-item__actions">
				<span className="gblocks-library-item__actions--enabled">
					<ToggleControl
						checked={ isEnabled }
						label={ __( 'Enable', 'generateblocks' ) }
						onChange={ ( value ) => {
							onChange( id, 'isEnabled', value );
						} }
					/>
				</span>
			</span>

			{ !! isEdit &&
				<div className="gblocks-library-item__edit">
					<TextControl
						disabled={ isDefault }
						label={ __( 'Name', 'generateblocks' ) }
						value={ name }
						onChange={ ( value ) => {
							if ( ! isDefault ) {
								onChange( id, 'name', value );
							}
						} }
					/>

					<TextControl
						disabled={ isDefault }
						label={ __( 'Domain', 'generateblocks' ) }
						value={ domain }
						onChange={ ( value ) => {
							if ( ! isDefault ) {
								onChange( id, 'domain', value );
							}
						} }
					/>

					<TextControl
						disabled={ isDefault }
						label={ __( 'Public key', 'generateblocks' ) }
						value={ publicKey }
						onChange={ ( value ) => {
							if ( ! isDefault ) {
								onChange( id, 'publicKey', value );
							}
						} }
					/>
				</div>
			}
		</div>
	);
}

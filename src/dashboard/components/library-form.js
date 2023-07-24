import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl, ToggleControl } from '@wordpress/components';
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

	return (
		<div className="gblocks-library-item">
			<TextControl
				disabled={ isDefault }
				label="Name"
				value={ name }
				onChange={ ( value ) => {
					if ( ! isDefault ) {
						onChange( id, 'name', value );
					}
				} }
			/>

			<TextControl
				disabled={ isDefault }
				label="Domain"
				value={ domain }
				onChange={ ( value ) => {
					if ( ! isDefault ) {
						onChange( id, 'domain', value );
					}
				} }
			/>

			<TextControl
				disabled={ isDefault }
				label="Public key"
				value={ publicKey }
				onChange={ ( value ) => {
					if ( ! isDefault ) {
						onChange( id, 'publicKey', value );
					}
				} }
			/>

			<BaseControl id="enabled" label="Enabled">
				<div style={ { display: 'flex', gap: '16px', alignItems: 'center' } }>
					<ToggleControl
						checked={ isEnabled }
						onChange={ ( value ) => {
							onChange( id, 'isEnabled', value );
						} }
					/>
					<DeleteLibrary
						isDefault={ isDefault }
						id={ id }
						onClick={ onDelete }
					/>
				</div>
			</BaseControl>
		</div>
	);
}

function DeleteLibrary( { isDefault, id, onClick } ) {
	return (
		<>
			{ isDefault && <div className="delete-placeholder"></div> }
			{ ! isDefault &&
				<Button
					disabled={ isDefault }
					isSmall
					showTooltip
					label={ __( 'Delete Library', 'generateblocks' ) }
					icon="no-alt"
					onClick={ () => onClick( id ) }
				>{ 'Delete' }</Button>
			}
		</>
	);
}

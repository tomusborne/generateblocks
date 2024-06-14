import {
	BaseControl,
	Button,
	TextControl,
	Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getResponsivePlaceholder from '../../../../../utils/get-responsive-placeholder';
import getIcon from '../../../../../utils/get-icon';
import getAttribute from '../../../../../utils/get-attribute';
import UnitControl from '../../../../../components/unit-control';
import getDeviceType from '../../../../../utils/get-device-type';

export default function FlexChildControls( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const deviceType = getDeviceType();

	return (
		<>
			<BaseControl
				className="gblocks-flex-controls"
				label={ __( 'Flex', 'generateblocks' ) }
				id="gblocks-flex-grow"
			>
				<div className="gblocks-utility-label">
					<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
						<Button
							className="gblocks-reset-button"
							icon={ getIcon( 'reset' ) }
							onClick={ () => {
								setAttributes( {
									[ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: '',
									[ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: '',
									[ getAttribute( 'flexBasis', { attributes, deviceType }, true ) ]: '',
								} );
							} }
						/>
					</Tooltip>
				</div>

				<div className="gblocks-flex-controls-inner">
					<TextControl
						help={ __( 'Grow', 'generateblocks' ) }
						id="gblocks-flex-grow"
						type={ 'number' }
						value={ getAttribute( 'flexGrow', { attributes, deviceType } ) }
						min="0"
						step="1"
						placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, deviceType, '0' ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: value,
							} );
						} }
						onBlur={ () => {
							if ( '' !== getAttribute( 'flexGrow', { attributes, deviceType } ) ) {
								setAttributes( {
									[ getAttribute( 'flexGrow', { attributes, deviceType }, true ) ]: parseFloat( getAttribute( 'flexGrow', { attributes, deviceType } ) ),
								} );
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>

					<TextControl
						help={ __( 'Shrink', 'generateblocks' ) }
						id="gblocks-flex-shrink"
						type={ 'number' }
						value={ getAttribute( 'flexShrink', { attributes, deviceType } ) }
						min="0"
						step="1"
						placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, deviceType, '1' ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: value,
							} );
						} }
						onBlur={ () => {
							if ( '' !== getAttribute( 'flexShrink', { attributes, deviceType } ) ) {
								setAttributes( {
									[ getAttribute( 'flexShrink', { attributes, deviceType }, true ) ]: parseFloat( getAttribute( 'flexShrink', { attributes, deviceType } ) ),
								} );
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>

					<div className="gblocks-flex-basis-wrapper">
						<UnitControl
							help={ __( 'Basis', 'generateblocks' ) }
							value={ getAttribute( 'flexBasis', { attributes, deviceType } ) }
							placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, deviceType ) }
							onChange={ ( value ) => {
								setAttributes( {
									[ getAttribute( 'flexBasis', { attributes, deviceType }, true ) ]: value,
								} );
							} }
						/>
					</div>
				</div>
			</BaseControl>
		</>
	);
}

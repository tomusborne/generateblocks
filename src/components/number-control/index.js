/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { settings as settingsIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	ButtonGroup,
	Button,
	BaseControl,
	Tooltip,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import UnitPicker from '../unit-picker';
import hasNumericValue from '../../utils/has-numeric-value';
import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';
import './editor.scss';

export default function NumberControl( props ) {
	const {
		label,
		attributeName,
		attributes,
		setAttributes,
		units,
		unit = 'px',
		device,
		presets = [],
		presetUnit = 'px',
		min = 0,
		max,
		step,
	} = props;

	const [ isCustom, setCustom ] = useState( false );

	const attributeNames = {
		value: attributeName,
		unit: attributeName + 'Unit',
	};

	if ( 'Desktop' !== device ) {
		attributeNames.value += device;
	}

	const presetsHaveValue = presets.length > 0 && 'object' === typeof presets[ 0 ]
		? presets.find( ( preset ) => preset.value === attributes[ attributeNames.value ] )
		: presets.includes( attributes[ attributeNames.value ] );

	const showCustom = presets.length === 0 ||
		(
			!! hasNumericValue( attributes[ attributeNames.value ] ) &&
			! presetsHaveValue
		) ||
		isCustom;

	return (
		<BaseControl className="gblocks-number-component">
			{ units.length > 0 &&
				<UnitPicker
					label={ label }
					value={ attributes[ attributeNames.unit ] || unit }
					units={ units }
					disabled={ ! showCustom }
					onClick={ ( value ) => {
						if ( 'undefined' !== typeof attributes[ attributeNames.unit ] ) {
							setAttributes( {
								[ attributeNames.unit ]: value,
							} );
						}

						return false;
					} }
				/>
			}

			{ ! showCustom &&
				<ButtonGroup className="gblocks-component-number-presets">
					{
						presets.map( ( preset, index ) => {
							const presetValue = 'object' === typeof preset
								? preset.value
								: preset;

							const presetLabel = 'object' === typeof preset
								? preset.label
								: preset;

							return (
								<Button
									key={ index }
									isPrimary={ presetValue === attributes[ attributeNames.value ] }
									onClick={ () => {
										if ( attributes[ attributeNames.value ] !== presetValue ) {
											setAttributes( {
												[ attributeNames.value ]: presetValue,
												[ attributeNames.unit ]: presetUnit,
											} );
										} else {
											setAttributes( { [ attributeNames.value ]: '' } );
										}
									} }
								>
									{ presetLabel }
								</Button>
							);
						} )
					}

					<Tooltip text={ __( 'Custom', 'generateblocks' ) }>
						<Button icon={ settingsIcon } onClick={ () => setCustom( true ) } />
					</Tooltip>
				</ButtonGroup>
			}

			{ showCustom &&
				<div className="gblocks-number-component__input">
					<TextControl
						type="number"
						value={ hasNumericValue( attributes[ attributeNames.value ] ) ? attributes[ attributeNames.value ] : '' }
						placeholder={ getResponsivePlaceholder( attributeNames.value, attributes, device, '' ) }
						min={ min }
						max={ max }
						step={ step }
						autoComplete="off"
						onChange={ ( value ) => {
							if ( min >= 0 ) {
								// No hyphens allowed here.
								value = value.toString().replace( /-/g, '' );
							}

							setAttributes( {
								[ attributeNames.value ]: value,
							} );
						} }
						onBlur={ () => {
							if ( '' !== attributes[ attributeNames.value ] ) {
								setAttributes( {
									[ attributeNames.value ]: parseFloat( attributes[ attributeNames.value ] ),
								} );
							}
						} }
						onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
							e.currentTarget.focus();
						} }
					/>

					{
						presets.length > 0 &&
						(
							presetsHaveValue ||
							! hasNumericValue( attributes[ attributeNames.value ] )
						) &&
						<Tooltip text={ __( 'Presets', 'generateblocks' ) }>
							<Button isPrimary icon={ settingsIcon } onClick={ () => setCustom( false ) } />
						</Tooltip>
					}
				</div>
			}
		</BaseControl>
	);
}

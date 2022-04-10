/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { settings as settingsIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import {
	TextControl,
	ButtonGroup,
	Button,
	BaseControl,
	Tooltip,
} from '@wordpress/components';
import useLocalStorageState from 'use-local-storage-state';

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
		min = 0,
		max,
		step,
		defaultPlaceholder = '',
	} = props;

	const [ isCustom, setCustom ] = useState( false );

	const [ inputPreferences, setInputPreferences ] = useLocalStorageState(
		'generateblocksCustomInputs', {
			ssr: true,
			defaultValue: [],
		}
	);

	const attributeNames = {
		value: attributeName,
		unit: attributeName + 'Unit',
	};

	if ( 'Desktop' !== device ) {
		attributeNames.value += device;
	}

	const allPresets = applyFilters(
		'generateblocns.editor.numberPresets',
		presets,
		props,
	);

	const presetData = allPresets.length > 0 ? allPresets[ 0 ].data : [];
	const presetUnit = allPresets.length > 0 ? allPresets[ 0 ].unit : 'px';

	const presetsHaveValue = presetData.length > 0 && 'object' === typeof presetData[ 0 ]
		? presetData.find( ( preset ) => {
			return preset.value === attributes[ attributeNames.value ];
		} )
		: presetData.includes( attributes[ attributeNames.value ] );

	const hasParentValue = 'Desktop' !== device &&
		getResponsivePlaceholder( attributeNames.value, attributes, device, '' );

	const showCustom = allPresets.length === 0 ||
		(
			!! hasNumericValue( attributes[ attributeNames.value ] ) &&
			! presetsHaveValue
		) ||
		hasParentValue ||
		isCustom ||
		inputPreferences.some( ( pref ) => pref.includes( attributeName ) );

	return (
		<BaseControl className="gblocks-number-component">
			{ units.length > 0 &&
				<UnitPicker
					label={ label }
					value={ attributes[ attributeNames.unit ] || unit }
					units={ units }
					singleOption={ ! showCustom }
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
						presetData.map( ( preset, index ) => {
							const presetValue = 'object' === typeof preset
								? preset.value
								: preset;

							const presetLabel = 'object' === typeof preset
								? preset.label
								: preset;

							return (
								<Button
									key={ index }
									isPrimary={ presetValue === attributes[ attributeNames.value ] || presetValue === defaultPlaceholder }
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
						<Button
							icon={ settingsIcon }
							onClick={ () => {
								setCustom( true );
								setInputPreferences( [ ...inputPreferences, attributeName ] );
							} }
						/>
					</Tooltip>
				</ButtonGroup>
			}

			{ showCustom &&
				<div className="gblocks-number-component__input">
					<TextControl
						type="number"
						value={ hasNumericValue( attributes[ attributeNames.value ] ) ? attributes[ attributeNames.value ] : '' }
						placeholder={ getResponsivePlaceholder( attributeNames.value, attributes, device, defaultPlaceholder ) }
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
							if (
								'' !== attributes[ attributeNames.value ] &&
								false !== attributes[ attributeNames.value ]
							) {
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
						allPresets.length > 0 &&
						(
							presetsHaveValue ||
							! hasNumericValue( attributes[ attributeNames.value ] )
						) &&
						! hasParentValue &&
						<Tooltip text={ __( 'Presets', 'generateblocks' ) }>
							<Button
								icon={ settingsIcon }
								onClick={ () => {
									setCustom( false );

									setAttributes( {
										[ attributeNames.unit ]: presetUnit,
									} );

									setInputPreferences( inputPreferences.filter( ( pref ) => pref !== attributeName ) );
								} }
							/>
						</Tooltip>
					}
				</div>
			}
		</BaseControl>
	);
}
